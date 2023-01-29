import { useNavigate } from "@solidjs/router";
import { AppBar, Box, Stack, Toolbar, Typography } from "@suid/material";
import BoxProps from "@suid/material/Box/BoxProps";
import { Component, JSXElement } from "solid-js";

export interface ITheAppBarProps extends BoxProps {
  children?: JSXElement;
}
export const TheAppBar: Component<ITheAppBarProps> = (props) => {
  const navigate = useNavigate();
  return (
    <Box sx={{ flex: "0 1" }}>
      <AppBar
        color="primary"
        position="static">
        <Toolbar>
          <Stack
            direction="row"
            justifyContent="space-between"
            flex={1}>
            <Typography
              variant="h6"
              component="span"
              onClick={() => navigate("/")}
              sx={{
                flexGrow: "0 1",
                "&:hover": {
                  cursor: "pointer",
                },
              }}>
              Todo-list
            </Typography>
            {props.children}
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
