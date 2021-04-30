import React from "react";
import { Route } from "react-router-dom";
import Home from "../home";
import Header from "../../commons/header/Header";
import Footer from "../../commons/Footer";
import ShoppingCart from "../shoppingCart";
import ProductList from "../productList";
import ProductDetail from "../productDetail";

function Main() {
   return (
      <>
         <Header />
         <Route exact path="/" component={Home} />
         <Route exact path="/cart" component={ShoppingCart} />
         <Route exact path="/list" component={ProductList} />
         <Route path="/detail" component={ProductDetail} />
         <Footer />
      </>
   );
}
export default Main;
