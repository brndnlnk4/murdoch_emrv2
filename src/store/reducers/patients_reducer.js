import * as ACTION_TYPES from '../../store/actions/actionTypes';
import axios from 'axios';


const initialState = {
  patientsDataLimit: 10,
  patientsDataOffset: 0
};


export default (state=initialState, action) => {

// console.log(`___________ patients_reducer.js: initialState: `, state);

  switch (action.type) {
    case ACTION_TYPES.SET_PATIENTS:
      return {
        ...state,
      };
      break;
    case ACTION_TYPES.GET_PATIENTS:
      return {
        ...state,
      };s
      break;
    case ACTION_TYPES.ADD_PATIENT:
      return {
        ...state,
      };
      break;
    default:
      return {
        ...state,
       }
  }
}
