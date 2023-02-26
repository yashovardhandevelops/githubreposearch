 
 const initialState = {
    repos: [],

}
  const reposReducer = (state = {initialState}, { type, payload }) => {
    switch (type) {
      case 'REPOS':
        return { ...state, repos: payload };
      default:
        return state;
    }
  };

  export default reposReducer
  