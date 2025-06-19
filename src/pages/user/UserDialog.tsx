// UserDialog.tsx
import { Dialog, Portal, Button, CloseButton } from "@chakra-ui/react";
import UserForm from "@/components/form/UserForm"; // Adjust path as needed
import type { FormValues } from "./userType"; // Adjust path as needed
import type { ApiError } from "../auth/SignUp"; // Adjust path as needed

type UserDialogProps = {
  mode: "create" | "edit";
  initialData?: Partial<FormValues>;
  uid?: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormValues) => Promise<ApiError[] | undefined>;
};

const UserDialog = ({
  mode,
  initialData,
  //   uid,
  isOpen,
  onClose,
  onSubmit,
}: UserDialogProps) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={(val) => !val && onClose()}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>
                {mode === "edit" ? "Edit User" : "Add User"}
              </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <UserForm
                mode={mode}
                onSubmit={onSubmit}
                defaultValues={initialData}
              />
            </Dialog.Body>
            <Dialog.Footer>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" form="user-form">
                {mode === "edit" ? "Update" : "Add User"}
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" onClick={onClose} />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default UserDialog;
