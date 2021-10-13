import React, { useState, useEffect } from "react";
import ReactTooltip from 'react-tooltip';
import { useCallback } from "react/cjs/react.development";
import BidOffeButtons from './bidOffeButtons';
import styles from './widgets.module.css';
function Widget({ item, drop, setDraggedElement, index, openModal, addBidOffer }) {
  const dropHandle = (event) => {
    event.preventDefault();
    drop(index)
  }

  const dragHandle = (event) => {
    setDraggedElement(index);
  }
  const allowDrop = (event) => {
    event.preventDefault();

  }
  const openWidgetForm = (event) => {
    event.stopPropagation();
    openModal(index)

  }
  const incrementBidOffer = useCallback((field)=>{
    addBidOffer(index, field)
  },[item])

  return (
    <div onDrop={dropHandle} onDragOver={allowDrop} className={styles.dropable} >
      <div Draggable="true" className={item.content? styles.fullBox :styles.emptyBox} onDragStart={dragHandle}>
        {!item.content ?
          <div className={styles.button} data-tip onClick={openWidgetForm} data-for={index.toString()} >
            +
          </div> :
          <div className={styles.content} >
            <div>
              Currency pair: {item.content.currencyPair}
            </div>
            bid click:{ item.content.bid}, offer click :{ item.content.offer}
            <div className={styles.bidOffer}>
            <BidOffeButtons handleClick={incrementBidOffer}/>
            </div>
          </div>}
      </div>
      {!item.content &&
        <ReactTooltip id={index.toString()} place="top" backgroundColor="yellow" textColor="black" effect="solid">
          Add widget
        </ReactTooltip>
      }
    </div>
  );
}

export default Widget;
