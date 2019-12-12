import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Home from "./components/Home/Home";
import LostDogsList from "./components/LostDogsList/LostDogsList";
import FoundDogsList from "./components/FoundDogsList/FoundDogsList";
import "./App.css";
import LostAdd from "./components/lostAdd/lostAdd";

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/">Главная</Link>
          <Link to="/lost-dogs">Объявления о пропаже</Link>
          <Link to="/found-dogs">Объявления о находке</Link>
        </nav>
        <Switch>
          <Route exact path="/" render={() => <Home />} />
          <Route exact path="/lost-dogs" render={() => <LostDogsList />} />
          <Route exact path="/found-dogs" render={() => <FoundDogsList />} />
          <Route exact path="/lostAdd" render={() => <LostAdd />} />
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
