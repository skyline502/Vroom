import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAPost, getAllPosts } from '../../../store/posts';
import { useHistory } from 'react-router-dom';
import EditPostForm from './edit-post';

const EditPostModal = ({ posts }) => {

  return (
    <div>
      <EditPostForm posts={posts} />
    </div>
  )
}


export default EditPostModal;
