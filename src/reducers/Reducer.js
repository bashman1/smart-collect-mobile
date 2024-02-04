import { ADD_USER_DATA, DELETE_USER_DATA } from '../actions/Types';

const initialState = {
    userDataList: []
  }

  const userDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_USER_DATA:
          return {
            ...state,
            userDataList: state.userDataList.concat({
              key: 'userData',
              data: action.data
            })
          };
        case DELETE_USER_DATA:
          return {
            ...state,
            userDataList: state.userDataList.filter((item) =>
              item.key !== action.key)
          };
        default:
          return state;
      }
  }

  export default userDataReducer;