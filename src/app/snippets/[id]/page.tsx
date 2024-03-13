import { notFound } from "next/navigation";
import { db } from "@/db";
import Link from "next/link";

interface SnippetShowPageProps {
  params: {
    id: string;
  };
}

export default async function SnippetShowPage(props: SnippetShowPageProps) {
  await new Promise((r) => setTimeout(r, 500));
  const snippet = await db.snippet.findFirst({
    where: { id: parseInt(props.params.id) },
  });

  if (!snippet) {
    return notFound();
  }

  console.log(props);
  return (
    <div>
      <div className="my-4 flex items-center justify-between">
        <h1 className="text-xl font-bold capitalize">{snippet.title}</h1>
        <div className="flex gap-3">
          <Link
            href={`/snippets/${snippet.id}/edit`}
            className="rounded border p-2"
          >
            Edit
          </Link>
          <button className="rounded border p-2">Delete</button>
        </div>
      </div>
      <pre className="rounded border border-gray-200 bg-gray-200 p-3">
        <code>{snippet.code}</code>
      </pre>
    </div>
  );
}
