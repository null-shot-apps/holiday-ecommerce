import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import bcrypt from 'bcryptjs';

// Mock user database - replace with real database in production
const users: any[] = [];

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || 'demo-google-id',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'demo-google-secret',
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || 'demo-facebook-id',
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || 'demo-facebook-secret',
    }),
    CredentialsProvider({
      name: 'Email',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Find user
        const user = users.find((u) => u.email === credentials.email);

        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
          };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    signUp: '/auth/signup',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
      }
      return session;
    },
  },
};

// Helper function to register new users
export async function registerUser(email: string, password: string, name: string) {
  const existingUser = users.find((u) => u.email === email);
  
  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = {
    id: String(users.length + 1),
    email,
    password: hashedPassword,
    name,
  };

  users.push(newUser);
  return { id: newUser.id, email: newUser.email, name: newUser.name };
}

