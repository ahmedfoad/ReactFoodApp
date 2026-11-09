import { use, useState } from "react";
import { CartConext } from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
import Button from "./UI/Button";
import Modal from "./UI/Modal";

const inputClassName =
  "mt-1 min-h-11 w-full rounded-lg border border-ink/15 bg-white px-3 text-sm text-ink outline-none transition focus:border-forest focus:ring-2 focus:ring-forest/15";

export default function Checkout() {
  const cartCtx = use(CartConext);
  const userProgressCtx = use(UserProgressContext);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const customer = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order: { items: cartCtx.items, customer },
        }),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to place your order.");
      }

      cartCtx.clearCart();
      setOrderSubmitted(true);
    } catch (submissionError) {
      setError(submissionError.message || "Unable to place your order.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function closeCheckout() {
    setOrderSubmitted(false);
    setError("");
    userProgressCtx.hideCheckout();
  }

  return (
    <Modal open={userProgressCtx.progress === "checkout"}>
      <div className="p-5 sm:p-7">
        {orderSubmitted ? (
          <div className="py-4 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-forest">
              Order received
            </p>
            <h2 className="font-display text-2xl text-ink">
              Thanks for your order!
            </h2>
            <p className="mt-2 text-sm text-muted">
              We’re preparing your meal now.
            </p>
            <Button className="mt-6 w-full sm:w-auto" onClick={closeCheckout}>
              Done
            </Button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-forest">
                Almost there
              </p>
              <h2 className="font-display text-2xl text-ink">Checkout</h2>
              <p className="mt-1 text-sm text-muted">
                Where should we deliver your order?
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="text-sm font-semibold text-ink"
                >
                  Full name
                </label>
                <input
                  id="name"
                  name="name"
                  autoComplete="name"
                  required
                  className={inputClassName}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-ink"
                >
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={inputClassName}
                />
              </div>
              <div>
                <label
                  htmlFor="street"
                  className="text-sm font-semibold text-ink"
                >
                  Street address
                </label>
                <input
                  id="street"
                  name="street"
                  autoComplete="street-address"
                  required
                  className={inputClassName}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="postal-code"
                    className="text-sm font-semibold text-ink"
                  >
                    Postal code
                  </label>
                  <input
                    id="postal-code"
                    name="postal-code"
                    autoComplete="postal-code"
                    required
                    className={inputClassName}
                  />
                </div>
                <div>
                  <label
                    htmlFor="city"
                    className="text-sm font-semibold text-ink"
                  >
                    City
                  </label>
                  <input
                    id="city"
                    name="city"
                    autoComplete="address-level2"
                    required
                    className={inputClassName}
                  />
                </div>
              </div>
              {error && (
                <p
                  role="alert"
                  className="rounded-lg bg-coral/10 px-3 py-2 text-sm text-[#9f3420]"
                >
                  {error}
                </p>
              )}
              <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
                <Button
                  textOnly
                  onClick={userProgressCtx.showCart}
                  className="w-full sm:w-auto"
                >
                  Back to cart
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting || cartCtx.items.length === 0}
                  className="w-full sm:w-auto"
                >
                  {isSubmitting ? "Placing order..." : "Place order"}
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </Modal>
  );
}
