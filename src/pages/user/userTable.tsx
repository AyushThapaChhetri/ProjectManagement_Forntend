import {
  ActionBar,
  Button,
  Checkbox,
  Flex,
  HStack,
  IconButton,
  Input,
  Portal,
  Select,
  Table,
  Text,
  createListCollection,
  useDisclosure,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { fetchUsers } from "@/api/UserApi";
import { useNavigate } from "react-router";
import type { FormValues } from "./userType";
import api from "@/api/Api";
import { toast } from "react-toastify";
import axios from "axios";
import type { ApiError } from "../auth/SignUp";
import UserDialog from "./UserDialog";
import {
  LuChevronLeft,
  LuChevronRight,
  LuChevronsLeft,
  LuChevronsRight,
} from "react-icons/lu";
import ConfirmationModalDialogs from "@/components/Dialog/ConfirmationModalDialogs";
import { DismissibleAlert } from "@/components/Alert/DismssibleAlert";

// Define the limit options and collection outside the component (static data)
const limitOptions = [
  { label: "10", value: "10" },
  { label: "20", value: "20" },
  { label: "30", value: "30" },
  { label: "40", value: "40" },
  { label: "50", value: "50" },
];
const limitCollection = createListCollection({ items: limitOptions }); // Create collection using createListCollection

type User = {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  // gender: string;
  gender?: "male" | "female" | "other" | undefined;
  dob: string; // or Date if already parsed
  address: string;
  phone: string;
  title: string;
  avatarUrl: string;
  createdAt: string; // or Date
  roles: string[];
};

const display = (value: unknown): React.ReactNode => {
  if (!value) return "-";

  if (typeof value === "string" || typeof value === "number") return value;

  if (value instanceof Date) return value.toLocaleDateString();

  if (Array.isArray(value)) return value.length ? value.join(", ") : "-";

  if (typeof value === "object") return JSON.stringify(value);

  return value.toString();
};

interface UserTableProps {
  searchInput: string;
  messageAlert: {
    message: string;
    status: "error" | "warning" | "info" | "success";
  } | null;
  setMessageAlert: React.Dispatch<
    React.SetStateAction<{
      message: string;
      status: "error" | "warning" | "info" | "success";
    } | null>
  >;
  version: number;
}

export const UserTable = ({
  searchInput,
  messageAlert,
  setMessageAlert,
  version,
}: UserTableProps) => {
  // const [usersData, setUsersData] = useState<User[] | null>(null);
  const [usersData, setUsersData] = useState<User[]>([]);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [selection, setSelection] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10); // Default to 10 entries per page
  const [total, setTotal] = useState(0);
  const [goToPage, setGoToPage] = useState("");
  const navigate = useNavigate();

  // Reset page to 1 when limit changes
  useEffect(() => {
    setPage(1);
  }, [limit]);

  // Fetch users when page or limit changes
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetchUsers(navigate, page, limit);

  //       // if your API returns { data: { users, total } } then destructure further:

  //       setUsersData(response.data); // adjust depending on actual shape
  //       setTotal(response.total);
  //     } catch (error) {
  //       console.error("Failed to fetch users:", error);
  //       setUsersData([]);
  //     }
  //   };
  //   fetchData();
  // }, [navigate, page, limit]);

  // 1) Define fetchData as useCallback so it only changes when page or limit change
  const fetchData = useCallback(async () => {
    try {
      const response = await fetchUsers(navigate, page, limit);
      setUsersData(response.data);
      setTotal(response.total);
    } catch {
      setUsersData([]);
    }
  }, [navigate, page, limit]);

  useEffect(() => {
    fetchData();
  }, [fetchData, version]);

  // console.log(usersData);

  const filteredData = usersData?.filter(
    (user) =>
      (user.firstName ?? "")
        .toLowerCase()
        .includes(searchInput.toLowerCase()) ||
      (user.lastName ?? "").toLowerCase().includes(searchInput.toLowerCase()) ||
      (user.email ?? "").toLowerCase().includes(searchInput.toLowerCase()) ||
      (user.phone ?? "").toLowerCase().includes(searchInput.toLowerCase()) ||
      (user.title ?? "").toLowerCase().includes(searchInput.toLowerCase()) ||
      (user.address ?? "").toLowerCase().includes(searchInput.toLowerCase()) ||
      (user.roles ?? []).some((role) =>
        role.toLowerCase().includes(searchInput.toLowerCase())
      )
  );
  // console.log(filteredData);

  console.log("Selected Ids:", selection);

  //confirmation Dialog box
  const { open, setOpen } = useDisclosure();
  // at the top of your component
  // const [messageAlert, setMessageAlert] = useState<{
  //   message: string;
  //   status: "error" | "warning" | "info" | "success";
  // } | null>(null);

  const handleDelete = () => {
    console.log("Delete Clicked");
    setOpen(true);
    console.log("Open after delete click", open);
  };
  const handleClose = () => {
    setOpen(false);
    console.log("Open after close click", open);
  };
  const handleConfirmDelete = async () => {
    // your delete logic here
    console.log("Confirmed delete!");
    try {
      const response = await api.delete("/user/uids", {
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          uids: selection,
        },
      });

      setMessageAlert({ message: response.data.message, status: "success" });
      // clear all checkboxes
      setSelection([]);
      // remove the deleted UIDs from your usersData
      // setUsersData((current) =>
      //   current.filter((user) => !selection.includes(user.uid))
      // );
      await fetchData();
    } catch (error) {
      console.log(error);

      let msg = "Unable to delete.";
      let status: "error" | "info" | "warning" = "error";

      if (axios.isAxiosError(error)) {
        const code = error.response?.status;
        msg = error.response?.data?.message || msg;
        if (code === 400) status = "warning";
        else if (code === 403) status = "error";
        else status = "info";
      }

      setMessageAlert({ message: msg, status });
    } finally {
      setOpen(false);
      console.log("Open after confirm Delete", open);
    }

    // setOpen(false);
  };

  // console.log("Current usersData:", usersData);
  // if (!usersData) return <div>Loading...</div>;

  const handleEditUser = (user: User) => {
    setEditUser(user);
    setIsEditDialogOpen(true);
  };

  const onSubmitEdit = async (
    data: FormValues
  ): Promise<ApiError[] | undefined> => {
    if (!editUser) return undefined;
    const finalData = {
      ...data,
      dob: data.dob instanceof Date ? data.dob.toISOString() : data.dob,
    };
    try {
      await api.put(`/user/${editUser.uid}`, finalData, {
        headers: { "Content-Type": "application/json" },
      });
      toast.success("User Updated Successfully");
      setIsEditDialogOpen(false);
      // Optionally refresh usersData here
      const updatedUsers = await fetchUsers(navigate, page, limit);
      setUsersData(updatedUsers.data);
      setTotal(updatedUsers.total);
      return undefined;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const respData = error.response?.data;
        if (status === 422 && Array.isArray(respData.errors)) {
          return respData.errors as ApiError[];
        }
        if (status === 409 && typeof respData.message === "string") {
          return [{ field: "email", message: respData.message }];
        }
        if (status === 403 && typeof respData.message === "string") {
          toast.error(respData.message); // Show backend error message
          return undefined;
        }
      }
      toast.error("An error occurred during update");
      return undefined;
    }
  };

  const handleGoToPage = () => {
    const pageNum = parseInt(goToPage);
    const maxPage = Math.ceil(total / limit);
    if (pageNum >= 1 && pageNum <= maxPage) {
      setPage(pageNum);
      setGoToPage("");
    }
  };

  const handleLimitChange = (newLimit: string) => {
    setLimit(parseInt(newLimit));
  };

  const totalPages = Math.ceil(total / limit);

  // const visibleCount = filteredData?.length;
  // const hasSelection = selection.length > 0;
  // const indeterminate = hasSelection && selection.length < usersData?.length;
  // const indeterminate = hasSelection && selection.length < visibleCount;

  const visibleCount = filteredData?.length;
  const hasSelection = selection.length > 0;
  const allVisibleSelected = selection.length === visibleCount;
  const indeterminate = hasSelection && !allVisibleSelected;

  const rows = filteredData?.map((item, index) => (
    <Table.Row
      key={item.uid}
      data-selected={selection.includes(item.uid) ? "" : undefined}
    >
      <Table.Cell>
        <Checkbox.Root
          size="sm"
          top="0.5"
          aria-label="Select row"
          checked={selection.includes(item.uid)}
          onCheckedChange={(changes) => {
            setSelection((prev) =>
              changes.checked
                ? [...prev, item.uid]
                : prev.filter((uid) => uid !== item.uid)
            );
          }}
        >
          <Checkbox.HiddenInput />
          <Checkbox.Control />
        </Checkbox.Root>
      </Table.Cell>
      <Table.Cell>{index + 1}</Table.Cell>
      <Table.Cell>{display(item.firstName)}</Table.Cell>
      <Table.Cell>{display(item.lastName)}</Table.Cell>
      <Table.Cell>{display(item.email)}</Table.Cell>
      <Table.Cell>{display(item.gender)}</Table.Cell>
      <Table.Cell>{display(item.dob ? new Date(item.dob) : null)}</Table.Cell>
      <Table.Cell>{display(item.address)}</Table.Cell>
      <Table.Cell>{display(item.phone)}</Table.Cell>
      <Table.Cell>{display(item.title)}</Table.Cell>
      <Table.Cell>{display(item.avatarUrl)}</Table.Cell>
      <Table.Cell>
        {display(item.createdAt ? new Date(item.createdAt) : null)}
      </Table.Cell>
      <Table.Cell>{display(item.roles)}</Table.Cell>
      <Table.Cell>
        <IconButton
          size="2xs"
          variant="surface"
          _hover={{ color: "blue.600" }}
          onClick={() => handleEditUser(item)}
        >
          <FaRegEdit />
        </IconButton>
      </Table.Cell>
    </Table.Row>
  ));

  return (
    <>
      <Flex
        minH={0}
        bg="transparent"
        rounded="md"
        userSelect="none"
        direction={"column"}

        // overflow="hidden"
      >
        {messageAlert && (
          <DismissibleAlert
            status={messageAlert.status}
            title={messageAlert.message}
            duration={5000} // auto‑close after 5s (optional)
            onClose={() => setMessageAlert(null)}
          />
        )}
        <Table.ScrollArea
          borderWidth="1px"
          rounded="md"
          maxH="100%"
          w="100%"
          minW={"300px"}
          // overflowX={{ base: "hidden", md: "auto" }}
        >
          <Table.Root size={{ base: "sm", ultra: "lg" }} stickyHeader>
            <Table.Header>
              <Table.Row bg={"gray.200"}>
                <Table.ColumnHeader w="6">
                  <Checkbox.Root
                    size="sm"
                    borderWidth={"1px"}
                    borderColor={"white"}
                    // border={"1px solid white"}
                    top="0.5"
                    aria-label="Select all rows"
                    checked={
                      indeterminate ? "indeterminate" : allVisibleSelected
                    }
                    onCheckedChange={(changes) => {
                      setSelection(
                        changes.checked
                          ? filteredData.map((item) => item.uid)
                          : []
                      );
                    }}
                  >
                    <Checkbox.HiddenInput />
                    <Checkbox.Control />
                  </Checkbox.Root>
                </Table.ColumnHeader>
                <Table.ColumnHeader>Number</Table.ColumnHeader>
                <Table.ColumnHeader>FirstName</Table.ColumnHeader>
                <Table.ColumnHeader>LastName</Table.ColumnHeader>
                <Table.ColumnHeader>Email</Table.ColumnHeader>
                <Table.ColumnHeader>Gender</Table.ColumnHeader>
                <Table.ColumnHeader>Dob</Table.ColumnHeader>
                <Table.ColumnHeader>Address</Table.ColumnHeader>
                <Table.ColumnHeader>Phone</Table.ColumnHeader>
                <Table.ColumnHeader>Title</Table.ColumnHeader>
                <Table.ColumnHeader>AvatarUrl</Table.ColumnHeader>
                <Table.ColumnHeader>CreatedAt</Table.ColumnHeader>
                <Table.ColumnHeader>Roles</Table.ColumnHeader>
                <Table.ColumnHeader>Actions</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>{rows}</Table.Body>
          </Table.Root>
        </Table.ScrollArea>
      </Flex>
      {/* Enhanced Pagination */}
      {total > 0 && (
        <Flex
          justify="space-between"
          align="center"
          mt={4}
          p={3}
          bg="gray.50"
          borderRadius="md"
          wrap="wrap"
          gap={4}
          minW={"300px"}
          userSelect="none"
        >
          <HStack spaceX={4} flex="1" minW="300px">
            <HStack spaceX={2}>
              <Text fontSize="sm" color="gray.600">
                Show
              </Text>
              <Select.Root
                collection={limitCollection} // Pass the collection created with createListCollection
                value={[limit.toString()]} // Current limit as a string array
                onValueChange={({ value }) => handleLimitChange(value[0])} // Handle change to update limit
                size="sm"
                width="80px"
              >
                <Select.Trigger>
                  <Select.ValueText /> {/* Display selected value */}
                </Select.Trigger>
                <Portal>
                  <Select.Positioner>
                    <Select.Content>
                      {limitCollection.items.map(
                        (
                          option // Map over collection items
                        ) => (
                          <Select.Item key={option.value} item={option}>
                            {/* Pass full item object */}
                            {option.label}
                          </Select.Item>
                        )
                      )}
                    </Select.Content>
                  </Select.Positioner>
                </Portal>
              </Select.Root>
              <Text fontSize="sm" color="gray.600">
                Entries
              </Text>
            </HStack>
          </HStack>
          <HStack spaceX={1}>
            <IconButton
              size="sm"
              variant="ghost"
              onClick={() => setPage(1)}
              disabled={page === 1}
              aria-label="First page"
            >
              <LuChevronsLeft />
            </IconButton>
            <IconButton
              size="sm"
              variant="ghost"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              aria-label="Previous page"
            >
              <LuChevronLeft />
            </IconButton>
            <Text fontSize="sm" color="gray.600">
              Page {page} of {totalPages}
            </Text>
            <IconButton
              size="sm"
              variant="ghost"
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
              aria-label="Next page"
            >
              <LuChevronRight />
            </IconButton>
            <IconButton
              size="sm"
              variant="ghost"
              onClick={() => setPage(totalPages)}
              disabled={page === totalPages}
              aria-label="Last page"
            >
              <LuChevronsRight />
            </IconButton>
          </HStack>
          <HStack spaceX={2} minW="150px">
            <Text fontSize="sm" color="gray.600">
              Go to page:
            </Text>
            <Input
              size="sm"
              width="60px"
              value={goToPage}
              onChange={(e) => setGoToPage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleGoToPage();
                }
              }}
              placeholder={page.toString()}
            />
            <Button
              size="sm"
              variant="outline"
              onClick={handleGoToPage}
              disabled={!goToPage || isNaN(parseInt(goToPage))}
            >
              Go
            </Button>
          </HStack>
        </Flex>
      )}
      {isEditDialogOpen && editUser && (
        <UserDialog
          mode="edit"
          initialData={{
            firstName: editUser.firstName,
            lastName: editUser.lastName,
            email: editUser.email,
            gender: editUser.gender,
            dob: editUser.dob ? new Date(editUser.dob) : undefined,
            address: editUser.address,
            phone: editUser.phone,
            title: editUser.title,
          }}
          uid={editUser.uid}
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          onSubmit={onSubmitEdit}
        />
      )}
      <ActionBar.Root open={hasSelection}>
        <Portal>
          <ActionBar.Positioner>
            <ActionBar.Content>
              <ActionBar.SelectionTrigger>
                {selection.length} selected
              </ActionBar.SelectionTrigger>
              <ActionBar.Separator />
              <Button
                variant="outline"
                colorPalette="red"
                size="sm"
                _hover={{
                  bg: "red.400",
                  color: "white",
                }}
                onClick={handleDelete}
              >
                Delete
                <MdDelete size={18} />
              </Button>

              <ConfirmationModalDialogs
                open={open}
                onClose={handleClose}
                onConfirm={handleConfirmDelete}
                title="Confirm Delete"
                body="Are you sure you want to delete this user?"
                confirmText="Confirm"
                cancelText="Cancel"
                confirmColorScheme="red"
              />
              {/* <Button variant="outline" size="sm">
                Share <Kbd>T</Kbd>
              </Button> */}
            </ActionBar.Content>
          </ActionBar.Positioner>
        </Portal>
      </ActionBar.Root>
    </>
  );
};
