import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { sanityClient } from "@services/sanity/client";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: `${process.env.GOOGLE_ID}`,
      clientSecret: `${process.env.GOOGLE_SECRET}`,
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        const { id, name, email, image } = user;
        const sanityUser = { _id: id, name, email, image, subs: [], _type: "user" };

        token.id = id;
        sanityClient.createIfNotExists(sanityUser).then((res) => {
          console.log("Created new user in Sanity.");
        });
      }

      return token;
    },
    async session({ session, token }: any) {
      if (session) {
        session.user.id = token.id;
      }

      return session;
    },
  },
};

export default NextAuth(authOptions);
