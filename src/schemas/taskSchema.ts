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
    // .nullable()
    // .transform((value) => (value === "" ? undefined : value))
    .transform((value) => {
      // Handle both null and empty string
      return value === null || value === "" ? undefined : value.trim();
    })
    .optional();
export const optionalTrimmedNumber = () =>
  yup
    .number()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value
    )
    .optional();

export const TaskTitleSchema = yup.object({
  name: yup
    .string()
    .trim()
    .optional()
    .test("min-if-not-empty", "Must be at least 3 characters long", (value) => {
      if (!value || value === "") return true; // allow blank
      return value.length >= 3;
    }),
});

export const TaskSchema = yup.object({
  name: yup.string().required(),
  description: optionalTrimmedString(),
  priority: yup.mixed<Priority>().oneOf(Priorities).required(),
  status: yup.mixed<Status>().oneOf(Statuses).required(),
  startDate: optionalTrimmedString(),
  endDate: optionalTrimmedString().test(
    "endDate-after-startDate",
    "End date cannot be before start date",
    function (endDate) {
      const { startDate } = this.parent;

      // If either is missing, skip the validation
      if (!startDate || !endDate) return true;

      const start = new Date(startDate);
      const end = new Date(endDate);

      return end >= start;
    }
  ),
  estimatedHours: optionalTrimmedNumber(),
  // assignedToUid: optionalTrimmedString(),
});
