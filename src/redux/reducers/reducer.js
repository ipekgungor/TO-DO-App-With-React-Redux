const initialState = {
  userData: [],
};

export const todoreducers = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_DATA":
      return {
        ...state,
        userData: [...state.userData, action.payload],
      };
    case "REMOVE_DATA":
      const afterDeletedData = state.userData.filter(
        (element, k) => k !== action.payload
      );
      return {
        ...state,
        userData: afterDeletedData,
      };
    case "UPDATE_DATA":
      const updateData = state.userData.map((element, k) =>
        k === action.id ? action.payload : element
      );
      return {
        ...state,
        userData: updateData,
      };
    default:
      return state;
  }
};
