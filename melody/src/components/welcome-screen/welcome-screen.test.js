import React from "react";
import renderer from "react-test-renderer";
import WelcomeScreen from "./welcome-screen.jsx";

it(`WelcomeScreen renders correctly: start button & game rules`, () => {
  const tree = renderer
    .create(<WelcomeScreen
      mistakesAmount={3}
      onStartButtonClick={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
