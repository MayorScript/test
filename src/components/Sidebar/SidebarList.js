import React from "react";
import { useHistory } from "react-router-dom";

// MUI related imports
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import Divider from "@material-ui/core/Divider";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import TableChartIcon from "@material-ui/icons/TableChart";

// Custom components
import ListItemLink from "./ListItemLink";

export default function SidebarList() {
  const history = useHistory();
  const logOut = () => {
    localStorage.removeItem("MS_loggedIn");
    history.push("/");
  };
  return (
    <>
      <List>
        <ListItemLink to="/" primary="Dashboard" icon={<DashboardIcon />} />
        <ListItemLink to="/users" primary="Users" icon={<PeopleIcon />} />
        <ListItemLink to="/matrix" primary="Matrix" icon={<TableChartIcon />} />
        <ListItemLink
          to="/quests"
          primary="Quests"
          icon={<AccountTreeIcon />}
        />
      </List>
      <Divider />
      <List>
        <ListItem button onClick={logOut}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Log out" />
        </ListItem>
      </List>
    </>
  );
}
