import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import Main from "../main";
import Header from "../../commons/header/Header";
import Footer from "../../commons/Footer";

function User() {
   return (
      <Router>
         <Header />
         <Route exact path="/" component={Main} />
         <Footer />
      </Router>
   );
}
export default User;
