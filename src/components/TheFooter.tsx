import { AppBar, Box, Toolbar, Typography } from "@suid/material";
import { Component } from "solid-js";

export const TheFooter: Component = () => {
  return (
    <AppBar
      color="primary"
      position="static">
      <Toolbar>
        <Typography
          variant="caption"
          component="div"
          sx={{ flexGrow: 1 }}>
          Todo-list
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
