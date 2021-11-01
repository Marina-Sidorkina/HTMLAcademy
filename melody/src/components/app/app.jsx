import React from "react";
import PropTypes from "prop-types";
import WelcomeScreen from "../welcome-screen/welcome-screen.jsx";

const App = (props) => {
  const {mistakesAmount, onStartButtonClick} = props;

  return (
    <WelcomeScreen
      mistakesAmount={mistakesAmount}
      onStartButtonClick={onStartButtonClick}
    />
  );
};

App.propTypes = {
  mistakesAmount: PropTypes.number.isRequired,
  onStartButtonClick: PropTypes.func.isRequired
};

export default App;
