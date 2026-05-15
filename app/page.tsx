import CreateNote from "@/components/CreateNote";
import React from "react";

const page = () => {
  return (
    <div className="w-full min-h-screen px-8">
      <h1 className="text-3xl font-bold">My Private Notes</h1>
      <h2 className="text-xl font-semibold text-gray-600">
        Authentication by Clerk | Database & RLS by Supabase | State by Next.js
        Server Actions
      </h2>
      <div className="w-full h-auto grid grid-cols-[auto_1fr_auto] grid-rows-1 mt-6">
        <div>
          <CreateNote />
        </div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default page;
