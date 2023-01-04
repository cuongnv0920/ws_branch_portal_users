import React from "react";
import { Route, Routes } from "react-router-dom";
import ListPage from "./pages/ListPage";

Contact.propTypes = {};

function Contact(props) {
  return (
    <Routes>
      <Route path="/*" element={<ListPage />} />
    </Routes>
  );
}

export default Contact;
