import * as yup from "yup";
import { optionalTrimmedString } from "./taskSchema";
import { parseISO } from "date-fns";

export const ProjectSchema = yup.object({
  name: yup.string().required("Project Name required"),
  description: optionalTrimmedString(),
  deadline: yup
    .string()
    .optional()
    .test("is-valid-date", "Deadline must be a valid date", (value) => {
      if (!value) return true; // Allow empSty
      const parsed = parseISO(value);
      // console.log("Validating date:", value, parsed, !isNaN(parsed.getTime()));
      return !isNaN(parsed.getTime());
    })
    .test(
      "is-today-or-future-utc",
      "Deadline must be now or in the future (UTC time)",
      (value) => {
        if (!value) return true;
        const parsed = parseISO(value);
        const now = new Date();
        const valid = parsed.getTime() >= now.getTime();
        return valid;
      }
    ),
});
