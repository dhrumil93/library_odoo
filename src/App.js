import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/Store';
import { loadUser } from './redux/actions/authActions';
import setAuthToken from './utils/setAuthToken';
import Register from './components/Register';
import Login from './components/Login';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import AddBook from './components/AddBook';
import BorrowBook from './components/BorrowBook';
import ReturnBook from './components/ReturnBook';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/add-book" component={AddBook} />
          <Route exact path="/borrow-book" component={BorrowBook} />
          <Route exact path="/return-book" component={ReturnBook} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
