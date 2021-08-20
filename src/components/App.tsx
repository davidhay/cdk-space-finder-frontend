import { FC, useState } from "react";
import { ChildComponent } from "./ChildComponent";

interface AppState {
  appCounter: number;
}

const App: FC<{}> = () => {
  const [counter, setCounter] = useState({ appCounter: 0 } as AppState);

  const incrementCounter = () => {
    setCounter((oldState) => {
      return { appCounter: oldState.appCounter + 1 };
    });
  };

  return (
    <div>
      This is the Parent component! <br />
      <button onClick={incrementCounter}> Increment parent counter</button>
      <ChildComponent appCounter={counter.appCounter} />
    </div>
  );
};
export default App;
