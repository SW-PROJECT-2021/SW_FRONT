import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Main from "../main";
import Header from "../../commons/header/Header";
import Footer from "../../commons/Footer";
import ShoppingCart from "../shoppingCart";
import ProductList from "../productList";

function User() {
  return (
    <>
      <Header />
      <Route exact path="/" component={Main} />
      <Route exact path="/cart" component={ShoppingCart} />
      <Route path="/list" component={ProductList} />
      <Footer />
    </>
  );
}
export default User;
