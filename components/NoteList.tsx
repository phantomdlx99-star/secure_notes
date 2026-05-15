"use client";
import { useOptimistic } from "react";
import CreateNote from "./CreateNote";
import { Button } from "./ui/button";
import { Plus, SquarePen, Trash2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { createNoteAction, deleteNote } from "@/lib/actions/note-actions";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
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

type Note = {
  id: string;
  title: string;
  content: string | null;
  created_at: string;
};

const NoteList = ({ initialNotes }: { initialNotes: Note[] }) => {
  const [optimisticNotes, addOptimisticNote] = useOptimistic(
    initialNotes,
    (state, newNote: Note) => [newNote, ...state],
  );
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full h-auto grid grid-cols-1 md:grid-cols-[auto_1fr] mt-10">
      <div className="hidden md:block">
        {/* 2. Pass the optimistic updater function to the form */}
        <CreateNote onAddOptimistic={addOptimisticNote} />
      </div>
      <div>
        <div className="flex jusfiy-center items-center gap-2 w-full">
          <h2 className="font-semibold text-2xl text-black px-4 text-center md:text-start">
            Your Notes ({initialNotes.length} Items Found )
          </h2>
          <div className="block md:hidden">
            <Dialog open={open} onOpenChange={setOpen}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="hover:bg-green-100 border-2 border-green-200 transition-all duration-500 cursor-pointer group"
                    >
                      <Plus className="text-green-600 group-hover:rotate-90 transition-all duration-300" />
                    </Button>
                  </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Create Note</p>
                </TooltipContent>
              </Tooltip>

              <DialogContent className="sm:max-w-md rounded-2xl border-none shadow-2xl bg-white">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-gray-800">
                    New Quick Note
                  </DialogTitle>
                  <DialogDescription className="text-gray-500 font-normal">
                    Capture your thoughts instantly. This will be synced to your
                    private vault.
                  </DialogDescription>
                </DialogHeader>

                {/* Form using your Server Action */}
                <form
                  action={async (formData) => {
                    const title = formData.get("title") as string;
                    const content = formData.get("content") as string;

                    // Trigger Optimistic UI immediately
                    addOptimisticNote({
                      id: Math.random().toString(),
                      title,
                      content,
                      created_at: new Date().toISOString(),
                    });

                    const response = await createNoteAction(null, formData);
                    if (response.success) {
                      toast.success("Note created successfully!");
                    } else if (response.error) {
                      toast.error("Couldn't create a note");
                    }
                    setOpen(false);
                  }}
                  className="space-y-4 py-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-sm font-medium">
                      Title
                    </Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="e.g. Grocery List"
                      className="focus-visible:ring-[#457FD0]"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="content" className="text-sm font-medium">
                      Content
                    </Label>
                    <Textarea
                      id="content"
                      name="content"
                      placeholder="Write your details here..."
                      className="min-h-25 focus-visible:ring-[#457FD0]"
                    />
                  </div>

                  <DialogFooter className="sm:justify-end gap-2 pt-4">
                    <DialogClose asChild>
                      <Button
                        type="button"
                        variant="ghost"
                        className="font-normal"
                      >
                        Discard
                      </Button>
                    </DialogClose>
                    <Button
                      type="submit"
                      className="bg-[#457FD0] hover:bg-[#3669ad] text-white font-medium px-8"
                    >
                      Save Note
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[200px] gap-3 px-4 pb-5">
          {optimisticNotes.length === 0 ? (
            <p className="text-muted-foreground text-center py-10 border-2 border-dashed rounded-xl">
              No notes found.
            </p>
          ) : (
            optimisticNotes.map((note) => (
              <div
                key={note.id}
                className="p-4 border rounded-lg bg-card shadow-sm opacity-100 data-[pending=true]:opacity-50 flex flex-col justify-center items-start gap-2 relative"
              >
                <div className="w-full h-auto flex justify-between items-center">
                  <h2 className="font-semibold text-lg line-clamp-1">
                    {note.title}
                  </h2>
                  <div className="flex justify-center items-center gap-2">
                    {/* Update Button */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant={"outline"}
                          className="border-2 border-[#42648E] hover:bg-[#E3ECFB] cursor-pointer transition-all"
                        >
                          <SquarePen />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Update Note</p>
                      </TooltipContent>
                    </Tooltip>
                    {/* Delete Button */}
                    <AlertDialog>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant={"outline"}
                              className="cursor-pointer border-2 border-[#A38683] hover:bg-[#F6E5E5] transition-all"
                            >
                              <Trash2 />
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
                            This action cannot be undone. This will permanently
                            delete your note from our servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="rounded-xl font-normal">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-[#961807] text-destructive-foreground hover:opacity-80 transition-all duration-500 cursor-pointer rounded-lg font-medium text-white"
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

                <p className="font-normal text-gray-600 text-md line-clamp-4 mt-2">
                  {note.content}
                </p>
                <p
                  className="text-sm text-muted-foreground mt-auto"
                  suppressHydrationWarning
                >
                  {new Date(note.created_at).toLocaleDateString()}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NoteList;
