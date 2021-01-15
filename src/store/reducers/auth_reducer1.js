import * as ACTION_TYPES from '../actions/actionTypes';


const initialState = {
  isAuthenticated: false,
  authenticatedLocally: false
};

export default (state=initialState, action) => {

  switch (action.type) {
    case ACTION_TYPES.LOGIN_FAILURE:
      return{
        ...state,
        isAuthenticated: false
      };
    case ACTION_TYPES.LOGIN_SUCCESS:
      return{
        ...state,
        isAuthenticated: true
      }
    case ACTION_TYPES.AUTHENTICATE_LOCALLY:
      return{
        ...state,
        authenticatedLocally: true
      }
    default:
      return {...state};
  }///END swtich
};////END rooReducer()
