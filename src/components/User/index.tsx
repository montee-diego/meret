import { useSession, signIn, signOut } from "next-auth/react";
import type { FC } from "react";

export const User: FC = () => {
  const { data: session } = useSession();

  return (
    <div>
      {session ? (
        <>
          <img src={`${session.user?.image}`} alt="" width={24} />
          <p>{session.user?.name}</p>
          <button onClick={() => signOut()}>logout</button>
        </>
      ) : (
        <button onClick={() => signIn("google")}>login</button>
      )}
    </div>
  );
};
