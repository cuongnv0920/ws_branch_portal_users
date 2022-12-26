import React from "react";
import FeaturedNews from "../../components/FeaturedNews";
import News from "../../components/News";

ListPage.propTypes = {};

function ListPage(props) {
  return (
    <div>
      <FeaturedNews />
      <News />
    </div>
  );
}

export default ListPage;
