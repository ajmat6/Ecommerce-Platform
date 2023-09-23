import React from 'react'
import './footer.css'
import { Link } from 'react-router-dom'
import seller from '../../images/seller.svg'
import star from '../../images/star.svg'
import payments from '../../images/payments.svg'
import help from '../../images/help.svg'
import gift from '../../images/gift.svg'

const Footer = () => {
    return (
        <div style={{ background: '#172337', color: 'white', marginTop: '15px' }}>
            <div className='flexRow footerContainer sb'>
                <div className='flexRow sb links'>
                    <div className='item'>
                        <div className='footerHeading'>
                            About
                        </div>
                        <div className='footerItems'>
                            <div className='footerItem'><Link to={'#'} className='link'>Contact Us</Link></div>
                            <div className='footerItem'><Link to={'#'} className='link'>About Us</Link></div>
                            <div className='footerItem'><Link to={'#'} className='link'>Careers</Link></div>
                            <div className='footerItem'><Link to={'#'} className='link'>Flipkart Stories</Link></div>
                            <div className='footerItem'><Link to={'#'} className='link'>Press</Link></div>
                            <div className='footerItem'><Link to={'#'} className='link'>Flipkart Wholesale</Link></div>
                            <div className='footerItem'><Link to={'#'} className='link'>Cleartrip</Link></div>
                            <div className='footerItem'><Link to={'#'} className='link'>Corporate Information</Link></div>
                        </div>
                    </div>
                    <div className='item'>
                        <div className='footerHeading'>
                            Help
                        </div>
                        <div className='footerItems'>
                            <div className='footerItem'><Link to={'#'} className='link'>Payments</Link></div>
                            <div className='footerItem'><Link to={'#'} className='link'>Shipping</Link></div>
                            <div className='footerItem'><Link to={'#'} className='link'>Cancellation & Returns</Link></div>
                            <div className='footerItem'><Link to={'#'} className='link'>FAQ</Link></div>
                            <div className='footerItem'><Link to={'#'} className='link'>Report Infringement</Link></div>
                        </div>
                    </div>
                    <div className='item'>
                        <div className='footerHeading'>
                            Consumer Policy
                        </div>
                        <div className='footerItems'>
                            <div className='footerItem'><Link to={'#'} className='link'>Corporate Information</Link></div>
                            <div className='footerItem'><Link to={'#'} className='link'>Cancellation & Returns</Link></div>
                            <div className='footerItem'><Link to={'#'} className='link'>Terms of Use</Link></div>
                            <div className='footerItem'><Link to={'#'} className='link'>Security</Link></div>
                            <div className='footerItem'><Link to={'#'} className='link'>Privacy</Link></div>
                            <div className='footerItem'><Link to={'#'} className='link'>Sitemap</Link></div>
                            <div className='footerItem'><Link to={'#'} className='link'>Grievance Redressal</Link></div>
                            <div className='footerItem'><Link to={'#'} className='link'>EPR Compliance</Link></div>
                        </div>
                    </div>
                    <div className='item'>
                        <div className='footerHeading'>
                            Social
                        </div>
                        <div className='footerItems'>
                            <div className='footerItem'><Link to={'#'} className='link'>Corporate Information</Link></div>
                            <div className='footerItem'><Link to={'#'} className='link'>Facebook</Link></div>
                            <div className='footerItem'><Link to={'#'} className='link'>Twitter</Link></div>
                            <div className='footerItem'><Link to={'#'} className='link'>Youtube</Link></div>
                        </div>
                    </div>
                </div>

                <div className='flexRow sb' style={{ borderLeft: '1px solid #454d5e' }}>
                    <div style={{ marginRight: '140px', paddingLeft: '30px', maxWidth: '165px' }}>
                        <div className='footerHeading'>
                            Mail Us
                        </div>
                        <div>
                            <div>
                                Flipkart Internet Private Limited,
                                Buildings Alyssa, Begonia &
                                Clove Embassy Tech Village,
                                Outer Ring Road, Devarabeesanahalli Village,
                                Bengaluru, 560103,
                                Karnataka, India
                            </div>
                        </div>
                    </div>
                    <div className='item' style={{ maxWidth: '150px' }}>
                        <div className='footerHeading'>
                            Registered Office Address
                        </div>
                        <div className='footerItems'>
                            <div>
                                Flipkart Internet Private Limited,
                                Buildings Alyssa, Begonia &
                                Clove Embassy Tech Village,
                                Outer Ring Road, Devarabeesanahalli Village,
                                Bengaluru, 560103,
                                Karnataka, India
                                CIN : U51109KA2012PTC066107
                                Telephone: 044-45614700
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* weak line */}
            <div className='flexRow sb footerDowns'>
                <div>
                    <div className=''>
                        <img style={{ marginRight: '3px', marginBottom: '8px' }} src={seller} alt='seller' />
                        <Link to={'#'} className='link' style={{ fontSize: '14px' }}> Become a Seller</Link>
                    </div>
                </div>
                <div>
                    <div className=''>
                        <img style={{ marginRight: '5px', marginBottom: '8px' }} src={star} alt='star' />
                        <Link to={'#'} className='link' style={{ fontSize: '14px' }}>Advertise</Link>
                    </div>
                </div>
                <div>
                    <div className=''>
                        <img style={{ marginRight: '6px', marginBottom: '8px' }} src={gift} alt='gift' />
                        <Link to={'#'} className='link' style={{ fontSize: '14px' }}>Gift Cards</Link>
                    </div>
                </div>
                <div>
                    <div className=''>
                        <img style={{ marginRight: '5px', marginBottom: '8px' }} src={help} alt='help' />
                        <Link to={'#'} className='link' style={{ fontSize: '14px' }}>Help Center</Link>
                    </div>
                </div>
                <div>
                    <div className=''>
                        <div>© 2007-2023 Flipkart.com</div>
                    </div>
                </div>
                <div>
                    <div className=''>
                        <img style={{ marginRight: '3px', marginBottom: '8px' }} src={payments} alt='seller' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer