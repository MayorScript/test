import React from "react";
import { Switch, Route } from "react-router-dom";
import PageTemplate from "../../components/PageTemplate";

import { routes } from "../../routes";

export default function Main() {
  return (
    <PageTemplate>
      <Switch>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            children={<route.main />}
          />
        ))}
      </Switch>
    </PageTemplate>
  );
}
