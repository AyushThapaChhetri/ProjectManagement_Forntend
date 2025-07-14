import axios from "axios";
import api from "./Api";
import type { NavigateFunction } from "react-router";

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

const API_User_URL = "user";

export const fetchUsers = async (
  navigate: NavigateFunction,
  page: number,
  limit: number
) => {
  try {
    // console.log("Fetching users with params:", { page, limit });
    const response = await api.get(API_User_URL, {
      params: { page, limit },
    });
    // console.log("API Response:", response.data);
    // console.log("Data to return:", response.data.data);
    return response.data;
    // setItem(todosWithNumericId);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // console.error("Error fetching users:", {
      //   message: error.message,
      //   status: error.response?.status,
      //   data: error.response?.data,
      // });

      if (error.response?.status === 401) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        navigate("/login");
      }
    } else {
      // console.error("Unexpected error: ", error);
    }
    // Log that no data is returned due to error
    // console.log("Returning null due to fetch error");
    return null;
  }
};

export const fetchUsersToAssignTask = async (searchInput: string) => {
  try {
    const response = await api.get(`${API_User_URL}/employee`, {
      params: { search: searchInput },
    });
    const responseForFrontend = response.data.data;
    const mappedResponse = responseForFrontend.map((user: AssignableUser) => {
      return { uid: user.uid, name: `${user.firstName} ${user.lastName}` };
    });
    return mappedResponse;
  } catch (error) {
    console.error("Failed to search Employee:", error);
    throw error;
  }
};
