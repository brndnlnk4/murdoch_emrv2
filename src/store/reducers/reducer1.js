import * as ACTION_TYPES from '../actions/actionTypes';


const initialState = {
  stateProp1: false
};

export default (state=initialState, action) => {

  switch (action.type) {
    case ACTION_TYPES.SUCCESS:
      return{
        ...state,
        stateProp1: true
      };
    case ACTION_TYPES.FAILURE:
      return{
        ...state,
        stateProp1: false
      };
    default:
      return {...state};
  }///END swtich
};////END rooReducer()
