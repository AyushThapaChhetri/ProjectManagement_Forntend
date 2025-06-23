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
  // Menu,
  Portal,
  Select,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";

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

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    // const finalData = {
    //   ...data,
    //   dob: data.dob instanceof Date ? data.dob.toISOString() : data.dob,
    // };
    handleSetShowCheckBox();
    TaskApi.editTask(
      task.id,
      {
        ...data,
        updatedAt: new Date(Date.now()).toISOString(),
      },
      taskActions
    );
    // console.log("Form is submitting..."); // This should log
    // console.log(data); // Your final form data
    // console.log("Id's of task and list", task.id, task.listId);

    // reset();
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
                          >
                            <Editable.Preview />
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
                  {/* <Dialog.ActionTrigger asChild>
                    <Button type="submit" colorScheme="blue">
                      Save
                    </Button>
                  </Dialog.ActionTrigger> */}
                  {/* <Button type="submit" >
                    Save
                  </Button> */}

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
