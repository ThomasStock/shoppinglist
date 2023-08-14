import { getCurrentList, useStore } from "./useStore";

export const EntriesList = () => {
  const { entries } = useStore(getCurrentList);

  const hasItems = entries.length;
  if (!hasItems) {
    return <div>No items yet</div>;
  }

  return (
    <ul>
      {entries.map(({ id, name }) => (
        <li key={id}>{name}</li>
      ))}
    </ul>
  );
};
