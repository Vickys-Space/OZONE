export const initialState = {
  bag: [],
};

// Selector
export const getBagTotal = (bag) =>
  bag?.reduce((amount, item) => parseInt(item.price) + parseInt(amount), 0);
// bag?.reduce((amount, item) => item.price + amount, 0);

console.log("amount", getBagTotal);

const reducer = (state, action) => {
  console.log("action", action);
  switch (action.type) {
    case "ADD_TO_BAG":
      return {
        ...state,
        bag: [...state.bag, action.item],
      };

    case "REMOVE_FROM_BAG":
      const index = state.bag.findIndex((bagItem) => bagItem.id === action.id);

      let newBag = [...state.bag];

      if (index >= 0) {
        newBag.splice(index, 1);
      } else {
        console.warn(`cant remove product (id: ${action.id}) a its not in bag`);
      }

      return {
        ...state,
        bag: newBag,
      };

    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    case "EMPTY_BAG":
      return {
        ...state,
        bag: [],
      };

    default:
      return state;
  }
};

export default reducer;
