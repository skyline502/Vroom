import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import User from './components/User';
import { authenticate } from './store/session';
import Posts from './components/posts/posts';
import CreatePostForm from './components/posts/create-post';
import Modal from './components/modal/modal';
import Home from './components/home';
import Footer from './components/footer';
import NotFound from './components/error';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Modal />
      <Switch>
        <Route path='/login' exact={true}>
          <Modal />
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <NavBar />
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true}>
          <NavBar />
          <Home />
        </ProtectedRoute>
        <ProtectedRoute path='/posts' exact={true}>
          <NavBar />
          <Posts />
        </ProtectedRoute>
        <ProtectedRoute path='/posts/create' exact={true}>
          <NavBar />
          <CreatePostForm />
        </ProtectedRoute>
        <Route>
          <NotFound />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
