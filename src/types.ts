export interface Entry {
  id: string;
  name: string;
  done?: boolean;
}

export interface ShoppingList {
  id: string;
  name: string;
  entries: Entry[];
}
