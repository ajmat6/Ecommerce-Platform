import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout/Layout";
import {
  Anchor,
  MaterialButton,
  MaterialInput,
} from "../../components/MaterialUi/MaterialUi";
import Card from "../../UI/Card/Card";
import CartPage from "../Cart/CartPage";
import PriceDetails from "../PriceDetails/PriceDetails";
import "./checkout.css";
import { getUserAddress } from "../../reducers/addressReducer";
import AddressForm from "./AddressForm";
import { getCartItems, resetCart } from "../../reducers/cartReducer";
import { addOrders } from "../../reducers/orderReducer";

const CheckoutStep = (props) => {
  return (
    <div className="checkoutStep">
      <div
        onClick={props.onClick && props.onClick}
        className={`checkoutHeader ${props.active && "active"}`}
        style={props.onClick && { cursor: 'pointer' }}
      >
        <div>
          <span className="stepNumber">{props.stepNumber}</span>
          <span className="stepTitle">{props.title}</span>
        </div>
      </div>
      {props.body && props.body}
    </div>
  );
};

const CheckoutPage = (props) => {
  const userAddress = useSelector((state) => state.address);
  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // state to manage show and hide of new address form
  const [newAddress, setNewAddress] = useState(false);

  // state to keep track of updated address with more properties:
  const [moreAddress, setMoreAddress] = useState([]);

  // will contain the address that is selected for the delivery:
  const [deliveryAddress, setDeliveryAddress] = useState(null);
  const [confirmAddress, setConfirmAddress] = useState(false);
  const [orderSummary, setOrderSummary] = useState(false)
  const [orderConfirmation, setOrderConfirmation] = useState(false)
  const [paymentOption, setPaymentOption] = useState(false)
  const [finalConfirm, setFinalConfirm] = useState(false)

  // if any address is selected for the delivery, then this function will be executed:
  const onAddressSubmit = (address) => {
    setDeliveryAddress(address)
    setConfirmAddress(true)
    setNewAddress(false) // to hide the add new address field
    setOrderSummary(true) // to enable order summary part 
    console.log(orderSummary)
  };

  // to fetch address:
  useEffect(() => {
    auth.authenticate && dispatch(getUserAddress());
    auth.authenticate && dispatch(getCartItems());
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

  // function that will handle the selection of a particular address for delivery:
  const confirmDeliveryAddress = (address) => {
    setDeliveryAddress(address);
    setConfirmAddress(true)
    setOrderSummary(true)
  }

  // function to handle edit address form:
  const enableAddressEditForm = (address) => {
    const updatedAddress = moreAddress.map(adr =>
      adr._id === address._id ? { ...adr, edit: true } : { ...adr, edit: false }
    )

    setMoreAddress(updatedAddress)
  }

  // function that will handle confirmation to order products:
  const userOrderConfirmation = () => {
    setOrderConfirmation(true)
    setOrderSummary(false)
    setPaymentOption(true)
  }

  // after payment method selection, order confirm function:
  const onConfirmPayment = () => {
    // finding totalPrice of the ordered items:
    const totalPrice = Object.keys(cart.cartItems).reduce(function (totalPrice, key) {
      return totalPrice + cart.cartItems[key].quantity * cart.cartItems[key].price;
    }, 0)

    const items = Object.keys(cart.cartItems).map((key) => 
      ({
        productId: key,
        payablePrice: cart.cartItems[key].price,
        purchasedQuantity: cart.cartItems[key].quantity
      })
    )

    // making req body for order api:
    const payload = {
      addressId: deliveryAddress._id,
      totalAmount: totalPrice,
      items: items,
      paymentStatus: 'pending',
      paymentType: "cod"
    }

    console.log(payload)
    dispatch(addOrders(payload))
    .then(() => {
      dispatch(resetCart());
    })
    setFinalConfirm(true)
  }

  // if all the steps till final order confirmation is done, then show this and return:
  if (finalConfirm) {
    return (
      <Layout>
        <Card
          style = {{
            alignItems: 'center',
            padding: '20px'
          }}
        >
          <div>
            Thank You! for shopping, C
          </div>
        </Card>
      </Layout>
    )
  }
  return (
    <Layout>
      <div className="cartContainer" style={{ alignItems: "flex-start" }}>
        <div className="checkoutContainer">
          <CheckoutStep
            stepNumber={"1"}
            title={"LOGIN"}
            active={!auth.authenticate}
            body={
              auth.authenticate ?
                <div className="loggedInId">
                  <span style={{ fontWeight: 500 }}>{auth.userInfo.fullname}</span>
                  <span style={{ margin: "0 5px" }}>{auth.userInfo.email}</span>
                </div> :
                <div>
                  <MaterialInput
                    label={"Email"}
                  />
                </div>
            }
          />
          <CheckoutStep
            stepNumber={"2"}
            title={"DELIVERY ADDRESS"}
            active={!confirmAddress && auth.authenticate}
            body={
              <>
                {
                  // if address is already confirmed then show below line, otherwise show all addresses:
                  confirmAddress ?
                    (<div style={{ marginLeft: '53px', marginTop: '-12px' }}>{deliveryAddress.name} - {deliveryAddress.address} - {deliveryAddress.pinCode}</div>)
                    :
                    moreAddress.map(address =>
                      <div className="flexRow addressContainer">
                        <div>
                          <input name="address" type="radio" onClick={() => selectAddress(address)} style={{ marginRight: '10px' }} />
                        </div>
                        <div className="flexRow sb addressInfo">
                          {
                            !address.edit ?
                              (
                                <div style={{ width: '100%' }}>
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
                                        <Anchor
                                          name={"EDIT"}
                                          onClick={() => enableAddressEditForm(address)}
                                          style={{
                                            fontWeight: "500",
                                            color: '#2874f0'
                                          }}
                                        />
                                      )
                                    }

                                    {
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
                                    }
                                  </div>

                                </div>
                              ) :
                              (
                                <AddressForm
                                  withoutLayout={true}
                                  initialData={address}
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

          {/* Add New AddressForm */}

          {/* if the user is logged in then only we will show add new address option and also if a user has selected an address for the delivery then also we will not show it*/}
          {
            auth.authenticate && !confirmAddress ?
              <CheckoutStep
                title={"Add New Address"}
                stepNumber={"+"}
                active={false}
                onClick={() => newAddress === false ? setNewAddress(true) : setNewAddress(false)}

              /> :
              null
          }
          {
            newAddress === true ?
              <AddressForm
                withoutLayout={true}
                onSubmitForm={onAddressSubmit}
                onCancel={() => { }}
              /> :
              null
          }

          <CheckoutStep
            stepNumber={"3"}
            title={"ORDER SUMMARY"}
            active={orderSummary}
            body={
              // if order summary is true, we will show all products and continue buttom.
              // when user will click on continue button, then order summary will become false and order confimation will become true
              orderSummary ?
                <CartPage onlyCartItems={true} /> : orderConfirmation ? <div style={{ marginLeft: '53px', marginTop: '-12px' }}> Order confimed with {Object.keys(cart.cartItems).length} Items </div> : null
            }
          />

          {
            // confimation continue button for at order summary page
            orderSummary ?
              <Card
                style={{
                  margin: '20px 0',
                }}
              >
                <div className="flexRow sb" style={{ padding: '20px', alignItems: 'center' }}>
                  <p style={{ fontSize: '18px', marginBottom: '0' }}>
                    Order confirmation email will be sent to <strong>{auth.userInfo.email}</strong>
                  </p>
                  <MaterialButton
                    title={"CONTINUE"}
                    style={{
                      width: '200px',
                    }}
                    onClick={userOrderConfirmation}
                  />
                </div>
              </Card> : null
          }

          <CheckoutStep
            stepNumber={"4"}
            title={"PAYMENT OPTIONS"}
            active={paymentOption}
            body={
              paymentOption &&
              <div>
                <div className="flexRow"
                  style={{
                    alignItems: 'center',
                    padding: '20px'
                  }}
                >
                  <input type="radio" name="paymentOption" value='cod' />
                  <div>Cash on delivery</div>
                </div>
                <MaterialButton
                  title={"CONFIRM ORDER"}
                  onClick={onConfirmPayment}
                  style={{
                    width: '200px',
                    margin: '0 0 5px 30px'
                  }}

                />
              </div>
            }
          />
        </div>
        {/* <div className="checkoutStep"> */}
        <PriceDetails
          totalItems={Object.keys(cart.cartItems).reduce(function (qty, key) {
            return qty + cart.cartItems[key].quantity;
          }, 0)}

          totalPrice={Object.keys(cart.cartItems).reduce(function (totalPrice, key) {
            return totalPrice + cart.cartItems[key].quantity * cart.cartItems[key].price;
          }, 0)}
        />
        {/* </div> */}
      </div>

    </Layout>
  );
};

export default CheckoutPage;