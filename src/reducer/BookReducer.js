import {
  BOOK_DELETED_SUCCESS,
  BOOK_UPDATED_SUCCESS,
  BOOK_LOADED_SUCCESS,
} from "../Constant";
export const BookReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case BOOK_DELETED_SUCCESS:
      return {};
    case BOOK_LOADED_SUCCESS:
      return {
        ...state,
        books: payload.data,
        bookLoading: false,
      };
    default:
      return state;
  }
};
