import React from "react";
import PropTypes from "prop-types";
import { showBirthday } from "../../../utils";
import "./styles.scss";

Birthday.propTypes = {
  birthdays: PropTypes.array,
};

export function Birthday(props) {
  const { birthdays } = props;

  function convertSex(sex) {
    if (sex === "Mr") {
      return "Anh";
    } else {
      return "Chị";
    }
  }

  return (
    <div className="birthday">
      <div className="birthday__content">
        <h2 className="birthday__title">Chúc mứng sinh nhật</h2>
        {showBirthday(birthdays).map((user, index) => (
          <h4>{`${convertSex(user.sex)}: ${user.fullName} - ${
            user.room.name
          }`}</h4>
        ))}
      </div>
    </div>
  );
}
