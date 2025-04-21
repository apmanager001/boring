import { User, getServerSession } from "next-auth";

// export const session = async ({ session, token }: any) => {
//   session.user.id = token.id;
//   return session;
// };

// export const getUserSession = async (): Promise<User> => {
//   const authUserSession = await getServerSession({
//     callbacks: {
//       session,
//     },
//   });
  // if (!authUserSession) throw new Error('unauthorized')
//   return authUserSession?.user;
// };
// export const getUserSession = async (): Promise<User> => {
//   const authUserSession = await getServerSession();
//   return authUserSession?.user
// }
export const getUserSession = async (): Promise<User | null> => {
  const authUserSession = await getServerSession();

  if (!authUserSession || !authUserSession.user) {
    return null; // Return null if no session or user is found
  }

  return authUserSession.user; // Safely return the user object
};
