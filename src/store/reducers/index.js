import reducer1 from './reducer1';
import userReducer1 from './user_reducer1';
import authReducer1 from './auth_reducer1';
import patientsReducer from './patients_reducer';

import { combineReducers } from 'redux';


const rootReducer = combineReducers({
  patientsReducer,
  reducer1,
  authReducer1,
  userReducer1
});

export default rootReducer;
