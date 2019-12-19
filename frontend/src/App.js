import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { connect } from "react-redux";

import Home from "./components/Home/Home";
import Loading from "./components/Loading/Loading";
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
import FindMatchesLost from "./components/FindMatches/FindMatchesLost";
import FindMatchesFound from "./components/FindMatches/FindMatchesFound";
import "./App.css";
import { fetchSessionAC, clearMessageAC } from "./redux/actions";

class App extends Component {
  componentDidMount = () => {
    this.props.fetchSession();
  };

  componentWillUnmount = () => {
    this.props.clearMessage();
  };

  render() {
    return (
      <Router>
        {this.props.loading ? (
          <div className="loading-block">
            <Loading />
          </div>
        ) : null}
        <div className="header">
          <div className="logo">ИЩЕЙКА</div>
          <nav>
            <Link
              to="/"
              style={{ position: "absolute", left: "10vw", top: "0px" }}
            >
              Главная
            </Link>
            <Link to="/lost-dogs">Потерялись</Link>
            <Link to="/found-dogs">Нашлись</Link>
            {this.props.logged ? (
              <>
                <Link to="/add-lost-dog">Добавить объявление о пропаже</Link>
                <Link to="/add-found-dog">Добавить объявление о находке</Link>
              </>
            ) : null}
            {this.props.logged ? (
              <>
                <Link
                  style={{ position: "absolute", left: "80vw", top: "0px" }}
                  to={"/account/" + this.props.user._id}
                >
                  Личный кабинет
                </Link>
                <Link
                  style={{ position: "absolute", left: "90vw", top: "0px" }}
                  to="/logout"
                >
                  Выход
                </Link>
              </>
            ) : (
              <>
                <Link
                  style={{ position: "absolute", left: "82vw", top: "0px" }}
                  to="/registration"
                >
                  Регистрация
                </Link>
                <Link
                  style={{ position: "absolute", left: "90vw", top: "0px" }}
                  to="/login"
                >
                  Вход
                </Link>
              </>
            )}
          </nav>
        </div>

        <Switch>
          <Route exact path="/" render={() => <Home />} />
          <div className="App">
            <Route exact path="/registration" render={() => <Registration />} />
            <Route exact path="/login" render={() => <Login />} />
            <Route exact path="/logout" render={() => <Logout />} />
            <Route exact path="/lost-dogs" render={() => <LostDogsList />} />
            <Route exact path="/found-dogs" render={() => <FoundDogsList />} />
            <Route exact path="/add-lost-dog" render={() => <LostForm />} />
            <Route exact path="/add-found-dog" render={() => <FoundForm />} />
            <Route exact path="/account/:id" component={Account} />
            <Route exact path="/editFound/:id" component={EditFoundDog} />
            <Route exact path="/editLost/:id" component={EditLostDog} />
            <Route
              exact
              path="/find-matches/lost/:id"
              component={FindMatchesLost}
            />
            <Route
              exact
              path="/find-matches/found/:id"
              component={FindMatchesFound}
            />
            <Route
              exact
              path="/found-dogs/map"
              render={() => (
                <FoundDogsMap foundDogsList={this.props.foundDogsList} />
              )}
            />
            <Route
              exact
              path="/lost-dogs/map"
              render={() => (
                <LostDogsMap lostDogsList={this.props.lostDogsList} />
              )}
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
          </div>
        </Switch>
        <div className="footer"></div>
      </Router>
    );
  }
}

function mapStateToProps(store) {
  return {
    foundDogsList: store.foundDogsList,
    lostDogsList: store.lostDogsList,
    user: store.user,
    logged: store.logged,
    loading: store.loading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchSession: () => dispatch(fetchSessionAC()),
    clearMessage: () => dispatch(clearMessageAC())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
