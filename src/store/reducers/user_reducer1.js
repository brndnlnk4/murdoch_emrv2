import * as ACTION_TYPES from '../actions/actionTypes';


const initialState = {
  userInput: 'penis',
  userProfile: {}
};

export default (state=initialState, action) => {

  switch (action.type) {
    case ACTION_TYPES.ADD_USER:
      return {
        ...state,
        userProfile: action.payload
      };
    case ACTION_TYPES.USER_INPUT:
      return{
        ...state,
        userInput: action.payload
      };
    default:
      return {...state};
  }///END swtich
};////END rooReducer()
