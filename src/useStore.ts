import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { Entry, ShoppingList } from "./types";
import { v4 as uuidv4 } from "uuid";
import { immer } from "zustand/middleware/immer";

export interface Store {
  lists: ShoppingList[];
  currentListId: string | null;
  addListEntry: (newEntry: Omit<Entry, "id">) => void;
}

const getNewList = (): ShoppingList => ({ id: generateGuid(), name: "", entries: [] });

export const getCurrentList = (state: Store) => {
  if (!state.currentListId) return getNewList();
  return state.lists.find((_) => _.id === state.currentListId) ?? getNewList();
};

export const useStore = create<Store>()(
  devtools(
    persist(
      immer((set) => ({
        lists: [],
        currentListId: null as string | null,

        addListEntry: (entry) =>
          set((state) => {
            const list = getCurrentList(state);
            list.entries.push({ id: generateGuid(), ...entry });

            // In case getCurrentList() created a list for us
            state.currentListId = list.id;

            const index = state.lists.findIndex((_) => _.id === list.id);

            if (index !== -1) state.lists[index] = list;
            else state.lists.push(list);
          }),
      })),
      {
        name: "shoppinglist-storage5", // name of the item in the storage (must be unique)
      }
    )
  )
);

export const generateGuid = () => uuidv4();
