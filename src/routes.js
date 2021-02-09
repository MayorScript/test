import React from "react";
import { Route, Redirect } from "react-router-dom";
import QuestsTable from "./pages/QuestsTable";
import Quest from "./pages/Quest";
import Users from "./views/Users";
import Test from "./pages/Test";
import Matrix from "./pages/Matrix";
import QuestCard from "./components/Cards/Quest";
export const PrivateRoute = ({ children, ...rest }) => {
  const loggedIn = !!localStorage.getItem("MS_loggedIn");
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return loggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/auth",
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export const routes = [
  {
    path: "/dashboard",
    exact: true,
    title: () => "Dashboard",
    main: () => <div>Here will be some general info. Maybe some charts.</div>,
  },
  {
    path: "/users",
    title: () => "Users",
    main: () => <Users />,
  },
  {
    path: "/test",
    title: () => "Test",
    main: () => <Test />,
  },
  {
    path: "/quests",
    exact: true,
    title: () => "Quests",
    main: () => <QuestsTable />,
  },
  {
    path: "/quest",
    exact: true,
    title: () => "Quests",
    main: () => <QuestCard />,
  },
  {
    path: "/quests/:id",
    title: () => "Quest Details",
    main: () => <Quest />,
  },
  {
    path: "/matrix",
    title: () => "Matrix",
    main: () => <Matrix />,
  },
];
