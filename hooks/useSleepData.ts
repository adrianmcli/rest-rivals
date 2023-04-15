import { useSession } from "next-auth/react";
import { useQuery } from "react-query";

async function fetchSleepData(accessToken: string) {
  return fetch(
    `https://api.ouraring.com/v1/sleep?start=YYYY-MM-DD&end=YYYY-MM-DD&access_token=${accessToken}`
  ).then((x) => x.json());
}

export function useSleepData() {
  const { data: session } = useSession();

  const { data, isLoading } = useQuery(
    ["sleep"],
    async () => fetchSleepData(session?.accessToken ?? ""),
    { enabled: !!session?.accessToken }
  );

  return data?.sleep;
}
