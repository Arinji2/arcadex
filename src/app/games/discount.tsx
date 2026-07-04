export function DiscountCard() {
  return (
    <div className="group relative flex items-start gap-4 border-thick bg-secondary-container/50 p-6 shadow-hard transition-colors md:col-span-8 md:gap-6">
      <div className="-top-4 -right-4 absolute rotate-12 rounded-full border-thick bg-secondary px-3 py-1 font-bold text-on-secondary text-xl shadow-hard">
        17% OFF
      </div>
      <div className="hidden shrink-0 border-thick bg-secondary p-3 text-on-secondary sm:block">
        <span
          className="material-symbols-outlined text-3xl"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          featured_seasonal_and_gifts
        </span>
      </div>
      <div className="relative z-10">
        <h3 className="mb-2 font-headline-lg-mobile text-headline-lg-mobile text-xl uppercase">
          Discounted Prices for 4+ Games
        </h3>
        <p className="font-body-md text-body-md text-on-secondary-fixed">
          Register for 4 or more games and pay just ₹50 per game
        </p>
      </div>
    </div>
  );
}
