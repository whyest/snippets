import { notFound } from "next/navigation";
import { db } from "@/db";
import Link from "next/link";
import * as actions from "@/actions";

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

  const deleteSnippetAction = actions.deleteSnippet.bind(null, snippet.id);

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
          <form action={deleteSnippetAction}>
            <button className="rounded border p-2">Delete</button>
          </form>
        </div>
      </div>
      <pre className="mb-6 rounded border border-gray-200 bg-gray-200 p-3">
        <code>{snippet.code}</code>
      </pre>
      <Link href={"/"} className=" rounded border p-2">
        Back to Main
      </Link>
    </div>
  );
}

export async function generateStaticParams() {
  const snippets = await db.snippet.findMany();
  return snippets.map((snippet) => {
    return {
      params: {
        id: snippet.id.toString(),
      },
    };
  });
}
