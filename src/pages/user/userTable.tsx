import {
  ActionBar,
  Button,
  // ButtonGroup,
  Checkbox,
  Flex,
  HStack,
  IconButton,
  Input,
  // Pagination,
  // Kbd,
  Portal,
  Select,
  Table,
  Text,
  createListCollection,
  // useBreakpointValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
// import { usersData } from "./user.data";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { fetchUsers } from "@/api/UserApi";
import { useNavigate } from "react-router";
// import AddUser from "./AddUser";
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

export const UserTable = () => {
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        //   const response = await fetchUsers(navigate, page, limit);
        //   if (response && response.data) {
        //     setUsersData(response.data);
        //     setTotal(response.total);
        //   } else {
        //     setUsersData([]);
        //   }
        const response = await fetchUsers(navigate, page, limit);

        // if your API returns { data: { users, total } } then destructure further:
        // const { users, total } = data;
        setUsersData(response.data); // adjust depending on actual shape
        setTotal(response.total);
      } catch (error) {
        console.error("Failed to fetch users:", error);
        setUsersData([]);
      }
    };
    fetchData();
  }, [navigate, page, limit]);

  console.log("Current usersData:", usersData);
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

  const hasSelection = selection.length > 0;
  const indeterminate = hasSelection && selection.length < usersData?.length;
  const rows = usersData?.map((item) => (
    <Table.Row
      key={item.firstName}
      data-selected={selection.includes(item.firstName) ? "" : undefined}
    >
      <Table.Cell>
        <Checkbox.Root
          size="sm"
          top="0.5"
          aria-label="Select row"
          checked={selection.includes(item.firstName)}
          onCheckedChange={(changes) => {
            setSelection((prev) =>
              changes.checked
                ? [...prev, item.firstName]
                : selection.filter((firstName) => firstName !== item.firstName)
            );
          }}
        >
          <Checkbox.HiddenInput />
          <Checkbox.Control />
        </Checkbox.Root>
      </Table.Cell>
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

        // overflow="hidden"
      >
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
                      indeterminate ? "indeterminate" : selection.length > 0
                    }
                    onCheckedChange={(changes) => {
                      setSelection(
                        changes.checked
                          ? usersData.map((item) => item.firstName)
                          : []
                      );
                    }}
                  >
                    <Checkbox.HiddenInput />
                    <Checkbox.Control />
                  </Checkbox.Root>
                </Table.ColumnHeader>
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
              >
                Delete
                <MdDelete size={18} />
              </Button>
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
