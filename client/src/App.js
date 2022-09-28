import React from "react";
import Warehouse from "./components/Warehouse";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Inventory from "./components/Inventory";

const App = () => {
  return (
    <div className="min-h-screen  mx-auto container w-full ">
      <Router>
        <Switch>
          <Route exact path="/">
            <Warehouse />
          </Route>

          <Route exact path="/inventories/:id">
            <Inventory />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
