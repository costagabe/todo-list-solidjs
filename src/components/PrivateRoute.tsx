import { Route, RouteProps, useLocation } from "@solidjs/router";
import { Component, createEffect, JSXElement, onMount } from "solid-js";
import { useAuthStore } from "../stores/auth";

interface IPrivateRouteProps {
  path: string;
  element: JSXElement;
}

export const PrivateRoute: Component<IPrivateRouteProps> = ({
  path,
  element,
}) => {
  const { protectRoute } = useAuthStore;
  const location = useLocation();
  createEffect(() => {
    protectRoute(location.pathname, path);
  });
  return (
    <Route
      path={path}
      element={element}
    />
  );
};
