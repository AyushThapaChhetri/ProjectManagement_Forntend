import {
  // Box,
  Button,
  CloseButton,
  createListCollection,
  Dialog,
  Editable,
  Field,
  Flex,
  Heading,
  HStack,
  Icon,
  Input,
  List,
  // Menu,
  Portal,
  Select,
  Spinner,
  Tag,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

import { FaRegEdit } from "react-icons/fa";
import type { Task } from "./reducer/task.types";
import { LuNotebookPen } from "react-icons/lu";
import {
  Controller,
  type SubmitHandler,
  useForm,
  // type Resolver,
} from "react-hook-form";
import DatePicker from "react-datepicker";
import { TaskSchema } from "@/schemas/taskSchema";
import TaskApi from "@/api/TaskApi";
import { useTaskContext } from "@/hooks/useTaskContext";
import { yupResolver } from "@hookform/resolvers/yup";
import type { InferType } from "yup";
import { handleApiError } from "@/utils/handleApiError";
import { toast } from "react-toastify";
import { fetchUsersToAssignTask } from "@/api/UserApi";
import { useDebounce } from "@/hooks/useDebounce";
type FormValues = InferType<typeof TaskSchema>;

// import { Controller } from "react-hook-form";

// Assuming this interface is defined in task.types.ts as previously discussed
interface DialogOpenChangeDetails {
  open: boolean;
}

// Define props for TaskEdit to pass dialog state back to parent
interface TaskEditProps {
  onDialogStateChange?: (isOpen: boolean) => void; // Optional callback
  setShowCheckBox?: React.Dispatch<React.SetStateAction<boolean>>;
  task: Task;
  listName: string;
}

export interface AssignableUser {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  dob: string;
  address?: string | null;
  phone?: string | null;
  title?: string | null;
  avatarUrl?: string | null;
  createdAt: string;
  roles: string[];
}

const priorities = createListCollection({
  items: [
    { label: "High", value: "high" },
    { label: "Medium", value: "medium" },
    { label: "Low", value: "low" },
  ],
});
const statuses = createListCollection({
  items: [
    { label: "Todo", value: "todo" },
    { label: "In Progress", value: "inProgress" },
    { label: "In Review", value: "inReview" },
    { label: "Completed", value: "completed" },
  ],
});

const TaskEdit = ({
  onDialogStateChange,
  setShowCheckBox,
  task,
  listName,
}: TaskEditProps) => {
  const { taskActions } = useTaskContext();
  // No need to use because of React hook form controller does it self
  // const [date, setDate] = useState<{
  //   startDate: Date | null;
  //   endDate: Date | null;
  // }>({
  //   startDate: null,
  //   endDate: null,
  // });
  // const handleDate = (name: "startDate" | "endDate", value: Date | null) => {
  //   setDate((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState<AssignableUser[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<AssignableUser[]>([]);
  const [selectedUserSet, setSelectedUserSet] = useState(new Set());
  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedSearch = useDebounce(searchInput);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);

  useEffect(() => {
    if (searchInput.trim() !== "") {
      setIsLoadingUsers(true);
    }
  }, [searchInput]);

  useEffect(() => {
    const fetchUsers = async () => {
      // if (searchInput.trim() === "") {
      if (debouncedSearch.trim() === "") {
        setSuggestions([]);
        setIsLoadingUsers(false);
        return;
      }

      try {
        // const response = await fetchUsersToAssignTask(searchInput);
        const response = await fetchUsersToAssignTask(debouncedSearch);
        setSuggestions(response);
      } catch (error: unknown) {
        handleApiError(error);
      } finally {
        setIsLoadingUsers(false);
      }
    };

    fetchUsers();
    // }, [searchInput]);
  }, [debouncedSearch]);

  const handleSelectUser = (user: AssignableUser) => {
    setSelectedUsers([...selectedUsers, user]);
    setSelectedUserSet(new Set([...selectedUserSet, user.email]));
    setSearchInput("");
    setSuggestions([]);
    inputRef.current?.focus();
  };

  const handleRemoveUser = (user: AssignableUser) => {
    const updatedUsers = selectedUsers.filter(
      (selectedUser) => selectedUser.uid !== user.uid
    );
    setSelectedUsers(updatedUsers);
    const updatedEmails = new Set(selectedUserSet);
    updatedEmails.delete(user.email);
    setSelectedUserSet(updatedEmails);
  };

  const handleOpenChange = (details: DialogOpenChangeDetails) => {
    const newOpenState = details.open;
    // console.log("Dialog onOpenChange triggered. New state:", newOpenState);
    setIsDialogOpen(newOpenState);

    // Notify the parent component about the dialog's new open state
    // if (onDialogStateChange) {
    //   onDialogStateChange(newOpenState);
    // }
    onDialogStateChange?.(newOpenState);
  };
  const handleSetShowCheckBox = () => {
    setShowCheckBox?.(false);
    onDialogStateChange?.(false);
  };

  // console.log("Task Details: ", task);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    // watch,
    // reset,
    // } = useForm<FormValues>();
  } = useForm({
    resolver: yupResolver(TaskSchema),
    defaultValues: {
      name: task.name,
      description: task.description,
      priority: task.priority,
      status: task.status,
      startDate: task.startDate,
      endDate: task.endDate,
    },
  });

  // watch all values and errors for debugging
  // useEffect(() => {
  //   console.log("Form values:", watch());
  //   console.log("Validation errors:", errors);
  // }, [watch(), errors]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    // const finalData = {
    //   ...data,
    //   dob: data.dob instanceof Date ? data.dob.toISOString() : data.dob,
    // };
    const assignedToUidArray = selectedUsers.map(
      (selectedUser) => selectedUser.uid
    );
    const finalData = {
      ...data,
      assignedToUid:
        assignedToUidArray.length > 0 ? assignedToUidArray : undefined,
    };
    handleSetShowCheckBox();

    try {
      await TaskApi.updateTask(task.uid, finalData, taskActions);
    } catch (error: unknown) {
      toast.error("Error");
      handleApiError(error);
    }

    console.log("Form is submitting...");
    console.log(data);
    console.log("Final data", finalData);
    // console.log("Id's of task and list", task.id, task.listId);
  };
  // console.log("Errors from RHF", errors);
  return (
    <>
      {/* <Dialog.Root size={"lg"} > */}
      <Dialog.Root
        size="lg"
        open={isDialogOpen}
        onOpenChange={handleOpenChange}
        placement={"center"}
        onInteractOutside={handleSetShowCheckBox}
      >
        <Dialog.Trigger asChild>
          <FaRegEdit size={18} />
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Dialog.Header>
                  <Flex direction="column">
                    <Dialog.Title>
                      {/* {task.name} */}
                      <Controller
                        name="name"
                        control={control}
                        defaultValue={task.name}
                        render={({ field }) => (
                          <Editable.Root
                            textAlign="start"
                            invalid={!!errors.name}
                            defaultValue={field.value}
                            fontSize="16px"
                            onChange={field.onChange}
                            width={"200px"}
                          >
                            <Editable.Preview
                              display="inline-block" // make it respect width
                              width="200px" // same width as input
                              whiteSpace="nowrap" // optional: prevent wrapping
                              overflow="hidden"
                              textOverflow="ellipsis" // optional: handle overflow
                            />
                            <Editable.Input />
                          </Editable.Root>
                        )}
                      />
                    </Dialog.Title>
                    <Text>In list {listName}</Text>
                  </Flex>
                </Dialog.Header>
                <Dialog.Body>
                  <Flex direction="column" gap={5}>
                    <HStack>
                      <Icon size="lg" color="black">
                        <LuNotebookPen />
                      </Icon>
                      <Heading>Description</Heading>
                    </HStack>
                    <Field.Root invalid={!!errors.description}>
                      <Textarea
                        placeholder="Start typing..."
                        variant="subtle"
                        fontSize="16px"
                        {...register("description")}
                      />
                      <Field.ErrorText>
                        {errors.description?.message}
                      </Field.ErrorText>
                    </Field.Root>
                    <Flex>
                      <Field.Root>
                        <Field.Label>Assign Task To</Field.Label>
                        <Flex gap={3} wrap={"wrap"}>
                          {selectedUsers.map((user) => {
                            return (
                              <Tag.Root key={user.email} colorPalette={"pink"}>
                                <Tag.Label>
                                  {user.firstName} {user.lastName}
                                </Tag.Label>
                                <Tag.EndElement>
                                  <Tag.CloseTrigger
                                    onClick={() => {
                                      handleRemoveUser(user);
                                    }}
                                  />
                                </Tag.EndElement>
                              </Tag.Root>
                            );
                          })}
                        </Flex>
                        <Input
                          ref={inputRef}
                          placeholder="Search For User..."
                          value={searchInput}
                          onChange={(e) => {
                            setSearchInput(e.target.value);
                          }}
                        />

                        {isLoadingUsers ? (
                          <Flex justify="center" align="center" py={4} pl={2}>
                            <Spinner size="md" color="blue.500" />
                          </Flex>
                        ) : (
                          <List.Root
                            as="ul"
                            listStyle="none"
                            maxH={"300px"}
                            w={"100%"}
                            border={
                              suggestions.length > 0 ? "1px solid #ccc" : "none"
                            }
                            bg={"gray.100"}
                            overflowY={"auto"}
                            p={0}
                            m={0}
                          >
                            {suggestions?.map((user) => {
                              return !selectedUserSet.has(user.email) ? (
                                <List.Item
                                  key={user.email}
                                  display={"flex"}
                                  alignItems={"center"}
                                  gap={"10px"}
                                  p={"8px 10px"}
                                  cursor={"pointer"}
                                  borderBottom={"#ccc"}
                                  borderWidth={"1px"}
                                  _hover={{
                                    bg: "#ccc",
                                  }}
                                  onClick={() => handleSelectUser(user)}
                                  // _marker={{ color: "inherit" }}
                                >
                                  <span>
                                    {user.firstName} {user.lastName}
                                  </span>
                                </List.Item>
                              ) : null;
                            })}
                          </List.Root>
                        )}
                        {/* <Input placeholder="Type To assign..." {...register("assignedUser")}/> */}
                        <Field.ErrorText />
                      </Field.Root>
                    </Flex>
                    <HStack>
                      <Controller
                        name="priority"
                        control={control}
                        render={({ field }) => {
                          // Wrap single string value into array for Select.Root
                          const selectedValues = field.value
                            ? [field.value]
                            : [];

                          return (
                            <Select.Root
                              collection={priorities}
                              size="sm"
                              // width="150px"
                              w={"50%"}
                              invalid={!!errors.priority}
                              value={selectedValues}
                              onValueChange={(vals) => {
                                // vals has shape: { value: string | string[] }
                                const newValue = Array.isArray(vals.value)
                                  ? vals.value[0]
                                  : vals.value;
                                field.onChange(newValue || "");
                              }}
                            >
                              <Select.HiddenSelect />
                              <Select.Label>Priority</Select.Label>
                              <Select.Control>
                                <Select.Trigger>
                                  <Select.ValueText
                                    placeholder={task.priority}
                                  />
                                </Select.Trigger>
                                <Select.IndicatorGroup>
                                  <Select.Indicator />
                                </Select.IndicatorGroup>
                              </Select.Control>
                              <Select.Positioner>
                                <Select.Content>
                                  {priorities.items.map((priority) => (
                                    <Select.Item
                                      item={priority}
                                      key={priority.value}
                                    >
                                      {priority.label}
                                      <Select.ItemIndicator />
                                    </Select.Item>
                                  ))}
                                </Select.Content>
                              </Select.Positioner>
                            </Select.Root>
                          );
                        }}
                      />
                      {errors?.priority && (
                        <p style={{ color: "red", marginTop: 4 }}>
                          {errors?.priority.message}
                        </p>
                      )}

                      <Controller
                        name="status"
                        control={control}
                        render={({ field }) => {
                          // Wrap single string value into an array for Select.Root
                          const selectedValues = field.value
                            ? [field.value]
                            : [];

                          return (
                            <Select.Root
                              collection={statuses}
                              size="sm"
                              // width="150px"
                              w={"50%"}
                              value={selectedValues}
                              onValueChange={(vals) => {
                                // vals has shape: { value: string | string[] }
                                const newValue = Array.isArray(vals.value)
                                  ? vals.value[0]
                                  : vals.value;
                                field.onChange(newValue || "");
                              }}
                            >
                              <Select.HiddenSelect />
                              <Select.Label>Status</Select.Label>
                              <Select.Control>
                                <Select.Trigger>
                                  <Select.ValueText placeholder={task.status} />
                                </Select.Trigger>
                                <Select.IndicatorGroup>
                                  <Select.Indicator />
                                </Select.IndicatorGroup>
                              </Select.Control>
                              <Select.Positioner>
                                <Select.Content>
                                  {statuses.items.map((status) => (
                                    <Select.Item
                                      item={status}
                                      key={status.value}
                                    >
                                      {status.label}
                                      <Select.ItemIndicator />
                                    </Select.Item>
                                  ))}
                                </Select.Content>
                              </Select.Positioner>
                            </Select.Root>
                          );
                        }}
                      />
                    </HStack>
                    <HStack>
                      <Flex direction="column" gap={2} w={"50%"}>
                        <Text as="h3" fontWeight="medium">
                          StartDate
                        </Text>
                        {/* <DatePicker
                          selected={date.startDate}
                          onChange={(value) => handleDate("startDate", value)}
                        /> */}
                        <Controller
                          name="startDate"
                          control={control}
                          render={({ field }) => (
                            <DatePicker
                              selected={
                                field.value ? new Date(field.value) : null
                              } // convert ISO string to Date
                              onChange={(date) =>
                                field.onChange(date ? date.toISOString() : "")
                              } // convert Date to ISO string
                              placeholderText="Select start date"
                            />
                          )}
                        />
                        {errors.startDate && (
                          <Text color="red" fontWeight="medium" fontSize="xs">
                            {errors.startDate.message}
                          </Text>
                        )}
                      </Flex>
                      <Flex direction="column" gap={2} w={"50%"}>
                        <Text as="h3" fontWeight="medium">
                          End Date
                        </Text>
                        {/* <DatePicker
                          selected={date.endDate}
                          onChange={(value) => handleDate("endDate", value)}
                        /> */}
                        <Controller
                          name="endDate"
                          control={control}
                          render={({ field }) => (
                            <DatePicker
                              selected={
                                field.value ? new Date(field.value) : null
                              }
                              onChange={(date) =>
                                field.onChange(date ? date.toISOString() : "")
                              }
                              placeholderText="Select end date"
                            />
                          )}
                        />
                        {/* Show error message if exists */}
                        {errors.endDate && (
                          <Text color="red" fontWeight="medium" fontSize="xs">
                            {errors.endDate.message}
                          </Text>
                        )}
                      </Flex>
                    </HStack>
                  </Flex>
                </Dialog.Body>
                <Dialog.Footer>
                  <Dialog.ActionTrigger asChild>
                    <Button variant="outline" onClick={handleSetShowCheckBox}>
                      Cancel
                    </Button>
                  </Dialog.ActionTrigger>

                  <Button
                    bgColor="#6822ef"
                    _active={{ bg: "blue.300" }}
                    color="white"
                    type="submit"
                    // onClick={() => console.log("Clicked Save")}
                  >
                    Save
                  </Button>
                </Dialog.Footer>
                <Dialog.CloseTrigger asChild>
                  <CloseButton size="sm" onClick={handleSetShowCheckBox} />
                </Dialog.CloseTrigger>
              </form>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  );
};

export default TaskEdit;
