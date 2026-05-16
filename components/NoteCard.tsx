"use client";

import { useState } from "react";
import { toast } from "sonner";
import { SquarePen, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { deleteNote, updateNote } from "@/lib/actions/note-actions";
import Link from "next/link";

type Note = {
  id: string;
  title: string;
  content: string | null;
  created_at: string;
};

export function NoteCard({ note }: { note: Note }) {
  // Hooks are now safe at the top level of an isolated component!
  const [editTitle, setEditTitle] = useState(note.title);
  const [editContent, setEditContent] = useState(note?.content || "");
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);

  return (
    <div className="p-4 border rounded-lg bg-card shadow-sm opacity-100 data-[pending=true]:opacity-50 flex flex-col justify-center items-start gap-2 relative">
      <div className="w-full h-auto flex justify-between items-center">
        <Link href={`/notes/${note.id}`}>
          <h2 className="font-semibold text-lg line-clamp-1">{note.title}</h2>
        </Link>
        <div className="flex justify-center items-center gap-2">
          {/* Update Note Dialog */}
          <AlertDialog open={isUpdateOpen} onOpenChange={setIsUpdateOpen}>
            <Tooltip>
              <TooltipTrigger asChild>
                <AlertDialogTrigger asChild>
                  <Button
                    variant={"outline"}
                    className="border-2 border-[#42648E] hover:bg-[#E3ECFB] cursor-pointer transition-all"
                  >
                    <SquarePen className="w-4 h-4" />
                  </Button>
                </AlertDialogTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>Update Note</p>
              </TooltipContent>
            </Tooltip>

            {/* Inside your NoteCard.tsx Edit Dialog content block */}
            <AlertDialogContent className="sm:max-w-md max-h-[85vh] flex flex-col rounded-2xl border-none bg-white p-6">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-xl font-bold">
                  Edit Note
                </AlertDialogTitle>
              </AlertDialogHeader>

              {/* The Form turns into a flex container to distribute heights properly */}
              <form
                action={async (formData) => {
                  const response = await updateNote(note.id, formData);
                  if (response?.success) {
                    toast.success(response.success);
                    setIsUpdateOpen(false);
                  } else {
                    toast.error(response?.error || "Failed to update note");
                  }
                }}
                className="flex-1 flex flex-col min-h-0"
              >
                {/* This wrapper holds your text fields and scrolls dynamically if they overflow */}
                <div className="flex-1 overflow-y-auto pr-1 space-y-4 my-2 max-h-[50vh] scrollbar-thin">
                  <div className="w-full flex flex-col gap-2">
                    <Label
                      htmlFor="edit-title"
                      className="font-medium text-sm text-gray-700"
                    >
                      Title
                    </Label>
                    <Input
                      id="edit-title"
                      name="title"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="focus-visible:ring-[#457FD0]"
                      required
                    />
                  </div>

                  <div className="w-full flex flex-col gap-2">
                    <Label
                      htmlFor="edit-content"
                      className="font-medium text-sm text-gray-700"
                    >
                      Content
                    </Label>
                    <Textarea
                      id="edit-content"
                      name="content"
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="min-h-45 focus-visible:ring-[#457FD0] resize-none"
                    />
                  </div>
                </div>

                {/* The Footer stays firmly pinned to the bottom of the modal */}
                <AlertDialogFooter className="pt-4 border-t border-gray-100">
                  <AlertDialogCancel className="rounded-xl font-normal">
                    Discard
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-[#42648E] hover:bg-[#345277] transition-all rounded-xl font-medium text-white px-6"
                    type="submit"
                  >
                    Update Note
                  </AlertDialogAction>
                </AlertDialogFooter>
              </form>
            </AlertDialogContent>
          </AlertDialog>

          {/* Delete Note Dialog */}
          <AlertDialog>
            <Tooltip>
              <TooltipTrigger asChild>
                <AlertDialogTrigger asChild>
                  <Button
                    variant={"outline"}
                    className="cursor-pointer border-2 border-[#A38683] hover:bg-[#F6E5E5] transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </AlertDialogTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>Delete Note</p>
              </TooltipContent>
            </Tooltip>

            <AlertDialogContent className="rounded-2xl border-none bg-white">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-xl font-bold">
                  Are you absolutely sure?
                </AlertDialogTitle>
                <AlertDialogDescription className="text-gray-500">
                  This action cannot be undone. This will permanently delete
                  your note from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="rounded-xl font-normal">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  className="bg-[#961807] hover:bg-[#7b1305] transition-all duration-300 cursor-pointer rounded-xl font-medium text-white"
                  onClick={async () => {
                    const response = await deleteNote(note.id);
                    if (response?.success) {
                      toast.success(response.success);
                    } else if (response?.error) {
                      toast.error(response.error);
                    }
                  }}
                >
                  Delete Note
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      <Link href={`/notes/${note.id}`}>
        <p className="font-normal text-gray-600 text-md line-clamp-4 mt-2">
          {note.content}
        </p>
      </Link>
      <p
        className="text-sm text-muted-foreground mt-auto"
        suppressHydrationWarning
      >
        {new Date(note.created_at).toLocaleDateString()}
      </p>
    </div>
  );
}
