import { use } from "react";
import { CartConext } from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
export default function Header() {
  const cartCtx = use(CartConext);
  const UserProgressCtx = use(UserProgressContext);

  const totalQuantity = cartCtx.items.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  function handleShowCart() {
    UserProgressCtx.showCart();
  }

  return (
    <header className="sticky top-0 z-20 border-b border-ink/10 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
        <a
          href="#menu"
          className="group flex items-center gap-3"
          aria-label="ReactFood home"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink font-display text-sm text-citrus transition-transform group-hover:-rotate-6 sm:h-11 sm:w-11">
            RF
          </span>
          <span>
            <span className="block font-display text-xl leading-none text-ink sm:text-2xl">
              ReactFood
            </span>
            <span className="mt-1 hidden text-[9px] font-bold uppercase tracking-[0.18em] text-muted sm:block">
              Fresh, made daily
            </span>
          </span>
        </a>
        <div className="flex items-center gap-3 sm:gap-6">
          <a
            href="#menu"
            className="hidden text-sm font-semibold text-muted transition-colors hover:text-ink sm:block"
          >
            Our menu
          </a>
          <button
            onClick={handleShowCart}
            className="flex items-center gap-2 rounded-full bg-leaf px-3 py-2 text-sm font-semibold text-ink sm:px-4"
            aria-live="polite"
            aria-label={`${totalQuantity} items in your bag`}
          >
            <span aria-hidden="true">Bag</span>
            <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-white px-1.5 text-xs tabular-nums">
              {totalQuantity}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
