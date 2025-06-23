import {
  Box,
  Button,
  Field,
  Flex,
  Icon,
  Input,
  Popover,
  Portal,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { IoAddSharp } from "react-icons/io5";
import { useBreakpointValue } from "@chakra-ui/react";
import type { placement } from "@/types/chakra";
import { yupResolver } from "@hookform/resolvers/yup";
import type { InferType } from "yup";
import { ProjectSchema } from "@/schemas/projectSchema";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import DatePicker from "react-datepicker";
import { ProjectApi } from "@/api/ProjectApi";
import { useProjectContext } from "@/hooks/userProjectContext";
type FormValues = InferType<typeof ProjectSchema>;

type EditValues = {
  name: string;
  description: string | undefined;
  deadline: string | undefined;
};

type ProjectAddPopoverProps = {
  mode?: "create" | "edit";
  initialData?: EditValues;
  onSubmitHandler?: (data: FormValues) => void;
  triggerElement?: React.ReactNode;
  setMenuOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setShowIcons?: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProjectAddPopover = ({
  mode = "create",
  initialData,
  onSubmitHandler,
  triggerElement,
  setMenuOpen,
  setShowIcons,
}: ProjectAddPopoverProps) => {
  const popoverPlacement = useBreakpointValue({
    base: "bottom-end", // for mobile
    tabletSm: "right", // for tablet and up
  }) as placement;
  const { projectActions } = useProjectContext();
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
    // reset,
    // } = useForm<FormValues>();
  } = useForm({
    resolver: yupResolver(ProjectSchema),
    defaultValues:
      mode === "edit" && initialData
        ? initialData
        : {
            name: "",
            description: "",
            deadline: "",
          },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (onSubmitHandler) {
      onSubmitHandler(data);
      reset(data);
    } else {
      ProjectApi.createProject(data, projectActions);
      reset();
    }
  };

  return (
    <Popover.Root
      positioning={{ placement: popoverPlacement }}
      onOpenChange={({ open }) => {
        if (open) {
          if (mode === "create") {
            reset(); // Reset form when opening in create mode
          } else if (mode === "edit" && initialData) {
            // Reset form with current initialData when opening in edit mode
            reset({
              name: initialData.name,
              description: initialData.description ?? undefined,
              deadline: initialData.deadline || "",
            });
          }
        }
      }}
    >
      <Popover.Trigger asChild>
        {triggerElement || (
          <Flex
            // border="2px solid black"
            rounded="md"
            _hover={{ bg: "gray.50" }}
            p=".2rem"
            mb={".3rem"}
          >
            <Icon
              size={{
                base: "lg",
                // tablet: "lg",
              }}
            >
              <IoAddSharp />
            </Icon>
          </Flex>
        )}
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content
            // bg={"red"}
            p={"1rem"}
            // h={"fit-content"}
            minH={{ base: "400px", tablet: "340px" }}
          >
            <Popover.Arrow />
            <Popover.Body>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack gap="4" minHeight="340px">
                  <Field.Root invalid={!!errors.name}>
                    <Field.Label>Project Title</Field.Label>
                    <Input {...register("name")} fontSize="16px" />
                    <Field.ErrorText color="red" fontSize="xs">
                      {errors.name?.message}
                    </Field.ErrorText>
                  </Field.Root>

                  <Field.Root invalid={!!errors.description}>
                    <Field.Label>Description</Field.Label>
                    <Textarea
                      placeholder="Start typing..."
                      autoresize
                      maxH="5lh"
                      fontSize="16px"
                      css={{
                        "&::placeholder": {
                          fontSize: "14px", // your desired size
                          // color: "gray.400", // optional color
                        },
                      }}
                      {...register("description")}
                    />
                  </Field.Root>

                  <Flex direction="column" gap={2}>
                    <Text as="h3" fontWeight="medium">
                      Deadline
                    </Text>

                    <Controller
                      name="deadline"
                      control={control}
                      render={({ field }) => (
                        <Box className="project-popover-datepicker-wrapper">
                          <DatePicker
                            selected={
                              field.value ? new Date(field.value) : null
                            } // convert ISO string to Date
                            onChange={(date) =>
                              field.onChange(date ? date.toISOString() : "")
                            } // convert Date to ISO string
                            placeholderText="Select Deadline"
                            className={`chakra-input-project-popover ${
                              errors.deadline ? "input-error" : ""
                            }`}
                          />
                        </Box>
                      )}
                    />
                    {/* Show error message if exists */}
                    {errors.deadline && (
                      <Text color="red" fontWeight="medium" fontSize="xs">
                        {errors.deadline.message}
                      </Text>
                    )}
                  </Flex>
                  <Flex gap={2}>
                    <Popover.CloseTrigger asChild>
                      <Button
                        bgColor="white"
                        color="black"
                        borderRadius="md"
                        size="md"
                        width="80px"
                        variant="outline"
                        fontSize="sm"
                        _hover={{
                          bg: "purple.400",
                          color: "white",
                        }}
                        onClick={() => {
                          // console.log("cancel clicked: ");
                          if (setMenuOpen) setMenuOpen(false);
                          if (setShowIcons) setShowIcons(false);
                        }}
                      >
                        cancel
                      </Button>
                    </Popover.CloseTrigger>
                    <Popover.CloseTrigger asChild>
                      <Button
                        bg="#bd53e6"
                        color="white"
                        borderRadius="md"
                        fontSize="sm"
                        width="80px"
                        size="md"
                        _hover={{ bg: "purple.400" }}
                        type="submit"
                      >
                        {mode === "edit" ? "Update" : "Create"}
                      </Button>
                    </Popover.CloseTrigger>
                  </Flex>
                </Stack>
              </form>
            </Popover.Body>
            <Popover.CloseTrigger />
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
};
export default ProjectAddPopover;
