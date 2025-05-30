# Public Listings Feature

## Overview

This feature handles the public display and browsing of car listings in the marketplace. It's optimized for Arabic language support and follows a clean, modular architecture.

## Components

### Core Components

- **`CarListing`** - Main listing page with filters and search
- **`CarCard`** - Individual car card component
- **`CarDetailsClient`** - Detailed car view page
- **`FilterSidebar`** - Advanced filtering with price, brand, fuel type, and year filters
- **`BasicShareModal`** - Social media sharing modal with Arabic platform names

### Features

- ✅ Full Arabic language support
- ✅ Responsive design (mobile/desktop)
- ✅ Advanced filtering and search
- ✅ Favorites integration with Zustand store
- ✅ Social media sharing
- ✅ Optimized performance

## Types

- **`UiCar`** - Main car interface for UI components
- **`SortOption`** - Sorting options type

## Utilities

- `formatCarPrice()` - Format price with MRU currency
- `getCarDisplayName()` - Get full car display name
- `formatMileage()` - Format mileage display
- `getConditionDisplay()` - Get condition in Arabic
- `filterCarsBySearch()` - Search filter utility
- `sortCars()` - Sort cars by various criteria
- `getCarShareData()` - Generate share URL and title

## Recent Improvements

### Removed Components

- ❌ **Hero** - Unused component with English content
- ❌ **Brands** - Unused component with English content
- ❌ **FloatingCar** - Unused animation component

### Optimizations

- 🔧 **BasicShareModal** - Added Arabic platform names
- 🔧 **FilterSidebar** - Fixed currency (MRU), simplified styling
- 🔧 **Type Safety** - All TypeScript errors resolved
- 🔧 **Export Pattern** - Simplified to consistent named exports

## Usage

```typescript
// Import components
import {
  CarListing,
  CarCard,
  CarDetailsClient,
} from "@/features/public-listings";

// Import types and utilities
import {
  UiCar,
  formatCarPrice,
  convertListingToUiCar,
} from "@/features/public-listings";

// Import actions
import {
  getAllListings,
  getPublicListingById,
} from "@/features/public-listings";
```

## File Structure

```
src/features/public-listings/
├── components/
│   ├── car-listing.tsx          # Main listing page
│   ├── car-card.tsx             # Car card component
│   ├── car-details-client.tsx   # Car details page
│   ├── filter-sidebar.tsx       # Filtering component
│   └── basic-share-modal.tsx    # Share modal
├── types.ts                     # Type definitions
├── utils.ts                     # Utility functions
├── actions.ts                   # Server actions
├── index.ts                     # Feature exports
└── README.md                    # This file
```

## Dependencies

- React 18+
- Next.js 15+
- TypeScript
- Tailwind CSS
- Shadcn/ui components
- Zustand (for favorites)
- Supabase (for data)

## Notes

- All components are fully Arabic-localized
- Currency is displayed in MRU (Mauritanian Ouguiya)
- Integrates with the favorites feature via Zustand store
- Responsive design optimized for mobile and desktop
- No unused dependencies or code
