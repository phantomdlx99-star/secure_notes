import NoteList from "@/components/NoteList";
import { getNote } from "@/lib/actions/note-actions";
import { auth } from "@clerk/nextjs/server";

const page = async () => {
  const { userId } = await auth();
  if (!userId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to NoteSecure</h1>
        <p className="text-gray-600 mb-8">
          Please sign in to view and create your private notes.
        </p>
        {/* You can add a Clerk SignInButton here if you like */}
      </div>
    );
  }
  const notes = await getNote();
  return (
    <div className="w-full min-h-screen px-8">
      <h1 className="text-3xl font-bold text-center md:text-start md:inline relative">
        My Private Notes
        <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-linear-to-r from-blue-500 to-indigo-400 rounded-full" />
      </h1>

      <NoteList initialNotes={notes} />
    </div>
  );
};

export default page;
