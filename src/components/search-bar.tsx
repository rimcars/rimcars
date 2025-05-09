import React from 'react';
import Image from 'next/image';
import { Search } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';

// Car manufacturers with their logos
const manufacturers = [
  { name: 'Audi', logo: '/logos/audi.png' },
  { name: 'BMW', logo: '/logos/bmw.png' },
  { name: 'Mercedes', logo: '/logos/mercedes.png' },
  { name: 'Toyota', logo: '/logos/toyota.png' },
  { name: 'Volkswagen', logo: '/logos/volkswagen.png' },
  { name: 'Honda', logo: '/logos/honda.png' },
  { name: 'Ford', logo: '/logos/ford.png' },
  { name: 'Chevrolet', logo: '/logos/chevrolet.png' },
];

export default function SearchBar() {
  return (
    <div className="w-full bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Manufacturer Field with Logo */}
        <div className="space-y-2">
          <label htmlFor="manufacturer" className="text-sm font-medium text-gray-700">
            Manufacturer
          </label>
          <Select>
            <SelectTrigger id="manufacturer" className="flex items-center space-x-2 h-12">
              <SelectValue placeholder="Select make" />
            </SelectTrigger>
            <SelectContent>
              {manufacturers.map((manufacturer) => (
                <SelectItem 
                  key={manufacturer.name} 
                  value={manufacturer.name}
                  className="flex items-center space-x-2"
                >
                  <div className="flex items-center gap-2">
                    <div className="relative w-6 h-6">
                      <Image
                        src={manufacturer.logo}
                        alt={manufacturer.name}
                        width={24}
                        height={24}
                        className="object-contain"
                      />
                    </div>
                    <span>{manufacturer.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Model Field */}
        <div className="space-y-2">
          <label htmlFor="model" className="text-sm font-medium text-gray-700">
            Model
          </label>
          <Select>
            <SelectTrigger id="model" className="h-12">
              <SelectValue placeholder="Select model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Models</SelectItem>
              {/* Models will be dynamically populated based on manufacturer */}
            </SelectContent>
          </Select>
        </div>

        {/* Price Range Field */}
        <div className="space-y-2">
          <label htmlFor="price" className="text-sm font-medium text-gray-700">
            Price Range
          </label>
          <Select>
            <SelectTrigger id="price" className="h-12">
              <SelectValue placeholder="Select price range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-10000">$0 - $10,000</SelectItem>
              <SelectItem value="10000-20000">$10,000 - $20,000</SelectItem>
              <SelectItem value="20000-30000">$20,000 - $30,000</SelectItem>
              <SelectItem value="30000-50000">$30,000 - $50,000</SelectItem>
              <SelectItem value="50000+">$50,000+</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Search Button */}
      <div className="mt-4">
        <Button className="w-full h-12">
          <Search className="mr-2 h-4 w-4" />
          Search Cars
        </Button>
      </div>
    </div>
  );
} 