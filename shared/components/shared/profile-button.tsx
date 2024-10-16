import { FC } from "react";
import { useSession } from "next-auth/react";
import { CircleUser, User } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui";

interface Props {
  onClickSignIn?: () => void;
  className?: string;
}

const ProfileButton: FC<Props> = ({ className, onClickSignIn }) => {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  return (
    <div className={className}>
      {!session ? (
        <Button
          loading={loading}
          onClick={onClickSignIn}
          variant="outline"
          className="flex items-center gap-1"
        >
          <User size={16} />
          Войти
        </Button>
      ) : (
        <Link href="/profile">
          <Button
            loading={loading}
            variant="secondary"
            className="flex items-center gap-2"
          >
            <CircleUser size={18} />
            Профиль
          </Button>
        </Link>
      )}
    </div>
  );
};

export default ProfileButton;
