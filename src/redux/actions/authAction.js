import axios from 'axios';

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/auth/me');
    dispatch({
      type: 'USER_LOADED',
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: 'AUTH_ERROR',
    });
  }
};

// Register User
export const register = (formData) => async (dispatch) => {
  try {
    const res = await axios.post('/api/auth/register', formData);
    dispatch({
      type: 'REGISTER_SUCCESS',
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: 'REGISTER_FAIL',
    });
  }
};

// Login User
export const login = (formData) => async (dispatch) => {
  try {
    const res = await axios.post('/api/auth/login', formData);
    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: 'LOGIN_FAIL',
    });
  }
};

// Logout
export const logout = () => (dispatch) => {
  dispatch({ type: 'LOGOUT' });
};
