import api from "@/api/Api";
// import UserForm from "@/components/form/UserForm";
import {
  Button,
  // CloseButton,
  //  Dialog,
  //  Portal
} from "@chakra-ui/react";
import axios from "axios";
import { toast } from "react-toastify";
import type { FormValues } from "./userType";
import type { ApiError } from "../auth/SignUp";
import { useState } from "react";
import UserDialog from "./UserDialog";

type AddUserProps = {
  mode?: "create" | "edit";
  triggerElement?: React.ReactNode;
  initialData?: Partial<FormValues>;
  uid?: string;
};

const AddUser = ({
  mode = "create",
  //   uid,
  initialData,
  triggerElement,
}: AddUserProps) => {
  const [isOpen, setIsOpen] = useState(false);

  //   const handleAddUsers = () => {
  //     console.log("clicked");
  //     console.log("Mode: ", mode);
  //   };

  //   const onSubmit: SubmitHandler<FormValues> = async (data) => {
  const onSubmit = async (data: FormValues) => {
    const finalData = {
      ...data,
      dob: data.dob instanceof Date ? data.dob.toISOString() : data.dob,
    };
    console.log("finalData:", finalData); // or send it to the API
    try {
      //   await api.post("/user/signup", finalData, {
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   });
      //   const endpoint = mode === "edit" && uid ? `/user/${uid}` : "/user/signup";
      //   const method = mode === "edit" ? api.put : api.post;
      //   await method(endpoint, finalData, {
      //     headers: { "Content-Type": "application/json" },
      //   });
      await api.post("/user/signup", finalData, {
        headers: { "Content-Type": "application/json" },
      });
      // console.log("Signup Success:", response.data);
      toast.success("Added Successfully");
      setIsOpen(false);
      return undefined;

      // reset();
    } catch (error) {
      //   console.log("Errors", error);

      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const respData = error.response?.data;

        // 422 validation errors (Yup)
        if (status === 422 && Array.isArray(respData.errors)) {
          return respData.errors as ApiError[];
        }

        // 409 conflict: Email already exists
        if (status === 409 && typeof respData.message === "string") {
          return [{ field: "email", message: respData.message }];
        }
      }

      toast.error("An error occurred during signup");
      return undefined;
    }
  };
  return (
    <>
      {/* <Dialog.Root>
        <Dialog.Trigger asChild>
          {triggerElement || (
            <Button bg={"purple"} size="xs" onClick={handleAddUsers}>
              Add Users
            </Button>
          )}
        </Dialog.Trigger>
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
                <UserForm onSubmit={onSubmit} defaultValues={initialData} />
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline">Cancel</Button>
                </Dialog.ActionTrigger>
              
                <Button type="submit" form="user-form">
                  {mode === "edit" ? "Update" : "Submit"}
                </Button>
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root> */}
      {triggerElement ? (
        <span onClick={() => setIsOpen(true)}>{triggerElement}</span>
      ) : (
        <Button bg="purple" size="xs" onClick={() => setIsOpen(true)}>
          Add Users
        </Button>
      )}
      <UserDialog
        mode={mode}
        initialData={initialData}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default AddUser;
