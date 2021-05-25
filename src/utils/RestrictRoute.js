import React from "react";
import { useSelector } from "react-redux";
export const RestrictRoute = ({
  component: Component,
  fallback: Fallback,
  isAllow,
}) => {
  const { data, error } = useSelector((state) => state.UserReducer.users);
  const user = data.isAdmin;
  return user ? <Component /> : <Fallback />;
};
