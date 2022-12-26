import React from "react";
import { Route, Routes } from "react-router-dom";
import ListPage from "./pages/ListPage";

News.propTypes = {};

function News(props) {
  return (
    <Routes>
      <Route path="/*" element={<ListPage />} />
    </Routes>
  );
}

export default News;
