import React, { FC } from "react";
import { IRepositoriesList } from "./types";
import { Repository } from "../repository";
import './index.scss';

export const RepositoriesList: FC<IRepositoriesList> = ({
  repositories = [],
}) => {
  return (
    <div className="repositories-list">
      {repositories.map((item) => (
        <Repository
          key={item.id}
          name={item.name}
          link={item.html_url}
          stars={item.stargazers_count}
          description={item.description}
        />
      ))}
    </div>
  );
};
