import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useStore } from "./useStore";

const validationSchema = z.object({
  name: z.string().min(1),
});
type ValidationSchema = z.infer<typeof validationSchema>;

export const Entry = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  const addListEntry = useStore((_) => _.addListEntry);

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => {
    addListEntry(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-row h-18 space-x-4">
      <input
        type="text"
        placeholder="Cola"
        {...register("name")}
        className={`block grow p-4 shadow-md box-border ${errors.name && "outline-red-500 outline-2"} `}
      />
      <button type="submit" className="p-4 bg-slate-400 shadow-md">
        Add
      </button>
    </form>
  );
};
