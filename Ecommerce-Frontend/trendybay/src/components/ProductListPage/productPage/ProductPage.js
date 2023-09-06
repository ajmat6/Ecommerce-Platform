import React, { useEffect } from 'react'
import { getProductPage } from '../../../reducers/getPageReducer'
import { useDispatch, useSelector } from 'react-redux'
import { json, useLocation } from 'react-router-dom';
import getQueryParams from '../../../utils/getQueryParams';

// imports for react-responsive-carousel
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { generatePublicURL } from '../../../urlConfig';
import Card from '../../../UI/Card/Card';

const ProductPage = (props) => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.getProductPage)
  const { page } = product; // extracting page from product (look state)

  const location = useLocation();
  const params = getQueryParams(location.search);

  useEffect(() => {
    // as we have to pass payload into the getProductPage action as category id and type of the page , extracting it from getQueryParams component and useLocation:
    // const cid = params.cid.split("/")[0]
    const payload = {
      cid: params.cid,
      type: params.type
    }

    // const jsonPayload = JSON.parse(payload);
    dispatch(getProductPage(payload))
  }, [])

  return (
    <div style={{margin: "0 10px"}}>
      <h3>{page.title}</h3>

      <Carousel
        renderThumbs={() => {}} // to remove the small pics of the large one at bottom
      >
        {
          // if page banners exist:
          page.bannerImages && page.bannerImages.map((banner, index) =>
            <a key={index} style={{display:'block'}} href={banner.navigateTo}> 
              <img src={banner.img} />
            </a>
          )
        }
      </Carousel>
      <div style={{display: 'flex'}}>
        {
          page.productImages && page.productImages.map((product, index) => 
            <Card 
              key={index}
              style={{
                width: "400px",
                height: "300px",
                margin: "5px 5px"
              }}
            >
              <img 
                src={product.img}
                alt=""
                style={{
                  width: '100%',
                  height: '100%'
                }}
              />
            </Card>
          )
        }
      </div>

    </div>
  )
}

export default ProductPage