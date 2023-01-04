import React from "react";
import PropTypes from "prop-types";
import FilterByRoom from "../Filters/FilterByRoom";

ContactFilter.propTypes = {
  filters: PropTypes.object.isRequired,
  onChange: PropTypes.func,
};

function ContactFilter(props) {
  const { filters, onChange } = props;

  const handleRoomChange = (newRoomId) => {
    if (!onChange) return;

    const newFilters = {
      ...filters,
      roomId: newRoomId,
    };

    onChange(newFilters);
  };
  return (
    <div>
      <FilterByRoom onChange={handleRoomChange} />
    </div>
  );
}

export default ContactFilter;
