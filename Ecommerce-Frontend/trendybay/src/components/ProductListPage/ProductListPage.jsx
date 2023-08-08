import React, { useEffect } from 'react'
import Layout from '../Layout/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { productBySlug } from '../../reducers/productBySlugReducer';
import { useParams } from 'react-router-dom';

const ProductListPage = (props) => {
    const dispatch = useDispatch();
    // const products = useSelector((state) => state.productBySlug)

    // useParams hook is used to identify last parameter in the routes -> eg: /product/realme , then useParams will give realme
    const slug = useParams();

    useEffect(() => {
        console.log(slug)
        dispatch(productBySlug(slug.slug))
    }, [])

  return (
    <Layout>
        <div>ProductListPage</div>
    </Layout>
  )
}

export default ProductListPage