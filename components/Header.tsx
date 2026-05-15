import { Show, SignOutButton, UserButton } from "@clerk/nextjs";
import { NotepadText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 w-full h-auto px-6 py-4 border-b-2 border-gray-300 flex justify-between items-center z-50 bg-white backdrop-blur-xs">
      <Link
        className="flex justify-center items-center gap-3 cursor-pointer"
        href={"/"}
      >
        <Image src={"/Logo/Logo.svg"} alt="Logo" width={35} height={35} />
        <h1 className="text-2xl font-bold">SecureNotes</h1>
      </Link>
      <div className="flex justify-center items-center gap-3">
        <Show when={"signed-out"}>
          <Link href={"/sign-in"}>
            <Button
              className="px-5 py-4 text-lg font-semibold cursor-pointer hover:bg-blue-500 transition-all duration-300 hover:text-white"
              variant={"outline"}
            >
              Sign In
            </Button>
          </Link>
        </Show>
        <Show when={"signed-in"}>
          <div className="flex justify-center items-center gap-3">
            <UserButton showName />
            <div className="hidden md:block">
              <SignOutButton>
                <Button
                  className="px-5 py-4 text-lg font-semibold cursor-pointer hover:bg-blue-500 transition-all duration-300 hover:text-white"
                  variant={"outline"}
                >
                  Sign Out
                </Button>
              </SignOutButton>
            </div>
          </div>
        </Show>
      </div>
    </header>
  );
};

export default Header;
