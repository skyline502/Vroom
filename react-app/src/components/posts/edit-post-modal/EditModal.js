import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from '../../modal/modal';
import EditPostModal from '.';
import EditPostForm from './edit-post';

const EditPost = ({post}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div onClick>
        <EditPostForm post={post} />
      </div>
    </>
  )
}
