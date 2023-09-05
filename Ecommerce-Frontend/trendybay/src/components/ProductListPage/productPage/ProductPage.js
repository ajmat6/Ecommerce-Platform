import React, {useEffect} from 'react'
import { getProductPage } from '../../../reducers/getPageReducer'
import { useDispatch, useSelector } from 'react-redux'
import { json, useLocation } from 'react-router-dom';
import getQueryParams from '../../../utils/getQueryParams';

const ProductPage = (props) => {
    const dispatch = useDispatch();
    const product = useSelector((state) => state.getProductPage)

    const location = useLocation();
    const params = getQueryParams(location.search);

    useEffect(() => {
        // as we have to pass payload into the getProductPage action as category id and type of the page , extracting it from getQueryParams component and useLocation:
        const cid = params.cid.split("/")[0]
        const payload = {
            cid: cid,
            type: params.type
        }

        // const jsonPayload = JSON.parse(payload);
        dispatch(getProductPage(payload))
    }, [])

  return (
    <>
        <h3>Hello</h3>
        {JSON.stringify(product.page)}
    </>
  )
}

export default ProductPage