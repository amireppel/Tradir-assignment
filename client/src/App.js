import React, { useState, useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";

import Widgets from './widgets/Widgets';
import styles from './App.module.css';
const ENDPOINT = "http://127.0.0.1:4001";

function App() {
  const [response, setResponse] = useState([]);
  const [balances, setBalances] =useState([null, null])
  const getBalance =(index)=>{
    fetch(`${ENDPOINT}/getBalance/${index}`).then((response)=>response.json().then((data)=>{
      const newBalances = balances;
      newBalances[index] = data;
      setBalances(newBalances);
    }))
    .catch(()=>{

      console.log('error')
    })
  }
  const appRef = useRef(null);
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("tick", (data) => {
      setResponse(data);
    });
  }, []);

  console.log(response);
  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <h1>Tradair Coding Assignment</h1>
        <div className={styles.container}>
          <Widgets respose={response} />
        </div>
        <div className={styles.bottomContainer}>
          <div className={styles.ballance}>
            <div className={styles.button} onClick={()=>getBalance(0)}>get blanance 1</div>
            {balances[0]!== null? (<div>Ballnce is: {balances[0]} </div>):null}
          </div>
          <div className={styles.ballance}>
            <div className={styles.button} onClick={()=>getBalance(1)}>get blanance 2</div>
             {balances[1]!== null? (<div>Ballnce is: {balances[1]} </div>):null}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
