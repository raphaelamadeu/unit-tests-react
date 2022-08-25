
import { Provider } from "react-redux";
import { Pets } from "./components/Pets";

import { store } from './store';

function App() {
  return (
    <div>
      <Provider store={store}>
        <Pets />
      </Provider>
    </div>
  );
}

export default App;
