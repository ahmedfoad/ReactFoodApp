import { use } from "react";
import { CartConext } from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";

export default function MealItem({ meal }) {
  const isPlantBased = /vegan|veggie|salad|falafel|mushroom|eggplant/i.test(
    `${meal.name} ${meal.description}`,
  );

  const cartCtx = use(CartConext);

  function onAddMealToCart() {
    cartCtx.addItem(meal);
  }

  return (
    <li className="min-w-0">
      <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-xl">
        <div className="relative aspect-[4/3] overflow-hidden bg-leaf">
          <img
            src={`http://localhost:3000/${meal.image}`}
            alt={meal.name}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
          />
          {isPlantBased && (
            <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold text-forest shadow-sm">
              Plant-forward
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-xl leading-tight text-ink sm:text-2xl">
              {meal.name}
            </h3>
            <span className="shrink-0 rounded-lg bg-leaf px-2.5 py-1 text-sm font-bold tabular-nums text-forest">
              {currencyFormatter.format(Number(meal.price))}
            </span>
          </div>
          <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-muted">
            {meal.description}
          </p>
          <Button
            className="mt-5 w-full"
            onClick={onAddMealToCart}
            aria-label={`Add ${meal.name} to your bag`}
          >
            Add to bag <span aria-hidden="true">+</span>
          </Button>
        </div>
      </article>
    </li>
  );
}
