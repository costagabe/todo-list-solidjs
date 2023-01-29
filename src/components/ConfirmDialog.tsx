import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@suid/material";
import { TransitionProps } from "@suid/material/transitions";
import { Accessor, Component, JSXElement, Setter } from "solid-js";

const Transition = function Transition(
  props: TransitionProps & {
    children: JSXElement;
  }
) {
  return (
    <Slide
      direction="up"
      {...props}
    />
  );
};

interface IConfirmDialogProps {
  open: Accessor<boolean>;
  setOpen: Setter<boolean>;
  // eslint-disable-next-line no-unused-vars
  onClose: (value: boolean) => Promise<void>;
  children?: JSXElement;
  title: JSXElement;
}

export const ConfirmDialog: Component<IConfirmDialogProps> = (props) => {
  const handleClose = (value: boolean) => {
    return value ? confirm : cancel;
  };
  const confirm = async () => {
    await props.onClose(true);
    props.setOpen(false);
  };
  const cancel = async () => {
    await props.onClose(true);
    props.setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={props.open()}
        TransitionComponent={Transition}
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {props.children}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(true)}>Cancel</Button>
          <Button onClick={() => handleClose(false)}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
