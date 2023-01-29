import { Route, useLocation } from "@solidjs/router";
import { Component, createEffect, JSXElement } from "solid-js";
import { useAuthStore } from "../stores/auth";

interface IPrivateRouteProps {
  path: string;
  element: JSXElement;
}

export const PrivateRoute: Component<IPrivateRouteProps> = (props) => {
  const { protectRoute } = useAuthStore;
  const location = useLocation();
  createEffect(() => {
    protectRoute(location.pathname, props.path);
  });
  return (
    <Route
      path={props.path}
      element={props.element}
    />
  );
};
