import { use, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import UserProgressContext from "../../store/UserProgressContext";
export default function Modal({ children, open, className = "" }) {
  const userProgressCtx = use(UserProgressContext);
  const dialog = useRef();
  const isOpen = open ?? userProgressCtx.progress === "cart";

  useEffect(() => {
    const dialogElement = dialog.current;

    if (isOpen && !dialogElement.open) {
      dialogElement.showModal();
    } else if (!isOpen && dialogElement.open) {
      dialogElement.close();
    }
  }, [isOpen]);

  return createPortal(
    <dialog
      ref={dialog}
      aria-modal="true"
      className={`m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-lg overflow-y-auto rounded-2xl border-0 bg-white p-0 text-ink shadow-2xl backdrop:bg-ink/50 backdrop:backdrop-blur-sm ${className}`}
      onCancel={(event) => {
        event.preventDefault();
        userProgressCtx.hideCart();
      }}
      onClose={() => {
        if (userProgressCtx.progress === "cart") {
          userProgressCtx.hideCart();
        }
      }}
    >
      {children}
    </dialog>,
    document.getElementById("modal"),
  );
}
