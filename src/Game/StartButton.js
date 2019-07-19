/* todo:
    - this component needs to have a button that says "start game"
    - this component needs to dispatch starting the game (method and handler already exists.)
*   */

import React from "react";
import { connect } from "react-redux";
import { Button } from "semantic-ui-react";
import { loadJudges, updateJudge, toggleAnswerForm } from "../redux/actions";

const StartButton = props => {
  const startHandler = () => {
    fetch("http://localhost:3000/api/v1/start", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json"
      },
      body: JSON.stringify({
        game_id: props.gameId
      })
    });
  };
  return (
    <div>
      <Button onClick={startHandler}>Start Game</Button>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    startGame: state.pregame.startGame,
    users: state.pregame.users,
    currentUser: state.auth.currentUser,
    gameId: state.pregame.currentGame.id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadJudges: () => dispatch(loadJudges()),
    updateJudge: () => dispatch(updateJudge()),
    toggleAnswerForm: () => dispatch(toggleAnswerForm())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StartButton);
