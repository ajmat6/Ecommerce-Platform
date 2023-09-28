import React, { useState, useEffect } from 'react'
import Layout from '../Layout/Layout'
import Card from '../../UI/Card/Card'
import './myProfile.css'
import { Link } from 'react-router-dom'
import profilePic from '../../images/profile-Pic.svg'
import order from '../../images/order.svg'
import staff from '../../images/staff.svg'
import pay from '../../images/pay.svg'
import profile from '../../images/profile.svg'
import { useDispatch, useSelector } from 'react-redux'
import { IoIosArrowDown } from 'react-icons/io'
import bottomImage from '../../images/bottomImage.png'
import { Anchor, MaterialButton } from '../MaterialUi/MaterialUi'
import AddressForm from '../Checkout/AddressForm'
import { getUserAddress } from '../../reducers/addressReducer'

const MyProfile = () => {
    const auth = useSelector((state) => state.auth);
    const userAddress = useSelector((state) => state.address);

    const dispatch = useDispatch();

    const [firstName, setFirstName] = useState(auth.userInfo.firstName);
    const [lastName, setLastName] = useState(auth.userInfo.lastName);

    const [editPValue, setEditPValue] = useState('Edit')
    const [editP, setEditP] = useState(false)

    const [editEmailValue, setEditEmailValue] = useState('Edit')
    const [editEmail, setEditEmail] = useState(false)

    const [editMobileValue, setEditMobileValue] = useState('Edit')
    const [editMobile, setEditMobile] = useState(false)

    const [showPersonal, setShowPersonal] = useState(true);
    const [showAddress, setShowAddress] = useState(false);

    // state to manage show and hide of new address form
    const [newAddress, setNewAddress] = useState(false);

    // state to keep track of updated address with more properties:
    const [moreAddress, setMoreAddress] = useState([]);

    // to fetch address:
    useEffect(() => {
        auth.authenticate && dispatch(getUserAddress());
    }, [auth.authenticate]);

    useEffect(() => {
        // to select a particular address and then only to show the edit and delivery here buttun:
        // keeping current single address object same and adding two more properties to it
        const updatedAddress = userAddress.allAddress.map(address => ({ ...address, selected: false, edit: false }))
        // console.log(updatedAddress, "Updated address")
        setMoreAddress(updatedAddress)
        // console.log(moreAddress, "moreAddress")
    }, [userAddress.allAddress]);

    const selectAddress = (address) => {
        // we have to make previously selected false and newly one as false:
        const selectedAddress = moreAddress.map(adr =>
            adr._id === address._id ? { ...adr, selected: true, edit: false } : { ...adr, selected: false, edit: false }
        )

        // now this updated more address will be mapped below:
        setMoreAddress(selectedAddress)
    }

    const cancelSelectAddress = (address) => {
        const selectedAddress = moreAddress.map(adr =>
            adr._id === address._id ? { ...adr, selected: false, edit: false } : { ...adr, selected: false, edit: false }
        )

        // now this updated more address will be mapped below:
        setMoreAddress(selectedAddress)
    }

    // function to handle edit address form:
    const enableAddressEditForm = (address) => {
        const updatedAddress = moreAddress.map(adr =>
            adr._id === address._id ? { ...adr, edit: true } : { ...adr, edit: false }
        )

        setMoreAddress(updatedAddress)
    }

    // if any address is selected for the delivery, then this function will be executed:
    const onAddressSubmit = (address) => {
        setNewAddress(false)
    };

    const editPersonal = () => {
        if (editPValue === 'Edit') {
            setEditPValue('Cancel');
            setEditP(true)
        }
        else {
            setEditPValue('Edit');
            setEditP(false)
        }
    }

    const editEmailAction = () => {
        if (editEmailValue === 'Edit') {
            setEditEmailValue('Cancel');
            setEditEmail(true)
        }
        else {
            setEditEmailValue('Edit');
            setEditEmail(false)
        }
    }

    const editMobileAction = () => {
        if (editMobileValue === 'Edit') {
            setEditMobileValue('Cancel');
            setEditMobile(true)
        }
        else {
            setEditMobileValue('Edit');
            setEditMobile(false)
        }
    }

    const personal = () => {
        setShowPersonal(true);
        setShowAddress(false)
    }

    const address = () => {
        setShowPersonal(false);
        setShowAddress(true)
    }

    const CheckoutStep = (props) => {
        return (
            <div className="checkoutStep">
                <div
                    onClick={props.onClick && props.onClick}
                    className={`checkoutHeader ${props.active && "active"}`}
                    style={props.onClick && { cursor: 'pointer' }}
                >
                    {
                        props.stepNumber ?
                            <div>
                                <span className="stepNumber">{props.stepNumber}</span>
                                <span className="stepTitle">{props.title}</span>
                            </div> : null
                    }
                </div>
                {props.body && props.body}
            </div>
        );
    };

    return (
        <Layout>
            <div className='container flexRow'>
                <div className='left'>
                    {/* First left card */}
                    <Card
                        style={{ width: '300px', marginBottom: '15px', padding: '16px' }}
                    >
                        <div className='flexRow'>
                            <div>
                                <img src={profilePic} alt="profilePic" />
                            </div>
                            <div style={{ marginLeft: '15px', marginTop: '6px' }}>
                                <div style={{ fontSize: '12px' }}>Hello,</div>
                                <div><strong>{auth.userInfo.fullname}</strong></div>
                            </div>
                        </div>
                    </Card>

                    {/* Middle left card */}
                    <Card
                        style={{ width: '300px', marginBottom: '15px' }}
                    >
                        <div>
                            <div className='' style={{ borderBottom: '1px solid #878787', padding: '16px' }}>
                                <Link className='flexRow sb' to={'/account/orders'} style={{ textDecoration: 'none' }}>
                                    <div className='flexRow'>
                                        <img src={order} alt="order" />
                                        <div className='orders'>MY ORDERS</div>
                                    </div>
                                    <div><IoIosArrowDown className='arrow' /></div>
                                </Link>
                            </div>

                            <div style={{ marginBottom: '10px' }}>
                                <div className='section' style={{ borderTop: '0px solid #878787' }}>
                                    <div className='flexRow'>
                                        <img src={profile} alt="order" />
                                        <div className='others'>ACCOUNT SETTINGS</div>
                                    </div>
                                </div>
                                <Link className='itemNew allLinks' onClick={personal}>Profile Information</Link>
                                <Link className='itemNew allLinks' onClick={address}>Manage Address</Link>
                            </div>

                            <div style={{ marginBottom: '10px' }}>
                                <div className='section'>
                                    <div className='flexRow'>
                                        <img src={pay} alt="order" />
                                        <div className='others'>PAYMENTS</div>
                                    </div>
                                </div>
                                <Link className='itemNew allLinks'>GIFT CARDS</Link>
                                <Link className='itemNew allLinks'>SAVED UPI</Link>
                                <Link className='itemNew allLinks'>SAVED CARDS</Link>
                            </div>
                            <div style={{ marginBottom: '10px' }}>
                                <div className='section'>
                                    <div className='flexRow'>
                                        <img src={staff} alt="order" />
                                        <div className='others'>MY STUFF</div>
                                    </div>
                                </div>
                                <Link className='itemNew allLinks'>My Coupons</Link>
                                <Link className='itemNew allLinks'>My Reviews & Ratings</Link>
                                <Link className='itemNew allLinks'>All Notifications</Link>
                                <Link className='itemNew allLinks'>My Wishlists</Link>
                            </div>
                            <div className='section'>
                                <Link className='flexRow sb' to={'#'} style={{ textDecoration: 'none' }}>
                                    <div className='flexRow'>
                                        <img src={order} alt="order" />
                                        <div className='orders'>Logout</div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </Card>

                    {/* Last left card */}
                    <Card
                        style={{ width: '300px', padding: '16px', fontSize: '12px' }}
                    >
                        <div>
                            <div>
                                <strong>Frequently Visited:</strong>
                            </div>
                            <div className='flexRow' style={{ marginTop: '3px' }}>
                                <Link style={{ marginRight: '10px', textDecoration: 'none', color: '#878787' }}>Track Order</Link>
                                <a href="https://www.flipkart.com/helpcenter" style={{ textDecoration: 'none', color: '#878787' }}>Help Center</a>
                            </div>
                        </div>
                    </Card>
                </div>


                <div className='right'>
                    <Card
                        style={{ width: '850px' }}
                    >
                        {
                            showPersonal ?
                                <div className='rightContainer'>
                                    {/* Personal info Title*/}
                                    <div style={{ paddingBottom: '24px' }}>
                                        <div className='personal'>
                                            <span style={{ paddingRight: '24px', fontSize: '18px' }}><strong>Personal Information</strong></span>
                                            <span className='edit' onClick={editPersonal}>{editPValue}</span>
                                        </div>
                                    </div>

                                    {/* first name and last name and email */}
                                    <form>
                                        {/* name */}
                                        <div className='flexRow inputContainer'>
                                            <div style={{ width: '270px', paddingRight: '12px' }}>
                                                <div style={{ marginBottom: '10px', position: 'relative' }}>
                                                    <input type="text" className='inputField' placeholder={auth.userInfo.firstName} value={firstName} disabled />
                                                    <label htmlFor="firstname" className='labell'>First Name</label>
                                                </div>
                                            </div>

                                            <div style={{ width: '270px', paddingRight: '12px' }}>
                                                <div style={{ marginBottom: '10px', position: 'relative' }}>
                                                    <input type="text" className='inputField' placeholder={auth.userInfo.lastName} value={lastName} disabled />
                                                    <label htmlFor="lastname" className='labell'>Last Name</label>
                                                </div>
                                            </div>

                                            {
                                                editP &&
                                                <MaterialButton
                                                    title="SAVE"
                                                    style={{
                                                        width: '130px',
                                                    }}
                                                    height={'49px'}
                                                    bgColor={'#2874f0'}
                                                />
                                            }
                                        </div>

                                        <div style={{ padding: '12px 0', fontSize: '14px' }}>
                                            Your Gender
                                        </div>

                                        <div className='flexRow'>
                                            <div className='flexRow'>
                                                <input type="radio" name='gender' />
                                                <div style={{ marginLeft: '10px' }}>Male</div>
                                            </div>
                                            <div className='flexRow' style={{ marginLeft: '30px' }}>
                                                <input type="radio" name='gender' />
                                                <div style={{ marginLeft: '10px' }}>Female</div>
                                            </div>
                                        </div>

                                        {/* email and mobile no */}
                                        <div style={{ marginTop: '50px' }}>
                                            <div>
                                                <div style={{ paddingBottom: '24px' }}>
                                                    <div className='personal'>
                                                        <span style={{ paddingRight: '24px', fontSize: '18px' }}><strong>Email Address</strong></span>
                                                        <span className='edit' onClick={editEmailAction}>{editEmailValue}</span>
                                                    </div>
                                                </div>
                                                <div style={{ position: 'relative', display: 'flex' }}>
                                                    <input className='inputField' style={{ width: '250px' }} type="email" placeholder={auth.userInfo.email} />
                                                    <label htmlFor="lastname" className='labell' style={{ paddingLeft: '13px' }}>Email</label>
                                                    {
                                                        editEmail &&
                                                        <MaterialButton
                                                            title="SAVE"
                                                            style={{
                                                                width: '130px',
                                                                marginLeft: '15px'
                                                            }}
                                                            height={'49px'}
                                                            bgColor={'#2874f0'}
                                                        />
                                                    }
                                                </div>
                                            </div>

                                            <div style={{ marginTop: '50px' }}>
                                                <div style={{ paddingBottom: '24px' }}>
                                                    <div className='personal'>
                                                        <span style={{ paddingRight: '24px', fontSize: '18px' }}><strong>Mobile Number</strong></span>
                                                        <span className='edit' onClick={editMobileAction}>{editMobileValue}</span>
                                                    </div>
                                                </div>
                                                <div style={{ position: 'relative', display: 'flex' }}>
                                                    <input className='inputField' style={{ width: '250px' }} type="email" placeholder={auth.userInfo.email} />
                                                    <label htmlFor="lastname" className='labell'>Mobile Number</label>
                                                    {
                                                        editMobile &&
                                                        <MaterialButton
                                                            title="SAVE"
                                                            style={{
                                                                width: '130px',
                                                                marginLeft: '15px'
                                                            }}
                                                            height={'49px'}
                                                            bgColor={'#2874f0'}
                                                        />
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div> :

                                <div className='rightContainer'>
                                    <div style={{ paddingBottom: '24px' }}>
                                        <div className='personal'>
                                            <span style={{ paddingRight: '24px', fontSize: '18px' }}><strong>Manage Addresses</strong></span>
                                        </div>
                                    </div>

                                    {/* Add New AddressForm */}

                                    {/* if the user is logged in then only we will show add new address option and also if a user has selected an address for the delivery then also we will not show it*/}
                                    {
                                        auth.authenticate ?
                                            <CheckoutStep
                                                stepNumber={"+"}
                                                title={"ADD A NEW ADDRESS"}
                                                active={false}
                                                onClick={() => newAddress === false ? setNewAddress(true) : setNewAddress(false)}

                                            /> :
                                            null
                                    }

                                    {
                                        newAddress === true ?
                                            <AddressForm
                                                title={"Add New Address"}
                                                withoutLayout={true}
                                                onSubmitForm={onAddressSubmit}
                                                onCancel={() => { }}
                                            /> :
                                            null
                                    }

                                    <CheckoutStep
                                        // stepNumber={"2"}
                                        // title={"DELIVERY ADDRESS"}
                                        // active={!confirmAddress && auth.authenticate}
                                        body={
                                            <>
                                                {
                                                    moreAddress.map(address =>
                                                        <div className="flexRow addressContainer">
                                                            <div>
                                                                <input name="address" type="radio" onClick={() => selectAddress(address)} style={{ marginRight: '10px' }} />
                                                            </div>
                                                            <div className="flexRow sb addressInfo">
                                                                {
                                                                    !address.edit ?
                                                                        (
                                                                            <div style={{ width: '100%'}}>
                                                                                    <div className="addressDetail">
                                                                                        <div>
                                                                                            <span className="addressName">{address.name}</span>
                                                                                            <span className="addressType">{address.addressType}</span>
                                                                                            <span className="addressMobileNumber">{address.mobileNumber}</span>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="fullAddress">
                                                                                        {address.address} <br /> {" "}
                                                                                        {address.state} - {address.pinCode}
                                                                                    </div>

                                                                                <div style={{ display: 'flex', width: '267%', justifyContent: 'space-between', marginTop: '10px' }}>
                                                                                    {
                                                                                        address.selected && (
                                                                                            <div className='flexRow' style={{marginTop: '10px'}}>
                                                                                                <MaterialButton
                                                                                                    title={"EDIT"}
                                                                                                    onClick={() => enableAddressEditForm(address)}
                                                                                                    style={{
                                                                                                        fontWeight: "500",
                                                                                                        color: '#2874f0',
                                                                                                        width: '150px'
                                                                                                    }}
                                                                                                    bgColor={'#2874f0'}
                                                                                                />

                                                                                                <MaterialButton
                                                                                                    title={"CANCEL"}
                                                                                                    onClick={() => cancelSelectAddress(address)}
                                                                                                    style={{
                                                                                                        fontWeight: "500",
                                                                                                        color: '#2874f0',
                                                                                                        width: '150px',
                                                                                                        marginLeft: '20px'
                                                                                                    }}
                                                                                                    bgColor={'#2874f0'}
                                                                                                />

                                                                                            </div>
                                                                                        )
                                                                                    }

                                                                                    {/* {
                                                                                            // here we are using the logic becoz of which we have added the selected and edit feature in address:
                                                                                            // if a address is selected then show below buttons
                                                                                            address.selected &&
                                                                                            <MaterialButton
                                                                                                title="DELIVERY HERE"
                                                                                                onClick={() => confirmDeliveryAddress(address)}
                                                                                                style={{
                                                                                                    width: '250px'
                                                                                                }}
                                                                                            />
                                                                                        } */}
                                                                                </div>

                                                                            </div>
                                                                        ) :
                                                                        (
                                                                            <AddressForm
                                                                                withoutLayout={true}
                                                                                initialData={address}
                                                                                title = {"SAVE"}
                                                                                onSubmitForm={onAddressSubmit}
                                                                                onCancel={() => { }}
                                                                            />
                                                                        )
                                                                }
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            </>
                                        }
                                    />



                                </div>
                        }
                        <img src={bottomImage} alt="greetings" />
                    </Card>
                </div>
            </div>
        </Layout>
    )
}

export default MyProfile