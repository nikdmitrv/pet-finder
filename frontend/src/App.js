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
import Account from "./components/Account/Account";
import EditFoundDog from "./components/Account/EditFoundDog";
import EditLostDog from "./components/Account/EditLostDog";
import FoundDogsMap from "./components/FoundDogsList/FoundDogsMap";
import LostDogsMap from "./components/LostDogsList/LostDogsMap";
import Advert from "./components/Advert/Advert";
import FindMatchesLost from "./components/FindMatches/FindMatchesLost";
import FindMatchesFound from "./components/FindMatches/FindMatchesFound";
import "./App.css";
import logo from "./logos/logo.png";
import logoText from "./logos/logo-text.png";
import jsLogo from "./logos/js.png";
import reactLogo from "./logos/react.png";
import reduxLogo from "./logos/redux.png";
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
          <nav>
            <div className="nav-logos">
              <Link to="/">
                <img className="logo" alt="logo" src={logo}></img>
              </Link>
              <Link to="/">
                <img className="logo-text" alt="logo-text" src={logoText}></img>
              </Link>
            </div>
            <div id="nav-main">
              <Link className="color" to="/lost-dogs">Потерянные</Link>
              <Link className="color" to="/found-dogs">Найденные</Link>
            </div>
            <div className="nav-auth">
              {this.props.logged ? (
                <>
                  <Link className="color" to={"/account/" + this.props.user._id}>
                    Личный кабинет
                  </Link>
                  <Link className="color" to="/logout">Выход</Link>
                </>
              ) : (
                <>
                  <Link className="color" to="/registration">Регистрация</Link>
                  <Link className="color" to="/login">Вход</Link>
                </>
              )}
            </div>
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
        <div className="footer">
          <div className="footer-text">Created by Raccon-Dogs 2019 ©</div>
          <div className="footer-map">
            <div className="footer-link">
              <Link to="/">главная</Link>
            </div>
            <div className="footer-link">
              <Link to="/account/:id">личный кабинет</Link>
            </div>
            <div className="footer-link">
              <Link to="/lost-dogs">список потерянных собак</Link>
            </div>
            <div className="footer-link">
              <Link to="/found-dogs">список найденных собак</Link>
            </div>
          </div>
          <div className="footer-logos">
            <img alt="js-logo" src={jsLogo}></img>
            <img alt="react-logo" src={reactLogo}></img>
            <img alt="redux-logo" src={reduxLogo}></img>
          </div>
        </div>
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
