import './App.css'
import * as React from 'react';
import MiniDrawer from './components/MiniDrawer';
import { Provider } from 'react-redux'
import appStore from "../src/utils/appStore.js";
function App() {
  return (
    <Provider store={appStore}>
      <MiniDrawer/>
    </Provider>
  )
}

export default App
