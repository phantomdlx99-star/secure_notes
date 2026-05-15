"use client";

import { useActionState, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";
import { createNoteAction } from "@/lib/actions/note-actions";
const CreateNote = ({
  onAddOptimistic,
}: {
  onAddOptimistic: (note: any) => void;
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [state, formAction, isPending] = useActionState(createNoteAction, null);

  const handleSubmit = async (formdata: FormData) => {
    const title = formdata.get("title") as string;
    const content = formdata.get("content") as string;

    onAddOptimistic({
      id: Math.random().toString(),
      title,
      content,
      created_at: new Date().toISOString(),
    });

    formAction(formdata);
  };

  useEffect(() => {
    if (state?.success) {
      toast.success(state.success);
      setTitle("");
      setContent("");
    } else if (state?.error) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <div className="w-70">
      <h1 className="text-xl font-normal">Create</h1>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Add New Note</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <div className="w-full h-auto flex flex-col justify-start items-start gap-2">
              <Label htmlFor="title" className="font-normal text-lg">
                Title
              </Label>
              <Input
                placeholder="title (e.g., Shopping List)"
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.currentTarget.value)}
                required
              />
            </div>
            <div className="w-full h-auto flex flex-col justify-start items-start gap-2 mt-5">
              <Label htmlFor="content" className="font-normal text-lg">
                Content
              </Label>
              <Textarea
                placeholder="Content (Optional)"
                id="content"
                name="content"
                value={content}
                onChange={(e) => setContent(e.currentTarget.value)}
              />
            </div>
            <div className="flex justify-start items-center px-0.5 mt-5">
              <Button
                className="text-md font-normal w-full h-auto flex-1 bg-[#457FD0] text-white py-2 cursor-pointer hover:scale-x-104 hover:shadow-2xs active:scale-x-100 disabled:opacity-60"
                type="submit"
                disabled={isPending}
              >
                {isPending ? "Saving Note" : "Create Note"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateNote;
