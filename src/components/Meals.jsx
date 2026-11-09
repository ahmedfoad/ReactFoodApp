import { useEffect, useState } from "react";
import MealItem from "./MealItem";
import Button from "./UI/Button";

const filters = ["Everything", "Under $10", "Plant-forward", "Sweet treats"];

function matchesFilter(meal, filter) {
  const details = `${meal.name} ${meal.description}`.toLowerCase();

  if (filter === "Under $10") return Number(meal.price) < 10;
  if (filter === "Plant-forward") {
    return /vegan|veggie|salad|falafel|mushroom|eggplant/.test(details);
  }
  if (filter === "Sweet treats") {
    return /pancake|brownie|cheesecake/.test(details);
  }
  return true;
}

export default function Meals({ onAddToCart }) {
  const [loadedMeals, setLoadedMeals] = useState([]);
  const [activeFilter, setActiveFilter] = useState("Everything");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchMeals() {
      setLoading(true);
      setError(false);
      try {
        const response = await fetch("http://localhost:3000/meals", {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("Meals could not be loaded");
        const meals = await response.json();
        setLoadedMeals(meals);
      } catch (fetchError) {
        if (fetchError.name !== "AbortError") setError(true);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    fetchMeals();
    return () => controller.abort();
  }, [reloadKey]);

  const visibleMeals = loadedMeals.filter((meal) => {
    const matchesSearch = `${meal.name} ${meal.description}`
      .toLowerCase()
      .includes(search.trim().toLowerCase());
    return matchesSearch && matchesFilter(meal, activeFilter);
  });

  return (
    <section id="menu" aria-labelledby="menu-heading">
      <div className="mb-5 flex flex-col gap-4 sm:mb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-coral">
            A little something delicious
          </p>
          <h2
            id="menu-heading"
            className="mt-1 font-display text-3xl text-ink sm:text-4xl"
          >
            The menu
          </h2>
        </div>
        <p className="text-sm text-muted">
          {loadedMeals.length
            ? `${loadedMeals.length} fresh favorites`
            : "Fresh favorites, made to order"}
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div
          className="flex gap-2 overflow-x-auto pb-1"
          role="group"
          aria-label="Filter meals"
        >
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              aria-pressed={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
              className={`min-h-10 shrink-0 rounded-full px-4 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest ${activeFilter === filter ? "bg-ink text-white" : "bg-white text-muted hover:bg-leaf hover:text-ink"}`}
            >
              {filter}
            </button>
          ))}
        </div>
        <label className="relative block w-full md:max-w-xs">
          <span className="sr-only">Search the menu</span>
          <span
            className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-muted"
            aria-hidden="true"
          >
            /
          </span>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Find your favorite..."
            className="h-11 w-full rounded-xl border border-ink/10 bg-white pl-9 pr-4 text-sm text-ink outline-none transition placeholder:text-muted/70 focus:border-forest focus:ring-2 focus:ring-forest/10"
          />
        </label>
      </div>

      {loading && (
        <div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          aria-label="Loading meals"
        >
          {Array.from({ length: 6 }, (_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl bg-white shadow-card"
              aria-hidden="true"
            >
              <div className="aspect-[4/3] animate-pulse bg-leaf" />
              <div className="space-y-3 p-5">
                <div className="h-5 w-2/3 animate-pulse rounded bg-leaf" />
                <div className="h-4 w-full animate-pulse rounded bg-leaf/70" />
                <div className="h-11 animate-pulse rounded-xl bg-leaf" />
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="rounded-2xl border border-coral/20 bg-white px-6 py-10 text-center shadow-card">
          <p className="font-display text-2xl text-ink">
            We can’t reach the kitchen just now.
          </p>
          <p className="mt-2 text-sm text-muted">
            Please check your connection and try again.
          </p>
          <Button
            className="mt-5"
            onClick={() => setReloadKey((key) => key + 1)}
          >
            Try again
          </Button>
        </div>
      )}

      {!loading && !error && visibleMeals.length > 0 && (
        <ul className="grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {visibleMeals.map((meal) => (
            <MealItem key={meal.id} meal={meal} onAddToCart={onAddToCart} />
          ))}
        </ul>
      )}

      {!loading && !error && visibleMeals.length === 0 && (
        <div className="rounded-2xl border border-ink/10 bg-white px-6 py-12 text-center">
          <p className="font-display text-2xl text-ink">
            Nothing on the menu matches.
          </p>
          <p className="mt-2 text-sm text-muted">
            Try another search or choose a different filter.
          </p>
          <Button
            variant="secondary"
            className="mt-5"
            onClick={() => {
              setSearch("");
              setActiveFilter("Everything");
            }}
          >
            Clear filters
          </Button>
        </div>
      )}
    </section>
  );
}
