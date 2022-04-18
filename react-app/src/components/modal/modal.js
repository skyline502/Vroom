import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ReactDOM from "react-dom";

import { hideModal } from "../../store/modal";
import './Modal.css'


const Modal = () => {
  const dispatch = useDispatch();
  let history = useHistory();

  const mount = useSelector(state => state.modals.modalMount);
  const display = useSelector(state => state.modals.display);
  const Current = useSelector(state => state.modals.currentModal);
  const currentUrl = window.location.href;

  const closeModal = () => {
    dispatch(hideModal());
    console.log('current url', currentUrl)
    if (currentUrl === 'http://localhost:3000/' || currentUrl === 'https://vroom-pssh.herokuapp.com/') {
      history.push('/');
    } else {
      history.goBack();
    }
  }

  return display && mount && ReactDOM.createPortal (
    <div className="modal-background" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <Current />
      </div>
    </div>
    , mount)
};

export default Modal;
