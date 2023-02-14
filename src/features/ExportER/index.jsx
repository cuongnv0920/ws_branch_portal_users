import React from "react";
import { Route, Routes } from "react-router-dom";
import ListPage from "./pages/ListPage";

ExportER.propTypes = {};

function ExportER(props) {
  return (
    <Routes>
      <Route path="/*" element={<ListPage />} />
    </Routes>
  );
}

export default ExportER;
