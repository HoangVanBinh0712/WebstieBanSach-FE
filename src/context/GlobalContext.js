import axios from "axios";
import { createContext, useReducer } from "react";
import { BOOK_LOADED_SUCCESS } from "../Constant";
import { BookReducer } from "../reducer/BookReducer";

export const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const [bookState, dispatch] = useReducer(BookReducer, {
    books: [],
    bookLoading: true,
    currentPage: null,
    totalPage: null,
    limit: null,
  });

  const getAllBooks = async () => {
    try {
      const response = await axios.get("api/book/search?page=1");
      dispatch(BOOK_LOADED_SUCCESS, response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const GlobalContextData = { bookState, getAllBooks };
  return (
    <GlobalContext.Provider value={GlobalContextData}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
