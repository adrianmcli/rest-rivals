import { useSession, signIn, signOut } from "next-auth/react";

export default function Component() {
  const { data: session } = useSession();

  return session ? (
    <button
      className="rounded-xl h-10 px-4 bg-slate-500 font-medium hover:bg-slate-500/70 transition-colors ease-in-out"
      onClick={() => signOut()}
    >
      Sign out from Oura
    </button>
  ) : (
    <button
      className="rounded-xl h-10 px-4 bg-blue-500 font-medium hover:bg-blue-500/70 transition-colors ease-in-out"
      onClick={() => signIn()}
    >
      Sign in with Oura
    </button>
  );
}
