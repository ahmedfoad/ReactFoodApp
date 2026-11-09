import { use } from "react";
import { CartConext } from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";
import Modal from "./UI/Modal";
export default function Cart() {
  const cartCtx = use(CartConext);
  const userProgressCtx = use(UserProgressContext);

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0,
  );

  return (
    <Modal className="">
      <div className="p-5 sm:p-7">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl text-ink">Your Cart</h2>
            <p className="mt-1 text-sm text-muted">
              {cartCtx.items.length === 0
                ? "Your bag is waiting for something delicious."
                : `${cartCtx.items.length} ${cartCtx.items.length === 1 ? "item" : "items"} in your bag`}
            </p>
          </div>
          <button
            type="button"
            onClick={userProgressCtx.hideCart}
            aria-label="Close cart"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xl text-muted transition hover:bg-mist hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-forest"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        {cartCtx.items.length > 0 ? (
          <ul className="divide-y divide-ink/10">
            {cartCtx.items.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-4 py-4 first:pt-0"
              >
                <span className="font-semibold text-ink">{item.name}</span>
                <span className="shrink-0 text-sm text-muted">
                  {item.quantity} x {currencyFormatter.format(item.price)}
                </span>
                <p className="cart-item-action">
                  <Button onClick={() => cartCtx.removeItem(item.id)}>-</Button>
                  <span>QTY</span>
                  <Button onClick={() => cartCtx.addItem(item)}>+</Button>
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="rounded-xl bg-mist px-4 py-5 text-sm text-muted">
            Add a meal from the menu and it will show up here.
          </p>
        )}
        <div className="mt-5 flex items-center justify-between border-t border-ink/10 pt-5">
          <span className="font-semibold text-ink">Total</span>
          <span className="text-lg font-bold tabular-nums text-ink">
            {currencyFormatter.format(cartTotal)}
          </span>
        </div>
        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button
            textOnly
            onClick={userProgressCtx.hideCart}
            className="w-full sm:w-auto"
          >
            Close
          </Button>
          <Button
            disabled={cartCtx.items.length === 0}
            className="w-full sm:w-auto"
            onClick={userProgressCtx.showCheckout}
          >
            Go to Checkout
          </Button>
        </div>
      </div>
    </Modal>
  );
}
