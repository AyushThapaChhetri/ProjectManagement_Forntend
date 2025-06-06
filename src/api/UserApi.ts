import axios from "axios";
import api from "./Api";
import type { NavigateFunction } from "react-router";

const API_User_URL = "user";

export const fetchUsers = async (navigate: NavigateFunction) => {
  try {
    const response = await api.get(API_User_URL);
    // console.log("User Datas: ", response.data);
    return response.data.data;
    // setItem(todosWithNumericId);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error fetching User: ", error);

      if (error.response?.status === 401) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        navigate("/login");
      }
    } else {
      console.error("Unexpected error: ", error);
    }
  }
};

// if (isFetch) {
//   fetchTodos();
// }

//   }, [isFetch, navigate, item]);
// }
