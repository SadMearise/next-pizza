"use client";

import { FC, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/shared/lib/utils";
import { PROJECT_NAME } from "@/shared/constants";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import Container from "./container";
import SearchInput from "./search-input";
import CartButton from "./cart-button";
import ProfileButton from "./profile-button";
import { AuthModal } from "./modals";

interface Props {
  hasCart?: boolean;
  hasSearch?: boolean;
  className?: string;
}

const Header: FC<Props> = ({ hasCart = false, hasSearch = true, className }) => {
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    let toastMessage = "";

    if (searchParams.has("paid")) {
      toastMessage = "Заказ успешно оплачен! Информация отправлена на почту.";
    }

    if (searchParams.has("verified")) {
      toastMessage = "Почта успешно подтверждена.";
    }

    if (toastMessage) {
      setTimeout(() => {
        router.replace("/");

        toast.success(toastMessage, { duration: 3000 });
      }, 1000);
    }
  }, [searchParams, router]);

  return (
    <header className={cn("border-b", className)}>
      <Container className="flex items-center justify-between py-8">
        <div className="relative flex items-center gap-4">
          <Image
            src="/logo.png"
            alt="Logo"
            width={35}
            height={35}
          />
          <div>
            <h1 className="text-2xl uppercase font-black">{PROJECT_NAME}</h1>
            <p className="text-sm text-gray-400 leading-3">вкусней уже некуда</p>
          </div>
          <Link
            href="/"
            className="absolute inset-0 h-full w-full"
          />
        </div>

        {hasSearch && (
          <div className="mx-10 flex-1">
            <SearchInput />
          </div>
        )}

        <div className="flex items-center gap-3">
          <AuthModal
            open={openAuthModal}
            onClose={() => setOpenAuthModal(false)}
          />
          <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />

          {hasCart && <CartButton />}
        </div>
      </Container>
    </header>
  );
};

export default Header;
