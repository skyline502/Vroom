import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAPost, getAllPosts } from '../../../store/posts';
import { useHistory } from 'react-router-dom';

const EditPostModal = ({ posts }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const [images, setImages] = useState(post.images);
  const [errors, setErrors] = useState([]);
  const user = useSelector(state => state.session.user);
  let history = useHistory();

  return (

  )
}
