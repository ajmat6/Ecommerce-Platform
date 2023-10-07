import React, { useEffect } from 'react'
import CategoryMenu from '../CategoryMenu/CategoryMenu'
import Navbar from '../Navbar/Navbar'
import Layout from '../Layout/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { getBanners, getHomeProducts } from '../../reducers/homeReducer'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import './home.css'
import Card from '../../UI/Card/Card'
import { Link } from 'react-router-dom'
import { generatePublicURL } from '../../urlConfig'
import Price from '../Price/Price'

const HomePage = () => {
  const dispatch = useDispatch();
  const home = useSelector((state) => state.home)
  const allProducts = useSelector((state) => state.home.products);

  useEffect(() => {
    dispatch(getBanners());
    dispatch(getHomeProducts());
  }, [])

  return (
    <Layout>
      <div style={{ margin: '20px 20px' }}>
        <Carousel
          renderThumbs={() => { }} // to remove the small pics of the large one at bottom
          autoPlay={true} // or just autoPlay (true is the default value)
          infinite={true}
          mobileFirst={true}
        >
          {
            // if page banners exist:
            home.banners && home.banners.map((banner, index) =>
              <a key={index} style={{ display: 'block' }}>
                <img src={banner.img} />
              </a>
            )
          }
        </Carousel>

        {
          allProducts.map((product, index) =>
            <Card
              // Passing headerLeft and headerRight and style as props to Card component
              headerLeft={product.title.title}
              // headerRight={<button className="btn btn-primary">View All</button>}
              style={{ width: 'calc(100%)', marginRight: '20px', marginTop: '20px' }}
            >
              <div style={{ display: 'flex', padding: '10px 10px'}} key={index}>
                {
                  product.products.map((item, no) => (
                    <Link
                      className="product-container"
                      style={{ display: 'block' }}
                      // to={`/${product.slug}/${product._id}/p`}
                    >
                      <div className="product-img-container">
                        <img
                          src={item.productpic}
                          alt="item"
                        />
                      </div>
                      <div className="product-info">
                        <div style={{fontSize: '16px'}}>{item.productName}</div>
                        <div className="product-price" style={{display:'flex', alignItems: 'center', justifyContent: 'center'}}>
                          From<Price value={item.startingPrice} />
                        </div>
                      </div>
                    </Link>
                  ))
                }
              </div>
            </Card>

          )
        }
      </div>
    </Layout>
  )
}

export default HomePage