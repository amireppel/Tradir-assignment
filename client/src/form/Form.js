import React, { useState, useEffect } from "react";
import styles from'./Form.module.css';
const amounts= ['1M','2M','3M', '4M', '5M']
function Form({ availablePairs, addSelection }) {
  const [pairIndex, setPair] = useState(0);
  const [amountIndex, setAmount] = useState(0);
  const handleSelectPair = (event) => {
    setPair(event.target.value)
  };

  const handleSelectAmount = (event) => {
    setAmount(event.target.value)
  }
  const handleClick = () => {
    addSelection(pairIndex,amounts[amountIndex])
  }
  return (
    <div className={styles.container}>
      <div>Select currency pair:</div>
      <select name={availablePairs[pairIndex]} value={pairIndex} onChange={handleSelectPair}>
        {availablePairs.map((currencyPair, index) => { return <option value={index}>{currencyPair}</option> })}
      </select>
     <div>Select Amount:</div>
     <select name={amounts[amountIndex]} value={amountIndex} onChange={handleSelectAmount}  >
        {amounts.map((amount, index) => { return <option value={index}>{amount}</option> })}
      </select>  
      <div onClick={handleClick} className={styles.button}>
        add selection
      </div> 
    </div>
  );
}

export default Form;
