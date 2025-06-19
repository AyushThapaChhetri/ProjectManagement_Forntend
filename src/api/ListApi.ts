import type { TaskContextType } from "@/components/Cards/context/TaskContext";

type listActions = TaskContextType["listActions"];
const ListApi = {
  async createList(
    listName: string,
    projectId: string,
    listActions: listActions
  ) {
    // console.log("Creation of list");
    const newList = {
      id: `temp-${Date.now()}`,
      uid: "",
      name: listName,
      projectId: projectId,
      createdAt: "",
      updatedAt: "",
      isEditing: true,
    };
    listActions.addList(newList);
  },
  async updateList(listId: string, listName: string, listActions: listActions) {
    const editedList = {
      name: listName,
      updatedAt: new Date(Date.now()).toISOString(),
    };
    listActions.updateList(listId, editedList);
  },
  async deleteList(listId: string, listActions: listActions) {
    listActions.deleteList(listId);
  },
  async deleteProjectList(projectId: string, listActions: listActions) {
    listActions.deleteProjectList(projectId);
  },
  // async (){

  // }
};

export default ListApi;
