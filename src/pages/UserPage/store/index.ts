import { UserType } from "../../../type/type";

export const initUser: UserType = {} as UserType;

export const SAVE_CHANGE = "save_change";

export interface ActionType {
  type: string;
  payload: UserType;
}
export const userReducer = (state: UserType, action: ActionType) => {
  switch (action.type) {
    case SAVE_CHANGE:
      return action.payload;
    default:
      throw state;
  }
};

export const save_change = (payload: UserType) => {
  return {
    type: SAVE_CHANGE,
    payload,
  };
};
