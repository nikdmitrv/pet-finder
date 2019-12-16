import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { connect } from "react-redux";

import Home from "./components/Home/Home";
import Registration from "./components/Registration/Registration";
import Login from "./components/Login/Login";
import Logout from "./components/Logout/Logout";
import LostDogsList from "./components/LostDogsList/LostDogsList";
import FoundDogsList from "./components/FoundDogsList/FoundDogsList";
import FoundForm from "./components/FoundForm/FoundForm";
import LostForm from "./components/LostForm/LostForm";
import Account from "./components/account/Account";
import EditFoundDog from "./components/account/EditFoundDog";
import EditLostDog from "./components/account/EditLostDog";
import FoundDogsMap from "./components/FoundDogsList/FoundDogsMap";
import LostDogsMap from "./components/LostDogsList/LostDogsMap";
import Advert from "./components/Advert/Advert";
import "./App.css";
import { fetchSessionAC } from "./redux/actions";

function App(props) {
  console.log(props.logged);
  useEffect(() => {
    console.log("fetchsession");
    props.fetchSession();
  });
  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/">Главная</Link>
          {props.logged ? (
            <Link to="/logout">Выход</Link>
          ) : (
            <>
              <Link to="/registration">Регистрация</Link>
              <Link to="/login">Вход</Link>
            </>
          )}

          <Link to="/lost-dogs">Объявления о пропаже</Link>
          <Link to="/found-dogs">Объявления о находке</Link>
          {props.logged ? (
            <>
              <Link to="/add-lost-dog">Добавить объявление о пропаже</Link>
              <Link to="/add-found-dog">Добавить объявление о находке</Link>
            </>
          ) : null}
        </nav>
        <Switch>
          <Route exact path="/" render={() => <Home />} />
          <Route exact path="/registration" component={Registration} />
          <Route exact path="/login" render={() => <Login />} />
          <Route exact path="/logout" render={() => <Logout />} />
          <Route exact path="/lost-dogs" render={() => <LostDogsList />} />
          <Route exact path="/found-dogs" render={() => <FoundDogsList />} />
          <Route exact path="/add-lost-dog" render={() => <LostForm />} />
          <Route exact path="/add-found-dog" render={() => <FoundForm />} />
          <Route exact path="/account/:id" component={Account} />
          <Route exact path= "/editFound/:id" component={EditFoundDog}/>
          <Route exact path= "/editLost/:id" component={EditLostDog}/>
          <Route
            exact
            path="/found-dogs/map"
            render={() => <FoundDogsMap foundDogsList={props.foundDogsList} />}
          />
          <Route
            exact
            path="/lost-dogs/map"
            render={() => <LostDogsMap lostDogsList={props.lostDogsList} />}
          />
          <Route
            exact
            path="/advert/found/:id"
            render={props => {
              return <Advert {...props} advertType="found" />;
            }}
          />
          <Route
            exact
            path="/advert/lost/:id"
            render={props => {
              return <Advert {...props} advertType="lost" />;
            }}
          />
        </Switch>
      </div>
    </Router>
  );
}

function mapStateToProps(store) {
  return {
    foundDogsList: store.foundDogsList,
    lostDogsList: store.lostDogsList,
    logged: store.logged
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchSession: () => dispatch(fetchSessionAC())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
