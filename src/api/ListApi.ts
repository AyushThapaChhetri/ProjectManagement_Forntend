import type { TaskAction } from "@/components/Cards/reducer/task.types";

type DispatchFn = React.Dispatch<TaskAction>;
const ListApi = {
  async createList(listName: string, dispatch: DispatchFn) {
    // console.log("Creation of list");
    const newList = {
      id: `temp-${Date.now()}`,
      uid: "",
      name: listName,
      projectId: 1,
      createdAt: "",
      updatedAt: "",
      isEditing: true,
    };
    dispatch({ type: "ADD_LIST", payload: newList });
  },
  // async updateList(){

  // }
  async deleteList(listId: string, dispatch: DispatchFn) {
    dispatch({ type: "DELETE_LIST", payload: { id: listId } });
  },
  // async (){

  // }
};

export default ListApi;
