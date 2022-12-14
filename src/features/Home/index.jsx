import React from "react";
import { Route, Routes } from "react-router-dom";
import ListPage from "./pages/ListPage";

Home.propTypes = {};

function Home(props) {
  return (
    <Routes>
      <Route path="/*" element={<ListPage />} />
    </Routes>
  );
}

export default Home;
