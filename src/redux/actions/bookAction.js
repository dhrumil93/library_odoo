import axios from 'axios';

// Get Books
export const getBooks = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/books');
    dispatch({
      type: 'GET_BOOKS',
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
};
