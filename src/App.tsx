import React, { useCallback, useEffect, useState } from "react";
import { useApi } from "./hooks/useApi";
import { getRequest } from "./api";
import { RepositoriesList } from "./components/repositoriesList";
import { IRepositoriesInfo } from "./typings/repositories";
import logo from "./assets/logo.svg";
import "./App.scss";

function App() {
  const {
    data: repositories,
    sendRequest,
    loading: repositoriesLoading,
  } = useApi<IRepositoriesInfo>(getRequest);

  const [page, setPage] = useState(0);

  const getRepositoriesData = useCallback(
    (currentPage = page) => {
      if (currentPage >= 0) {
        setPage(currentPage);
        sendRequest(
          `https://api.github.com/search/repositories?q=language:Typescript&sort=stars&page=${page}&per_page=10`
        );
      }
    },
    [page, sendRequest]
  );

  useEffect(() => {
    getRepositoriesData();
  }, []);

  return (
    <div className="app">
      {repositoriesLoading || !repositories?.items ? (
        <img src={logo} className="app-logo" alt="logo" />
      ) : (
        <>
          <div
            onClick={() => getRepositoriesData(page - 1)}
            className="app__btn-col"
          >
            <span className="app__counter">{page + 1}</span>
            {!!page && <span className="app__arrow">&#8249;</span>}
          </div>
          <div className="app__content">
            <RepositoriesList repositories={repositories.items} />
          </div>
          <div
            onClick={() => getRepositoriesData(page + 1)}
            className="app__btn-col"
          >
            <span className="app__arrow">&#8250;</span>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
