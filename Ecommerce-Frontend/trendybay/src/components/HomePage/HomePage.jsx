import React, { useEffect } from 'react'
import CategoryMenu from '../CategoryMenu/CategoryMenu'
import Navbar from '../Navbar/Navbar'
import Layout from '../Layout/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { getBanners } from '../../reducers/homeReducer'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import './home.css'
import Card from '../../UI/Card/Card'

const HomePage = () => {
  const dispatch = useDispatch();
  const home = useSelector((state) => state.home)

  useEffect(() => {
    dispatch(getBanners());
  }, [])

  return (
    <div>
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

          <Card
            // Passing headerLeft and headerRight and style as props to Card component
            headerLeft={"Best of Electronics"}
            // headerRight={<button className="btn btn-primary">View All</button>}
            style={{ width: 'calc(100%)', marginRight: '20px', marginTop: '20px' }}
          >
            <div style={{ display: 'flex' }}>
              {/* {
                // here mapping is on the products of a particular category like under5k:
                allProducts.productsByPrice[key].map((product) => (
                  <Link
                    className="product-container"
                    style={{ display: 'block' }}
                    to={`/${product.slug}/${product._id}/p`}
                  >
                    <div className="product-img-container">
                      <img
                        src={generatePublicURL(product.productPic[0].img)}
                        alt="realme"
                      />
                    </div>
                    <div className="product-info">
                      <div>{product.name}</div>
                      <div style={{ marginTop: '5px' }}>
                        {/* nbsp stands for non breaking space */}
                        {/* <Rating value={4.3} />
                        <span
                          style={{
                            color: '#777',
                            fontWeight: '500',
                            fontSize: '14px',
                            marginLeft: '10px'
                          }}
                        >
                          (3334)
                        </span>
                      </div> */}
                      {/* <div className="product-price">{product.price}</div> */}
                      {/* <Price value={product.price} />
                    </div>
                  </Link>
                )) */}
              {/* } */}
            </div>
          </Card>

        </div>
      </Layout>
    </div >
  )
}

export default HomePage