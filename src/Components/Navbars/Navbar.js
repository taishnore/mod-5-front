import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  openLoginModal,
  openSignupModal,
  logOut,
  toggleGame,
  toggleNewGameModal,
  toggleViewGames
} from "/Users/taimur/Bootcamp/Five/mod-5-front/src/redux/actions.js";
import Login from "/Users/taimur/Bootcamp/Five/mod-5-front/src/Components/Modals/Login.js";
import Signup from "/Users/taimur/Bootcamp/Five/mod-5-front/src/Components/Modals/Signup.js";
// import { getGames } from "/Users/taimur/Bootcamp/Five/mod-5-front/src/redux/thunks.js";

const isUserLoggedIn = () => {
  return localStorage.getItem("token");
};

const Navbar = props => {
  return (
    <div>
      {isUserLoggedIn() ? (
        <ul>
          {props.isGameOpen ? null : (
            <li
              onClick={() => {
                localStorage.removeItem("token");
                props.logOut();
                //props.toggleGame();
              }}
            >
              Log Out
            </li>
          )}
          {props.isGameOpen ? null : (
            <li
              onClick={() => {
                props.history.push("/games");
              }}
            >
              View Available Games
            </li>
          )}
          {props.isGameOpen ? null : (
            <li onClick={props.toggleNewGameModal}>Create New Game</li>
          )}
        </ul>
      ) : (
        <ul>
          <li onClick={props.openLoginModal}>login</li>
          {props.loginOpen ? <Login /> : null}
          <li onClick={props.openSignupModal}>sign up</li>
          {props.signupOpen ? <Signup /> : null}
        </ul>
      )}
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    openLoginModal: () => dispatch(openLoginModal()),
    openSignupModal: () => dispatch(openSignupModal()),
    logOut: () => {
      dispatch(logOut());
    },
    toggleGame: () => dispatch(toggleGame()),
    toggleNewGameModal: () => dispatch(toggleNewGameModal())
  };
};

const mapStateToProps = state => {
  return {
    loginOpen: state.loginModalOpen,
    signupOpen: state.signupModalOpen,
    isGameOpen: state.isGameOpen
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Navbar)
);

/*

<li
  onClick={() => {
    props.toggleGame();
    props.history.push("/game");
  }}
>
  {props.isGameOpen ? "exit game" : "play game"}
</li>

*/
