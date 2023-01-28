import { AppBar, Box, Toolbar, Typography } from "@suid/material";
import BoxProps from "@suid/material/Box/BoxProps";
import { ElementType } from "@suid/types";
import { Component, JSXElement } from "solid-js";

export interface ITheAppBarProps extends BoxProps {
  children?: JSXElement;
}
export const TheAppBar: Component<ITheAppBarProps> = (props) => {
  return (
    <Box sx={{ flex: "0 1" }}>
      <AppBar
        color="primary"
        position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}>
            Todo-list
          </Typography>
        {props.children}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
