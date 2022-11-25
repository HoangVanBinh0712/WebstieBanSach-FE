import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import axios from "axios";
import SingleBook from "./book/SingleBook";
import "./css/DashBoard.css";
import { Button } from "react-bootstrap";
import BookPaging from "./book/BookPaging";
import * as queryString from "query-string";

function DashBoard() {
  let params = queryString.parse(window.location.search);

  const [bookState, setBookState] = useState({
    books: [],
    categories: [],
    bookLoading: true,
    currentPage: 1,
    totalPage: 1,
  });

  const [searchForm, setSearchForm] = useState({
    search: "",
    category: null,
  });
  const [url, setUrl] = useState(window.location);

  const { search, category } = searchForm;
  const onChangeSearchForm = (event) =>
    setSearchForm({ ...searchForm, [event.target.name]: event.target.value });
  const onSubmitSearch = () => {
    searchBooks();
  };
  function setGetParam(params) {
    var newUrl =
      window.location.origin + window.location.pathname + "?" + params;
    window.history.pushState({ path: newUrl }, "", newUrl);
    setUrl(newUrl);
  }
  async function searchBooks() {
    try {
      let reqParams = "page=1&";
      if (search && search.length !== 0) reqParams += "name=" + search;
      if (category && category > 0) reqParams += "&category=" + category;

      setGetParam(reqParams);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function getBooks() {
      try {
        let reqParams = "";
        if (params && params.name) reqParams += `name=${params.name}&`;
        if (params && params.page) reqParams += `page=${params.page}&`;
        if (params && params.category)
          reqParams += `category=${params.category}&`;
        if (reqParams.length === 0) reqParams = "page=1";
        const bookResponse = await axios.get(
          `api/book/search?limit=12&${reqParams}`
        );
        const categoryResponse = await axios.get(`api/category`);

        setBookState({
          books: bookResponse.data.data,
          categories: categoryResponse.data.datas,
          bookLoading: false,
          currentPage: bookResponse.data.currentPage,
          totalPage: bookResponse.data.totalPage,
        });
      } catch (error) {
        console.log(error);
      }
    }
    getBooks();
  }, [url]);

  const handlePageChange = (pageNumber) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", pageNumber);
    if (params.get("page"))
      //  let key = "page=" + pageNumber;
      setGetParam(params.toString());
    else setGetParam("page=" + pageNumber);
  };

  let body;

  if (bookState.bookLoading) {
    body = <div>Loading</div>;
  } else {
    body = (
      <>
        <div className="list-book-container">
          {bookState.books.map((book) => {
            return (
              <>
                <SingleBook key={book.id} book={book} />
              </>
            );
          })}
        </div>
        <BookPaging
          handlePageChange={handlePageChange}
          currentPage={bookState.currentPage}
          totalPage={bookState.totalPage}
        />
      </>
    );
  }

  let searchView = (
    <>
      <ul className="ul-nav-search">
        <li>
          <select
            name="category"
            onChange={onChangeSearchForm}
            value={category}
          >
            <option value={0}>Category</option>
            {bookState.categories.map((cate) => (
              <option key={cate.id} value={cate.id}>
                {cate.name}
              </option>
            ))}
          </select>
        </li>
        <li>
          <input
            type="text"
            placeholder="search"
            name="search"
            value={search}
            onChange={onChangeSearchForm}
          />
        </li>
        <li>
          <Button onClick={onSubmitSearch}>Search</Button>
        </li>
      </ul>
    </>
  );
  return (
    <div>
      <div className="nav-search">{searchView}</div>
      <div>{body}</div>
    </div>
  );
}

export default DashBoard;
