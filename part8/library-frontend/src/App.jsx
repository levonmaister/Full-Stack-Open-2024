import { useState, useEffect } from "react";
import {useApolloClient, useMutation} from '@apollo/client'
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Notify from "./components/Notify"

import LoginForm from "./components/LoginForm"
import Buttons from "./components/Buttons"
import Recommendations from "./components/Recommendations"

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false)

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }





  return (
    <div>
      <div>
      <Notify errorMessage={errorMessage} />
       <Buttons setLoggedIn={setLoggedIn} setToken={setToken} setPage={setPage} loggedIn={loggedIn}/>
      </div>

      <LoginForm 
      show={page==='login'}
      setToken={setToken}
      setError={notify}
      setPage={setPage}
      setLoggedIn={setLoggedIn}
              />

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <Recommendations show={page === "recommendations"} />

      <NewBook show={page === "add"} setError={setErrorMessage}/>
    </div>
  );
};

export default App;
