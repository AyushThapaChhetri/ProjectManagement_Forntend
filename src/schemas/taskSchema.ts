import {
  Priorities,
  Statuses,
  type Status,
  type Priority,
} from "@/components/Cards/reducer/task.types";
import * as yup from "yup";

export const optionalTrimmedString = () =>
  yup
    .string()
    .trim()
    .transform((value) => (value === "" ? undefined : value))
    .optional();
export const optionalTrimmedNumber = () =>
  yup
    .number()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value
    )
    .optional();

export const TaskSchema = yup.object({
  name: yup.string().required(),
  description: optionalTrimmedString(),
  priority: yup.mixed<Priority>().oneOf(Priorities).required(),
  status: yup.mixed<Status>().oneOf(Statuses).required(),
  startDate: optionalTrimmedString(),
  endDate: optionalTrimmedString(),
  estimatedHours: optionalTrimmedNumber(),
  assignedToId: optionalTrimmedNumber(),
});
