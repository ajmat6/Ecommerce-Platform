import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MaterialButton, MaterialInput } from "../../components/MaterialUi/MaterialUi";
import { createAddress } from "../../reducers/addressReducer";

const AddressForm = (props) => {
  // checking if this addressform is currently used to edit a address and there is data in props:
  const {initialData} = props;
  if(initialData)
  {
    console.log(initialData)
  }

  const [name, setName] = useState(
    initialData ? initialData.name : ''
  );
  const [mobileNumber, setMobileNumber] = useState(
    initialData ? initialData.mobileNumber : ''
  );
  const [pinCode, setPinCode] = useState(
    initialData ? initialData.pinCode : ''
  );
  const [locality, setLocality] = useState(
    initialData ? initialData.locality : ''
  );
  const [address, setAddress] = useState(
    initialData ? initialData.address : ''
  );
  const [cityDistrictTown, setCityDistrictTown] = useState(
    initialData ? initialData.cityDistrictTown : ''
  );
  const [state, setState] = useState(
    initialData ? initialData.state : ''
  );
  const [landmark, setLandmark] = useState(
    initialData ? initialData.landmark : ''
  );
  const [alternatePhone, setAlternatePhone] = useState(
    initialData ? initialData.alternatePhone : ''
  );
  const [addressType, setAddressType] = useState(
    initialData ? initialData.addressType : ''
  );

  console.log("address type ", addressType)

  const dispatch = useDispatch();
  const userAddress = useSelector((state) => state.address);
  const [submitFlag, setSubmitFlag] = useState(false);
  const [id, setId] = useState(
    initialData ? initialData._id : ''
  )

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
    console.log(form, "form address");

    // if address is for edit, sending also with payload:
    if(id)
    {
      form.payload.address._id = id
    }

    dispatch(createAddress(form))
    .then(() => {
      setSubmitFlag(true)
      console.log("Ho gaya")
    })
  };

  useEffect(() => {
    // when we will submit a form then we have to confirm that address becoz this form is filled either to add a new address or to edit a address for delivery:
    if(submitFlag)
    {
      let _address = {}

      // if this form is form updating the address, then we have to send the updated address: As it is not last in the state, we are sending useState's values
      if(id !== '')
      {
        _address = {
          _id: id,
          name,
          mobileNumber,
          pinCode,
          locality,
          address,
          cityDistrictTown,
          state,
          landmark,
          alternatePhone,
          addressType
        }
      }

      else
      {
        // if the address is newly added  then the added address is last in allAddress state
        _address = userAddress.allAddress.slice(userAddress.allAddress.length - 1)[0];
      }
      console.log(_address, "new address")
      props.onSubmitForm(_address) // sending this address as prop
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
          <label style={{marginTop: '12px'}}>Address Type</label>
          <div className="flexRow" style={{marginTop: '5px'}}>
            <div>
              <input
                type="radio"
                name="addressType"
                value={addressType}
                onClick={(e) => setAddressType(e.target.value)}
              />
              <span style={{marginLeft: '4px'}}>Home</span>
            </div>
            <div>
              <input
                type="radio"
                name="addressType"
                value={addressType}
                onClick={(e) => setAddressType(e.target.value)}
                style={{marginLeft: '25px'}}
              />
              <span style={{marginLeft: '4px'}}>Work</span>
            </div>
          </div>
        </div>
        <div className="flexRow">
          <MaterialButton
            title= {props.title ? props.title : "SAVE AND DELIVER HERE"}
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