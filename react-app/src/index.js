import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Provider, useDispatch } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import { setModalMount } from './store/modal';

const store = configureStore();

const Root = () => {
  const dispatch = useDispatch();

  const modalMountRef = useRef(null);

  useEffect(() => {
    dispatch(setModalMount(modalMountRef.current))
  },[dispatch])

  return (
    <>
      <App />
      <div ref={modalMountRef} className='modal' />
    </>
  )

}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <Root />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
