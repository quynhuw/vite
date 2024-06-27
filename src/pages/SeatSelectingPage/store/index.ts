import { SeatType } from "../../../type/type";

export const initState: StateType = {
  selectedSeats: <SeatType[]>[],
};
export const ADD_ACTION = "add_selected_seats";
export const REMOVE_ACTION = "remove_selected_seats";

export interface StateType {
  selectedSeats: SeatType[];
}
export interface ActionType {
  type: string;
  payload: SeatType;
}

export const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case ADD_ACTION:
      return {
        ...state,
        selectedSeats: [...state.selectedSeats, action.payload],
      };
    // return { selectedSeats: [...state.selectedSeats, action.payload] };
    case REMOVE_ACTION: {
      const newSelectedSeats = [...state.selectedSeats];
      return {
        selectedSeats: newSelectedSeats.filter(
          (seat) => seat.id !== action.payload.id
        ),
      };
    }
    default:
      throw state;
  }
};

export const add = (payload: SeatType) => {
  return {
    type: ADD_ACTION,
    payload,
  };
};
export const remove = (payload: SeatType) => {
  return {
    type: REMOVE_ACTION,
    payload,
  };
};
