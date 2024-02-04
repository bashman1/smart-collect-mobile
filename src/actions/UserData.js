
import { ADD_USER_DATA, DELETE_USER_DATA } from './Types';

export const addUserData = (userData) => (
  {
    type: ADD_USER_DATA,
    data: userData
  }
);

export const deleteUserData = (key) => (
  {
    type: DELETE_USER_DATA,
    key: key
  }
);