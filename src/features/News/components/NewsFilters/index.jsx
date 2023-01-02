import React from "react";
import PropTypes from "prop-types";

NewsFilters.propTypes = {
  filters: PropTypes.object.isRequired,
  onChange: PropTypes.func,
};

function NewsFilters(props) {
  const { filters, onChange } = props;
  return <div></div>;
}

export default NewsFilters;
