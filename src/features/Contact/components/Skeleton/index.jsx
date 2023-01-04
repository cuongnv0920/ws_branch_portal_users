import { Card, CardActions, CardContent, Skeleton } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

SkeletonContact.propTypes = {
  length: PropTypes.number,
};

SkeletonContact.defaultProps = {
  length: 6,
};

function SkeletonContact(props) {
  const { length } = props;
  return (
    <div>
      {Array.from(new Array(length)).map((x, index) => (
        <Card className="cardContact" sx={{ height: "200px", padding: "6px" }}>
          <CardContent className="cardContact__content">
            <Skeleton />
            <Skeleton animation="wave" />
            <Skeleton animation={false} />
          </CardContent>
          <CardActions className="cardContact__action">
            <Skeleton />
          </CardActions>
        </Card>
      ))}
    </div>
  );
}

export default SkeletonContact;
