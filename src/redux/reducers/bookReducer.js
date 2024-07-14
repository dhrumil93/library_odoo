const initialState = {
    books: [],
    loading: true,
  };
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case 'GET_BOOKS':
        return {
          ...state,
          books: payload,
          loading: false,
        };
      default:
        return state;
    }
  }
  