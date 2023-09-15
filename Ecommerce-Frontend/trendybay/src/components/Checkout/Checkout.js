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

  const onAddressSubmit = (address) => {
    setDeliveryAddress(address)
    setConfirmAddress(true)
    setNewAddress(false)
  };

  // to fetch address:
  useEffect(() => {
    dispatch(getUserAddress());
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
  }

  const enableAddressEditForm = (address) => {
    const updatedAddress = moreAddress.map(adr =>
      adr._id === address._id ? { ...adr, edit: true } : { ...adr, edit: false }
    )

    setMoreAddress(updatedAddress)
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
                    (<div style={{ marginLeft: '53px', marginTop: '-12px' }}>{deliveryAddress.address} - {deliveryAddress.pinCode}</div>)
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

                                  <div style={{display: 'flex', width: '267%', justifyContent: 'space-between', marginTop: '10px'}}>
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
                withoutLayout = {true}
                onSubmitForm={onAddressSubmit}
                onCancel={() => { }}
              /> :
              null
          }

          <CheckoutStep
            stepNumber={"3"}
            title={"ORDER SUMMARY"}
          />

          <CheckoutStep
            stepNumber={"4"}
            title={"PAYMENT OPTIONS"}
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