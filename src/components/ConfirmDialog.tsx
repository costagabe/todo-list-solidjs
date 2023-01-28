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
import {
  Accessor,
  Component,
  createSignal,
  JSXElement,
  Setter,
  Signal,
} from "solid-js";

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
  onClose: (value: boolean) => void;
  children?: JSXElement;
  title: JSXElement;
}

export const ConfirmDialog: Component<IConfirmDialogProps> = ({
  open,
  setOpen,
  onClose,
  children,
  title,
}) => {
  const handleClose = async (value: boolean) => {
    await onClose(value);
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open()}
        TransitionComponent={Transition}
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {children}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(false)}>Cancel</Button>
          <Button onClick={() => handleClose(true)}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
