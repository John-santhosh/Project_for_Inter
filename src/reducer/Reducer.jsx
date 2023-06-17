import { SELECT_USERS, SET_ALL_TASK } from "../actions";

export const reducer = (state, { type, payload }) => {
  // console.log(state);
  // console.log(action);
  if (type === SELECT_USERS) {
    return { ...state, users: payload };
  }
  if (type === SET_ALL_TASK) {
    return { ...state, allTask: payload };
  }
  return state;
  // throw new Error(`no action type : ${type} specified `);
};
