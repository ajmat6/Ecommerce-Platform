import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MaterialButton, MaterialInput } from "../../components/MaterialUi/MaterialUi";
import { createAddress } from "../../reducers/addressReducer";

const AddressForm = (props) => {
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [locality, setLocality] = useState('');
  const [address, setAddress] = useState('');
  const [cityDistrictTown, setCityDistrictTown] = useState('');
  const [state, setState] = useState('');
  const [landmark, setLandmark] = useState('');
  const [alternatePhone, setAlternatePhone] = useState('');
  const [addressType, setAddressType] = useState('');

  const dispatch = useDispatch();
  const userAddress = useSelector((state) => state.address);
  const [submitFlag, setSubmitFlag] = useState(false);

  const inputContainer = {
    width: "100%",
    marginRight: 10,
  };

  const onAddressSubmit = (e) => {
    const form = {
      payload: {
        address: {
          name,
          mobileNumber,
          pinCode,
          locality,
          address,
          cityDistrictTown,
          state,
          landmark,
          alternatePhone,
          addressType,
        }
      }
    };
    console.log(form);
    dispatch(createAddress(form));
    setSubmitFlag(true)
  };

  useEffect(() => {
    // when we will submit a form then we have to confirm that address becoz this form is filled either to add a new address or to edit a address for delivery:
    if(submitFlag)
    {
      // we have to send the added address back as prop: the added address is last in allAddress state
      const address = userAddress.allAddress.slice(userAddress.allAddress.length - 1)[0];
      console.log(address, "new address")
      props.onSubmitForm(address) // sending this address as prop
    }
  }, [userAddress.allAddress])

  const renderAddressForm = () => {
    return (
      <>
        <div className="flexRow">
          <div style={inputContainer}>
            <MaterialInput
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div style={inputContainer}>
            <MaterialInput
              label="10-digit mobile number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
          </div>
        </div>
        <div className="flexRow">
          <div style={inputContainer}>
            <MaterialInput
              label="Pincode"
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
            />
          </div>
          <div style={inputContainer}>
            <MaterialInput
              label="Locality"
              value={locality}
              onChange={(e) => setLocality(e.target.value)}
            />
          </div>
        </div>
        <div className="flexRow">
          <div style={inputContainer}>
            <MaterialInput
              label="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>

        <div className="flexRow">
          <div style={inputContainer}>
            <MaterialInput
              label="City/District/Town"
              value={cityDistrictTown}
              onChange={(e) => setCityDistrictTown(e.target.value)}
            />
          </div>
          <div style={inputContainer}>
            <MaterialInput
              label="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>
        </div>
        <div className="flexRow">
          <div style={inputContainer}>
            <MaterialInput
              label="Landmark (Optional)"
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
            />
          </div>
          <div style={inputContainer}>
            <MaterialInput
              label="Alternate Phone (Optional)"
              value={alternatePhone}
              onChange={(e) => setAlternatePhone(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label>Address Type</label>
          <div className="flexRow">
            <div>
              <input
                type="radio"
                onClick={() => setAddressType("home")}
                name="addressType"
                value="home"
              />
              <span>Home</span>
            </div>
            <div>
              <input
                type="radio"
                onClick={() => setAddressType("work")}
                name="addressType"
                value="work"
              />
              <span>Work</span>
            </div>
          </div>
        </div>
        <div className="flexRow">
          <MaterialButton
            title="SAVE AND DELIVER HERE"
            onClick={onAddressSubmit}
            style={{
              width: "250px",
              margin: "20px 0",
            }}
          />
        </div>
      </>
    );
  };

  // for not showing stepnumber , title etc while editing a form:
  if(props.withoutLayout)
  {
    return <div>{renderAddressForm()}</div>
  }

  return (
    <div className="checkoutStep" style={{ background: "#f5faff" }}>
      <div className={`checkoutHeader`}>
        <div>
          <span className="stepNumber">+</span>
          <span className="stepTitle">{"ADD NEW ADDRESS"}</span>
        </div>
      </div>
      <div
        style={{
          padding: "0 60px",
          paddingBottom: "20px",
          boxSizing: "border-box",
        }}
      >
        {renderAddressForm()}
      </div>
    </div>
  );
};

export default AddressForm;