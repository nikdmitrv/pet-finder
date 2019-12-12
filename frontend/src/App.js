import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Home from "./components/Home/Home";
import "./App.css";
import "./components/lostAdd/lostAdd"
import LostAdd from "./components/lostAdd/lostAdd";

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/">Главная</Link>
        </nav>
        <Switch>
          <Route exact path="/" render={props => <Home {...props} />} />
          <Route exact path='/lostAdd' component={LostAdd} />
        </Switch>
      </div>
    </Router>
  );
}

// function mapDispatchToProps(dispatch) {
//   return {};
// }

// function mapStateToProps(store) {
//   return {};
// }

// export default connect(mapStateToProps, mapDispatchToProps)();

export default App;
