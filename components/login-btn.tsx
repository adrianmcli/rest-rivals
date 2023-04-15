import { useSession, signIn, signOut } from "next-auth/react";

export default function Component() {
  const { data: session } = useSession();

  return session ? (
    <button
      className="rounded-xl h-10 px-4 bg-slate-500 font-bold hover:scale-[102%] transition-transform ease-in-out"
      onClick={() => signOut()}
    >
      Sign out from Oura
    </button>
  ) : (
    <button
      className="rounded-xl h-10 px-4 bg-slate-500 font-bold hover:scale-[102%] transition-transform ease-in-out"
      onClick={() => signIn()}
    >
      Sign in with Oura
    </button>
  );
}
