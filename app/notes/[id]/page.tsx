import { Button } from "@/components/ui/button";
import { createClerkSupabaseClient } from "@/lib/supabase";
import { ArrowLeft, Calendar, FileText } from "lucide-react";
import { notFound } from "next/navigation";
import Link from "next/link";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const supabase = await createClerkSupabaseClient();

  //fetch data for that specific note
  const { data: note, error } = await supabase
    .from("notes")
    .select("*")
    .eq("id", id)
    .single();

  //If no note or not found
  if (error || !note) {
    notFound(); //Redirects straight to the standard not found page from Next Js
  }

  return (
    <div className="w-full min-h-screen bg-gray-50/50 py-10 px-4 md:px-12">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Navigation Row */}
        <Link href="/">
          <Button
            variant="ghost"
            className="gap-2 text-gray-600 hover:text-black mb-4 pl-0"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Workspace
          </Button>
        </Link>

        {/* Note Article Container */}
        <article className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-10 space-y-6">
          <header className="space-y-3 border-b border-gray-100 pb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
              {note.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5 font-medium">
                <Calendar className="w-4 h-4 text-gray-400" />
                {new Date(note.created_at).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </header>

          {/* Main Note Body Content */}
          <div className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap font-normal">
            {note.content || (
              <p className="italic text-gray-400">
                No content provided for this note.
              </p>
            )}
          </div>

          {/* Attachment Showcase Section */}
          {note.image_url && (
            <div className="mt-8 pt-6 border-t border-gray-100 space-y-3">
              <h3 className="text-md font-semibold text-gray-800 flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#457FD0]" /> Attached Media
              </h3>
              <div className="relative max-w-full rounded-xl overflow-hidden border border-gray-200 bg-gray-50 shadow-sm group">
                <img
                  src={note.image_url}
                  alt={`Attachment for ${note.title}`}
                  className="w-full max-h-114.25 object-contain mx-auto transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <a
                    href={note.image_url}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-black/70 hover:bg-black text-white px-3 py-1.5 rounded-lg text-xs font-medium backdrop-blur-sm"
                  >
                    Open Full Resolution
                  </a>
                </div>
              </div>
            </div>
          )}
        </article>
      </div>
    </div>
  );
};

export default page;
