import React, { useState, useEffect } from "react";
import styles from './widgets.module.css'

function BidOffeButtons({ handleClick }) {

  return (
    <div className={styles.bidOffer}>
      <div onClick={() => handleClick('bid')} className={styles.smallButton}>Bid</div>
      <div onClick={() => handleClick('offer')} className={styles.smallButton}>offer</div>
    </div>
  );
}

export default React.memo(BidOffeButtons);