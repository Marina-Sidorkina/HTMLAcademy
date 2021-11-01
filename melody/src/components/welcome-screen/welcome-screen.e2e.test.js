import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import WelcomeScreen from "./welcome-screen";

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`WelcomeScreen`, () => {
  it(`Check the onStartButtonClick callback`, () => {
    const onStartButtonClick = jest.fn();
    const welcomeScreen = shallow(
        <WelcomeScreen
          mistakesAmount={3}
          onStartButtonClick ={onStartButtonClick}
        />
    );
    const startButton = welcomeScreen.find(`button.welcome__button`);

    startButton.simulate(`click`);

    expect(onStartButtonClick).toHaveBeenCalledTimes(1);
  });
});
