import React, { useState, useEffect, useRef, useCallback } from "react";
import Modal from 'react-modal';
import Form from '../form/Form'
import Widget from './Widget';
import styles from './widgets.module.css';
const customStyles = {
  content: {
    top: '70%',
    left: '50%',
    right: 'auto',
    height: '20em',
    width: '20em',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderColor: 'blue'
  }
};
function Widgets() {
  const [widgetsList, setWidgetList] = useState([{ content: null }, { content: null }, { content: null }]);
  const [draggedIndex, setDraggedElement] = useState(null);
  const [modalOpen, setModal] = useState(false);
  const [indexWidgetOpen, setIndexWidgetOpen] = useState(null);
  const [availablePairs, setAvailablePairs] = useState(['USD-EURO', 'USD-YEN', 'USD-GBP'])
  const appRef = useRef(null);
  const openModal = useCallback((index) => {

    setModal(true);
    setIndexWidgetOpen(index)
  }, [])
  const switchWidgets = useCallback((targetIndex) => {

    const draggedElement = widgetsList[draggedIndex];
    const targetElement = widgetsList[targetIndex];
    const newList = widgetsList.concat();
    newList[targetIndex] = draggedElement;
    newList[draggedIndex] = targetElement;
    setWidgetList(newList)
    setDraggedElement(null);

  }, [draggedIndex, widgetsList])
  const addSelectedPair = useCallback((pairIndex, amount) => {

    const newSelection = { content: { currencyPair: availablePairs[pairIndex], bid: 0, offer: 0 } }
    const newAvailblePairs = availablePairs.slice(0, pairIndex).concat(availablePairs.slice(pairIndex + 1));
    setAvailablePairs(newAvailblePairs);
    const newList = widgetsList.concat();
    newList[indexWidgetOpen] = newSelection;
    setWidgetList(newList);
    setModal(false);
    setIndexWidgetOpen(null)

  }, [indexWidgetOpen])

  const addBidOffer = (index, field) => {
    const widgetItem = widgetsList[index];
    widgetItem.content[field] += 1;
    const newList = widgetsList.concat();
    newList[index] = widgetItem;
    setWidgetList(newList)

  }

  useEffect(() => {
    Modal.setAppElement(appRef.current)
  }, [])

  return (
    <div>
      <div className={styles.container}>
        {widgetsList.map((item, index) => (
           <Widget drop={switchWidgets} openModal={openModal}
            setDraggedElement={setDraggedElement}
            addBidOffer={addBidOffer} item={item} index={index} key={index} />
        ))}
      </div>
      <Modal
        isOpen={modalOpen}
        style={customStyles}
        onRequestClose={() => setModal(false)}
      >
        <Form availablePairs={availablePairs} addSelection={addSelectedPair} />
      </Modal>
    </div>

  );
}

export default Widgets;
