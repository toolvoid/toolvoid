import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  session: { strategy: 'jwt' },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user, profile }) {
      if (user) {
        token.sub = user.id || token.sub;
        token.email = user.email || token.email || profile?.email || '';
        token.name = user.name || token.name || profile?.name || '';
        token.picture = user.image || token.picture || profile?.picture || '';
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub || session.user.id;
        session.user.email = token.email || session.user.email || '';
        session.user.name = token.name || session.user.name || '';
        session.user.image = token.picture || session.user.image || '';
      }
      return session;
    },
  },
});