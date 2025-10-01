import React from "react";
import { Provider } from 'react-redux';
import { store } from './Store/store';
import AppRoutes from "./Routes/AppRoutes";

const App = () => (
  <Provider store={store}>
    <AppRoutes />
  </Provider>
);

export default App;