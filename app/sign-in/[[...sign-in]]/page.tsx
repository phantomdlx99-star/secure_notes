import { SignIn } from "@clerk/nextjs";

const page = () => {
  return (
    <div className="w-full h-dvh p-0 m-0 flex justify-center items-center">
      <SignIn fallbackRedirectUrl={"/"} />
    </div>
  );
};

export default page;
