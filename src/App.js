import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { PrivateRoute } from "./routes";
//import { StateProvider } from "./utils/state";
import {Provider} from 'react-redux'
import store from './redux/store';
import { SnackbarProvider } from "notistack";

import Main from "./pages/Main";
import Auth from "./views/Auth";

function App() {
  //const [initialState] = useState({});

  // const reducer = (state, action) => {
  //   console.log("Reducer action", action);
  //   switch (action.type) {
  //     default:
  //       return state;
  //   }
  // };
  return (
    <Provider store={store}>
      <SnackbarProvider maxSnack={3}>
        <Router>
          <Switch>
            <Route path="/auth">
              <Auth />
            </Route>
            <PrivateRoute path="/">
              <Main />
            </PrivateRoute>
          </Switch>
        </Router>
      </SnackbarProvider>
    </Provider>
  );
}

export default App;
