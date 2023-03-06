import { Fragment } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

import { formatDate } from "@global/utils";
import Style from "./index.module.css";

interface IProps {
  total: {
    playlists: number;
    subs: number;
  };
  user: {
    _createdAt: string;
  };
}

export default function UserProfileCard({ total, user }: IProps) {
  const { data: session, status } = useSession();

  return (
    <Fragment>
      {session && (
        <div className={Style.Container}>
          <div className={Style.User}>
            {session.user.image && (
              <div className={Style.ProfileImage}>
                <Image src={session.user.image} alt="U" sizes="64px" fill />
              </div>
            )}

            <h2>{session.user.name}</h2>
          </div>

          <div className={Style.Data}>
            <div className={Style.DataItem}>
              <span>EMAIL</span>
              <p>{session.user.email}</p>
            </div>

            <div className={Style.DataItem}>
              <span>JOINED</span>
              <p>{formatDate(user._createdAt)}</p>
            </div>

            <div className={Style.DataItem}>
              <span>PLAYLISTS</span>
              <p>{total.playlists}</p>
            </div>

            <div className={Style.DataItem}>
              <span>SUBSCRIPTIONS</span>
              <p>{total.subs}</p>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}
