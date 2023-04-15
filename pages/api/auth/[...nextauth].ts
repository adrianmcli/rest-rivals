require("dotenv").config();
import NextAuth, { AuthOptions } from "next-auth";
export const authOptions: AuthOptions = {
  secret: process.env.AUTH_CONFIG_SECRET || "",
  providers: [
    {
      id: "oura-ring",
      name: "Oura Ring",
      type: "oauth",
      version: "2.0",
      authorization: {
        url: "https://cloud.ouraring.com/oauth/authorize",
        params: { scope: "email daily" },
      },
      userinfo: "https://api.ouraring.com/v1/userinfo",
      clientId: process.env.CLIENT_ID || "",
      clientSecret: process.env.CLIENT_SECRET || "",
      token: "https://api.ouraring.com/oauth/token",
      profile(profile: any) {
        return { id: profile.user_id, email: profile.email };
      },
    },
  ],
  callbacks: {
    // Assign access token to the session object
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      return session;
    },
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
};
export default NextAuth(authOptions);
