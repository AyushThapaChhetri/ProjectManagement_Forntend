import { toast } from "react-toastify";
import axios from "axios";

export function handleApiError(
  error: unknown,
  fallbackMessage = "An unknown error occurred."
) {
  // console.log("handleApiError CALLED", error);
  let message = fallbackMessage;

  if (axios.isAxiosError(error)) {
    const status = error.response?.status;

    if (status === 403) {
      message =
        error.response?.data?.message || "Forbidden: Insufficient Permission";
    } else if (
      Array.isArray(error.response?.data?.errors) &&
      error.response?.data?.errors.length > 0
    ) {
      //  Handle validation errors like: { errors: [ { field: "name", message: "Name must be at least 3 characters" } ] }
      message = error.response.data.errors[0].message;
    } else {
      message =
        typeof error.response?.data === "string"
          ? error.response.data
          : error.response?.data?.message || error.message;
    }
  } else if (error instanceof Error) {
    message = error.message;
  } else if (typeof error === "string") {
    message = error;
  }

  toast.error(message);
}
