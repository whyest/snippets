"use client";
import type { Snippet } from "@prisma/client";
import Editor from "@monaco-editor/react";
import { useState } from "react";
import * as actions from "@/actions";

interface SnippetEditFormProps {
  snippet: Snippet;
}
export default function SnippetEditForm({ snippet }: SnippetEditFormProps) {
  const [code, setCode] = useState(snippet.code);
  const handleEditorChange = (value: string = "") => {
    setCode(value);
  };
  const editSnippetAction = actions.editSnippet.bind(null, snippet.id, code);

  return (
    <div>
      <Editor
        className="mb-3 pt-6"
        height="40vh"
        theme="vs-dark"
        language="javascript"
        defaultValue={snippet.code}
        options={{ minimap: { enabled: false } }}
        onChange={handleEditorChange}
      />
      <form action={editSnippetAction}>
        <button type="submit" className="rounded border p-2">
          Save
        </button>
      </form>
    </div>
  );
}
