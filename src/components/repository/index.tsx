import { FC, useMemo } from "react";
import { IRepositoryComponent } from "./types";
import star from "../../assets/star.svg";
import "./index.scss";

export const Repository: FC<IRepositoryComponent> = ({
  link,
  name,
  description,
  stars,
}) => {
  const convertedStars = useMemo(
    () =>
      stars >= 1000 ? `${Math.round(stars / 100) / 10} K` : stars.toString(),
    [stars]
  );

  return (
    <div className="repository">
      <div className="repository__header">
        <a
          href={link}
          target="_blank"
          className="repository__name"
          rel="noreferrer"
        >
          {name}
        </a>
        <div className="repository__stars">
          {convertedStars}
          <img src={star} className="repository__stars-img" alt="star" />
        </div>
      </div>
      <p>{description}</p>
    </div>
  );
};
