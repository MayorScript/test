import React from "react";
import clsx from "clsx";

import SidebarList from "./SidebarList";

// MUI related imports
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

export default function Sidebar(props) {
  const { classes, toggleNav, open } = props;
  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
      }}
      open={open}
    >
      <div className={classes.toolbarIcon}>
        <IconButton onClick={toggleNav}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <SidebarList />
    </Drawer>
  );
}
