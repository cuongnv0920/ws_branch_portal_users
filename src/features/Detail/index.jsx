import React from "react";
import { Route, Routes } from "react-router-dom";
import ListPage from "./pages/ListPage";

Detail.propTypes = {};

function Detail(props) {
  return (
    <Routes>
      <Route path="/*" element={<ListPage />} />
    </Routes>
  );
}

export default Detail;
