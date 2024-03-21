"use client";
import { useFormState } from "react-dom";
import * as actions from "@/actions";

const SnippetCreatePage = () => {
  const [formState, action] = useFormState(actions.createSnippet, {
    message: "",
  });

  return (
    <form action={action}>
      <h3 className="m-3 font-bold">Create a Snippet</h3>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <label className="w-12" htmlFor="title">
            Title
          </label>
          <input
            name="title"
            className="w-full rounded border p-2"
            id="title"
          />
        </div>

        <div className="flex gap-4">
          <label className="w-12" htmlFor="code">
            Code
          </label>
          <textarea
            name="code"
            className="w-full rounded border p-2"
            id="code"
          />
        </div>
        {formState.message ? (
          <div className="my-2 rounded border border-red-400 bg-red-200 p-2">
            {formState.message}
          </div>
        ) : null}
        <button type="submit" className="rounded bg-blue-200 p-2">
          Create
        </button>
      </div>
    </form>
  );
};
export default SnippetCreatePage;
