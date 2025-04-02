"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Listing } from "../../types";

export interface SearchBarProps {
  listings: Listing[];
  onSearch?: (filteredListings: Listing[]) => void;
}

export default function SearchBar({ listings, onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term: string) => {
    setSearchTerm(term);

    // Filter listings based on search term
    const filtered = listings.filter(
      (listing) =>
        listing.car_name.toLowerCase().includes(term.toLowerCase()) ||
        listing.make?.toLowerCase().includes(term.toLowerCase()) ||
        listing.model?.toLowerCase().includes(term.toLowerCase())
    );

    // Call onSearch callback if provided
    if (onSearch) {
      onSearch(filtered);
    }
  };

  return (
    <div className="relative w-full sm:w-64">
      <Search className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="بحث..."
        className="pl-2 pr-8"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
}
