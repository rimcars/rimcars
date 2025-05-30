import { UiCar } from "./types";

/**
 * Format car price with proper locale and currency
 */
export function formatCarPrice(price: number): string {
  return `${price.toLocaleString()} MRU`;
}

/**
 * Get car display name with brand and model
 */
export function getCarDisplayName(car: UiCar): string {
  if (car.model) {
    return `${car.brand} ${car.model} ${car.name}`;
  }
  return `${car.brand} ${car.name}`;
}

/**
 * Format mileage display
 */
export function formatMileage(mileage: number | null): string {
  if (!mileage || mileage === 0) {
    return "جديد";
  }
  return `${mileage.toLocaleString()} كم`;
}

/**
 * Get car condition display in Arabic
 */
export function getConditionDisplay(condition: string): string {
  const conditionMap: Record<string, string> = {
    new: "جديد",
    used: "مستعمل",
    جديد: "جديد",
    مستعمل: "مستعمل",
  };
  return conditionMap[condition] || condition;
}

/**
 * Filter cars by search query
 */
export function filterCarsBySearch(
  cars: UiCar[],
  searchQuery: string
): UiCar[] {
  if (!searchQuery.trim()) {
    return cars;
  }

  const query = searchQuery.toLowerCase();
  return cars.filter(
    (car) =>
      car.name.toLowerCase().includes(query) ||
      car.brand.toLowerCase().includes(query) ||
      (car.model && car.model.toLowerCase().includes(query)) ||
      car.fuelType.toLowerCase().includes(query) ||
      car.condition.toLowerCase().includes(query)
  );
}

/**
 * Sort cars by various criteria
 */
export type SortOption =
  | "price_asc"
  | "price_desc"
  | "year_desc"
  | "year_asc"
  | "mileage_asc";

export function sortCars(cars: UiCar[], sortBy: SortOption): UiCar[] {
  const sortedCars = [...cars];

  switch (sortBy) {
    case "price_asc":
      return sortedCars.sort((a, b) => a.price - b.price);
    case "price_desc":
      return sortedCars.sort((a, b) => b.price - a.price);
    case "year_desc":
      return sortedCars.sort((a, b) => (b.year || 0) - (a.year || 0));
    case "year_asc":
      return sortedCars.sort((a, b) => (a.year || 0) - (b.year || 0));
    case "mileage_asc":
      return sortedCars.sort((a, b) => (a.mileage || 0) - (b.mileage || 0));
    default:
      return sortedCars;
  }
}
