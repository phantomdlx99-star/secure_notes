import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "NoteSecure",
  description: "A secure CRUD app for Notes handling",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${poppins.variable}`}>
        <body className="font-sans antialiased selection:bg-blue-400">
          <Header />
          <main className="pt-20 bg-[#F1F4F6]">{children}</main>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
