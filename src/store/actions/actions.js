import * as ACTION_TYPES from './actionTypes';


export const SUCCESS = {
  type: ACTION_TYPES.SUCCESS //SUCCESS: string
};

export const FAILURE = {
  type: ACTION_TYPES.FAILURE //FAILURE: string
};

export const ERROR = {
  type: ACTION_TYPES.ERROR //ERROR: string
};

export const USER_INPUT = {
  type: ACTION_TYPES.USER_INPUT //ERROR: string
};


///action creator functions
export const login_success = () => {
  return{
    type: ACTION_TYPES.LOGIN_SUCCESS //SUCCESS: string
  };
};

export const login_failure = () => {
  return{
    type: ACTION_TYPES.LOGIN_FAILURE //SUCCESS: string
  };
};

export const success = () => {
  return{
    type: ACTION_TYPES.SUCCESS //SUCCESS: string
  };
};

export const failure = () => {
  return{
    type: ACTION_TYPES.FAILURE //FAILURE: string
  };
};

export const user_input = (payload) => {
  return{
    type: ACTION_TYPES.USER_INPUT, //FAILURE: string
    payload
  };
};

export const add_user = (payload) => {
  return{
    type: ACTION_TYPES.ADD_USER,
    payload
  };
};

export const authenticate_locally = (payload) => {
  return{
    type: ACTION_TYPES.AUTHENTICATE_LOCALLY,
    ...payload
  };
};

export const get_patients = (payload) => {
  return {
    type: ACTION_TYPES.GET_PATIENTS,
    ...payload
  };
}

export const set_patients = () => {
  return {
    type: ACTION_TYPES.SET_PATIENTS,
  };
}

export const add_patient = (payload) => {
  return{
    type: ACTION_TYPES.ADD_PATIENT,
    ...payload
  };
};
