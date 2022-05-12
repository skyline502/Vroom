import "./NavBar.css";
import React from "react";
import { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import LogoutButton from "./auth/LogoutButton";
import { useSelector, useDispatch } from "react-redux";
import UsersList from "./UsersList";
import Chat from "./chat";
import { setCurrentModal, showModal } from "../store/modal";

const NavBar = () => {
  const user = useSelector((state) => state.session.user);
  const [drop, setDrop] = useState(false);
  const [dropdown, setDropDown] = useState(false);
  let history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (drop) {
      setDropDown("drop");
    } else {
      setDropDown(false);
    }
  }, [drop]);

  const showChat = () => {
    dispatch(setCurrentModal(Chat));
    dispatch(showModal());
  }

  if (user) {
    return (
      <nav className="nav-bar">
        <div>
          <NavLink to="/" exact={true} activeClassName="active">
            <img src={"/vroom.png"} alt="logo" className="logo" />
          </NavLink>
        </div>
        <div>
          <UsersList />
        </div>
        <div className="nav-buttons">
          <NavLink to="/" exact={true} activeClassName="active">
            <img src="/garage.png" alt="home" className="home-btn" />
          </NavLink>
          <div className="chat-box">
            <i onClick={() => showChat()} className="fas fa-comment-dots"></i>
          </div>
          <NavLink to="/posts/create" exact={true} activeClassName="active">
            <img src={"/add-post.png"} alt="post" className="create-post" />
          </NavLink>
          <NavLink to="/posts" exact={true} activeClassName="active">
            <img src={"/cars.png"} alt="gallery" className="gallery" />
          </NavLink>
          <div className="profile-box">
            <img
              src={user.profile_url}
              alt="profile"
              className="profile-pic"
              onClick={() => setDrop(!drop)}
            />
          </div>
        </div>
        <div
          onMouseLeave={() => setDrop(!drop)}
          className={`drop-down ${dropdown}`}
        >
          <div
            className="drop-profile"
            onClick={() => history.push(`/users/${user.id}`)}
          >
            <i className="fas fa-user"></i>
            <div style={{ paddingLeft: 15 }} className="profile-link">
              Profile
            </div>
          </div>
          <div>
            <LogoutButton />
          </div>
        </div>
      </nav>
    );
  }
  return (
    <nav className="nav-bar">
      <div>
        <NavLink to="/" exact={true} activeClassName="active">
          <img src={"/vroom.png"} alt="logo" className="logo" />
        </NavLink>
      </div>
      <div>
        <NavLink to="/login" exact={true} activeClassName="active">
          Login
        </NavLink>
      </div>
      <div>
        <NavLink to="/sign-up" exact={true} activeClassName="active">
          Sign Up
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
