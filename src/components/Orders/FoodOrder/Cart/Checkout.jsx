import { useRef, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import classes from "./Checkout.module.css";
import React from 'react'

const isEmpty = (value) => value.trim() === "";
const isNotNineChars = (value) => value.trim().length !== 9;

const Checkout = (props) => {
  const paymentMethods = ["Cash", "Credit", "Crypto"];

  const [formInputsValidity, setFormInputsValidity] = useState({
    clientName: true,
    clientCellPhone: true,
    clientDelivAddress: true,
  });

  //estos objetos sirven para no capturar todos los keystrokes durante dataInput
  const clientNameRef = useRef();
  const clientCellPhoneRef = useRef();
  const clientDelivAddressRef = useRef();

  const ConfirmHandler = (event) => {
    event.preventDefault();

    const enteredName = clientNameRef.current.value;
    const enteredCellPhone = clientCellPhoneRef.current.value;
    const enteredDelivAddress = clientDelivAddressRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredCellPhoneIsValid = !isNotNineChars(enteredCellPhone);
    const enteredDelivAddressIsValid = !isEmpty(enteredDelivAddress);

    setFormInputsValidity({
      clientName: enteredNameIsValid,
      clientCellPhone: enteredCellPhoneIsValid,
      clientDelivAddress: enteredDelivAddressIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredCellPhoneIsValid &&
      enteredDelivAddressIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      clientName: enteredName,
      clientCellPhone: enteredCellPhone,
      clientDelivAddress: enteredDelivAddress,
    });
  };

  const nameControlClasses = `${classes.control} ${
    formInputsValidity.clientName ? "" : classes.invalid
  }`;
  const phoneControlClasses = `${classes.control} ${
    formInputsValidity.clientCellPhone ? "" : classes.invalid
  }`;
  const delivAddressControlClasses = `${classes.control} ${
    formInputsValidity.clientDelivAddress ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={ConfirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="clientName">Client's Name</label>
        <input
          type="text"
          id="clientName"
          ref={clientNameRef}
          value="Fred Flinstone"
          readOnly
        />
        {!formInputsValidity.clientName && <p>Please Enter a valid Name</p>}
      </div>
      <div className={phoneControlClasses}>
        <label htmlFor="clientCellPhone">Client's Cell Phone Number</label>
        <input
          type="text"
          id="clientCellPhone"
          ref={clientCellPhoneRef}
          value="1234-7890"
          readOnly
        />
        {!formInputsValidity.clientCellPhone && (
          <p>Please Enter a 8 digits numbers</p>
        )}
      </div>
      <div className={delivAddressControlClasses}>
        <label htmlFor="clientDelivAddress">Delivery Address *</label>
        <input
          type="text"
          id="clientDelivAddress"
          ref={clientDelivAddressRef}
        />
        {!formInputsValidity.clientDelivAddress && (
          <p>Please Enter a valid address</p>
        )}
      </div>
      <div>
        <label htmlFor="clientMethodPayment">Method of Payment *</label>
        <Autocomplete
          options={paymentMethods}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              id="clientMethodPayment"
              {...params}
              label="Choose one:"
              variant="outlined"
            />
          )}
        />
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button>Confirm Order</button>
      </div>
    </form>
  );
};

export default Checkout;
