import Skeleton from "@mui/material/Skeleton";
import PropTypes from "prop-types";
import React from "react";
import "./styles.scss";

SkeletonNews.propTypes = {
  title: PropTypes.string,
  length: PropTypes.number,
};

SkeletonNews.defauftProps = {
  length: 2,
};

function SkeletonNews(props) {
  const { title, length } = props;
  return (
    <div className="ckeleton">
      <div className="ckeleton__title title-news">
        <h4>{title}</h4>
      </div>

      <div className="ckeleton__content content">
        {Array.from(new Array(length)).map((x, index) => (
          <div key={index} className="content__card">
            <Skeleton />
            <Skeleton animation="wave" />
            <Skeleton animation={false} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkeletonNews;
