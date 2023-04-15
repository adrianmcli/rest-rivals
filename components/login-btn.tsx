import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";
export default function Component() {
  const { data: session } = useSession();
  useEffect(() => {
    if (session) {
      const init = async () => {
        const result = await fetch(
          `https://api.ouraring.com/v1/sleep?start=YYYY-MM-DD&end=YYYY-MM-DD&access_token=${session.accessToken}`,
        ).then((x) => x.json());
        console.log(result);
      };
      init();
    }
  }, [session]);
  if (session) {
    return (
      <>
        Signed in as {session?.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
