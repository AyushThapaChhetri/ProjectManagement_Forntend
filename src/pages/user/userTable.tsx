import {
  ActionBar,
  Button,
  Checkbox,
  IconButton,
  // Kbd,
  Portal,
  Table,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
// import { usersData } from "./user.data";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { fetchUsers } from "@/api/UserApi";
import { useNavigate } from "react-router";

type User = {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
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
  const [usersData, setUsersData] = useState<User[] | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchUsers(navigate); // auto-fetches users when component mounts
      setUsersData(response);
      console.log("Response is: ", response);
    };

    fetchData();
  }, [navigate]);

  const [selection, setSelection] = useState<string[]>([]);
  if (!usersData) return <div>Loading...</div>;

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
          size={"2xs"}
          variant={"surface"}
          _hover={{ color: "blue.600" }}
        >
          <FaRegEdit />
        </IconButton>
      </Table.Cell>
    </Table.Row>
  ));
  return (
    <>
      <Table.ScrollArea borderWidth="1px" rounded="md" h={"95%"} w={"100%"}>
        <Table.Root size="sm" stickyHeader>
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
