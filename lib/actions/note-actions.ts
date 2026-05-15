"use server";
import { revalidatePath } from "next/cache";
import { createClerkSupabaseClient } from "../supabase";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const createNoteAction = async (prevState: any, formdata: FormData) => {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");
  try {
    const supabase = await createClerkSupabaseClient();
    const title = formdata.get("title") as string;
    const content = formdata.get("content") as string;
    if (!title) {
      return { error: "Title is required." };
    }

    const { error } = await supabase.from("notes").insert({ title, content });
    if (error) throw new Error(error.message);
    revalidatePath("/");
    return { success: "Note created successfully!" };
  } catch (error) {
    return { error: "An unexpected error occurred." };
  }
};

export const getNote = async () => {
  const supabase = await createClerkSupabaseClient();
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data;
};

export const deleteNote = async (id: string) => {
  try {
    const supabase = await createClerkSupabaseClient();
    const { error } = await supabase.from("notes").delete().eq("id", id);
    if (error) throw new Error("Failed to delete note");
    revalidatePath("/");
    return { success: "Note deleted successfully!" };
  } catch (error) {
    return { error: "Failed to delete note." };
  }
};
