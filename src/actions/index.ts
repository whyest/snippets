"use server";

import { db } from "@/db";
import { redirect } from "next/navigation";

export async function editSnippet(id: number, code: string) {
  await db.snippet.update({
    where: { id },
    data: { code },
  });
  redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
  await db.snippet.delete({
    where: { id },
  });
  redirect("/");
}

export async function createSnippet(
  formState: { message: string },
  formData: FormData,
) {
  try {
    // Check the user's inputs and make sure they're valid
    const title = formData.get("title");
    const code = formData.get("code");

    //Validation of input
    if (typeof title !== "string" || title.length < 3) {
      return {
        message: "Title must be longer then you would expect...",
      };
    }
    if (typeof code !== "string" || code.length < 10) {
      return {
        message: "Code must be longer than 9 symbols...",
      };
    }

    // Create a new record in the database
    await db.snippet.create({
      data: {
        title,
        code,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        message: err.message,
      };
    } else {
      return { message: "Something went wrong..." };
    }
  }
  //   console.log(snippet);

  // Redirect the user back to the root route
  redirect("/");
}
