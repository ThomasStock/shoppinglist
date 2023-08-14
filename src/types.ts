export interface Entry {
  name: string;
  done?: boolean;
}

export interface ShoppingList {
  id: string;
  name: string;
  entries: Entry[];
}
