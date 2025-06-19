export type DropPayload =
  | {
      type: "task";
      id: string;
      listId: string;
      position: number;
    }
  | {
      type: "card";
      id: string;
      columnId: string;
      position: number;
      extraInfo?: string; // if cards need something extra
    };
