import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Home from "./components/Home/Home";
import LostDogsList from "./components/LostDogsList/LostDogsList";
import FoundDogsList from "./components/FoundDogsList/FoundDogsList";
import FoundForm from "./components/FoundForm/FoundForm";
import LostForm from "./components/LostForm/LostForm";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/">Главная</Link>
          <Link to="/lost-dogs">Объявления о пропаже</Link>
          <Link to="/found-dogs">Объявления о находке</Link>
          <Link to="/add-lost-dog">Добавить объявление о пропаже</Link>
          <Link to="/add-found-dog">Добавить объявление о находке</Link>
        </nav>
        <Switch>
          <Route exact path="/" render={() => <Home />} />
          <Route exact path="/lost-dogs" render={() => <LostDogsList />} />
          <Route exact path="/found-dogs" render={() => <FoundDogsList />} />
          <Route exact path="/add-lost-dog" render={() => <LostForm />} />
          <Route exact path="/add-found-dog" render={() => <FoundForm />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
