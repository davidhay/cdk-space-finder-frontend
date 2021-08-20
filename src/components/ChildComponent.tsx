import React from "react";
import { useState, FC } from "react";

interface ChildProps {
  appCounter: number;
}

interface ChildState {
  childCounter: number;
}

export const ChildComponent: FC<ChildProps> = (props: ChildProps) => {
  const [childCounter, setChildCounter] = useState({ childCounter: 0 });
  const { appCounter } = props;
  const incrementCounter = () => {
    setChildCounter((state) => {
      return { childCounter: state.childCounter + 1 };
    });
  };
  return (
    <div>
      This is the Child component! <br />
      <button onClick={incrementCounter}> Increment child counter</button>{" "}
      <br />
      <label>Child counter: {childCounter.childCounter}</label> <br />
      <label>Parent counter: {appCounter}</label> <br />
    </div>
  );
};