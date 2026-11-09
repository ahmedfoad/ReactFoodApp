import { useState } from "react";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Header from "./components/Header";
import Meals from "./components/Meals";
import CartContextProvider from "./store/CartContext";
import { UserProgressContextProvider } from "./store/UserProgressContext";
function App() {
  const [cartCount, setCartCount] = useState(0);

  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <div className="min-h-screen bg-mist">
          <Header cartCount={cartCount} />
          <main className="mx-auto max-w-7xl px-4 pb-16 pt-9 sm:px-6 sm:pt-12 lg:px-8">
            <section className="mb-8 flex flex-col justify-between gap-5 border-b border-ink/10 pb-7 sm:mb-10 sm:flex-row sm:items-end sm:pb-9">
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-forest">
                  Good food, good mood
                </p>
                <h1 className="font-display text-4xl leading-[1.05] text-ink sm:text-5xl">
                  Fresh from our kitchen.
                </h1>
                <p className="mt-3 max-w-xl text-sm leading-6 text-muted sm:text-base">
                  The comfort-food favorites you love, made fresh and ready when
                  you are.
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-3 text-sm text-muted sm:pb-1">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-leaf text-lg"
                  aria-hidden="true"
                >
                  30'
                </span>
                <span>
                  <span className="block font-semibold text-ink">
                    Made to order
                  </span>
                  <span>At your door in 30-40 min</span>
                </span>
              </div>
            </section>
            <Meals onAddToCart={() => setCartCount((count) => count + 1)} />
            <Cart />
            <Checkout />
          </main>
          <footer className="border-t border-ink/10 px-4 py-6 text-center text-xs text-muted sm:px-6">
            Made fresh, just for you.
          </footer>
        </div>
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
