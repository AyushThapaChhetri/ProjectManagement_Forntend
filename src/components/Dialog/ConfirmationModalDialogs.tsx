import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";

type ConfirmationDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  body?: string;
  confirmText?: string;
  cancelText?: string;
  confirmColorScheme?: string;
};

const ConfirmationModalDialogs = ({
  open,
  onClose,
  onConfirm,
  title,
  body,
  confirmText,
  cancelText,
  confirmColorScheme,
}: ConfirmationDialogProps) => {
  console.log(confirmColorScheme);
  return (
    <Dialog.Root open={open} onOpenChange={({ open }) => !open && onClose()}>
      {/* <Dialog.Trigger asChild>
        <Button variant="outline" size="sm">
          Open Dialog
        </Button>
      </Dialog.Trigger> */}
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{title}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>{body}</Dialog.Body>
            <Dialog.Footer>
              <Button variant="outline" onClick={onClose}>
                {cancelText}
              </Button>
              {/* <Button variant="outline" onClick={onClose}>
                {cancelText}
              </Button> */}
              <Button
                colorPalette={confirmColorScheme}
                // bg={confirmColorScheme}
                onClick={onConfirm}
              >
                {confirmText}
              </Button>
              {/* <Button>Save</Button> */}
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default ConfirmationModalDialogs;
