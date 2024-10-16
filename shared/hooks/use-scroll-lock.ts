import { useEffect } from "react";

const useScrollLock = (isOpen: boolean) => {
  useEffect(() => {
    if (isOpen) {
      const width = window.innerWidth - document.documentElement.clientWidth;

      document.body.classList.add("overflow-hidden");
      document.body.style.paddingRight = `${width}px`;
    } else {
      document.body.classList.remove("overflow-hidden");
      document.body.style.paddingRight = "0";
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
      document.body.style.paddingRight = "0";
    };
  }, [isOpen]);
};

export default useScrollLock;
