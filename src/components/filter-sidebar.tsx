"use client"

import { useState, useEffect, useRef } from "react"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface Car {
  id: number
  name: string
  price: number
  year: number
  image: string
  speed: number
  mileage: number
  fuelType: string
  transmission: string
  brand: string
}

interface FilterSidebarProps {
  onFilterChange: (filteredCars: Car[]) => void
  allCars: Car[]
}

export function FilterSidebar({ onFilterChange, allCars }: FilterSidebarProps) {
  // Get unique values for filters
  const brands = Array.from(new Set(allCars.map((car) => car.brand)))
  const fuelTypes = Array.from(new Set(allCars.map((car) => car.fuelType)))
  const years = Array.from(new Set(allCars.map((car) => car.year))).sort((a, b) => b - a)

  // Find min and max prices
  const minPrice = Math.min(...allCars.map((car) => car.price))
  const maxPrice = Math.max(...allCars.map((car) => car.price))

  const [priceRange, setPriceRange] = useState([minPrice, maxPrice])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedFuelTypes, setSelectedFuelTypes] = useState<string[]>([])
  const [selectedYears, setSelectedYears] = useState<number[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  // Use a ref to track if this is the first render
  const isFirstRender = useRef(true)

  // Initialize price range only once
  useEffect(() => {
    if (isFirstRender.current) {
      setPriceRange([minPrice, maxPrice])
      isFirstRender.current = false
    }
  }, [minPrice, maxPrice])

  // Apply filters with a debounce to prevent too many updates
  useEffect(() => {
    // Skip the first render to avoid initial filter application
    if (isFirstRender.current) {
      return
    }

    const applyFilters = () => {
      let filtered = [...allCars]

      // Filter by search term
      if (searchTerm.trim()) {
        const searchLower = searchTerm.toLowerCase()
        filtered = filtered.filter(
          (car) => car.name.toLowerCase().includes(searchLower) || car.brand.toLowerCase().includes(searchLower),
        )
      }

      // Filter by price
      filtered = filtered.filter((car) => car.price >= priceRange[0] && car.price <= priceRange[1])

      // Filter by brand
      if (selectedBrands.length > 0) {
        filtered = filtered.filter((car) => selectedBrands.includes(car.brand))
      }

      // Filter by fuel type
      if (selectedFuelTypes.length > 0) {
        filtered = filtered.filter((car) => selectedFuelTypes.includes(car.fuelType))
      }

      // Filter by year
      if (selectedYears.length > 0) {
        filtered = filtered.filter((car) => selectedYears.includes(car.year))
      }

      onFilterChange(filtered)
    }

    // Use a timeout to debounce the filter application
    const timeoutId = setTimeout(applyFilters, 100)
    return () => clearTimeout(timeoutId)
  }, [priceRange, selectedBrands, selectedFuelTypes, selectedYears, allCars, onFilterChange, searchTerm])

  const handleBrandChange = (brand: string) => {
    setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]))
  }

  const handleFuelTypeChange = (fuelType: string) => {
    setSelectedFuelTypes((prev) => (prev.includes(fuelType) ? prev.filter((f) => f !== fuelType) : [...prev, fuelType]))
  }

  const handleYearChange = (year: number) => {
    setSelectedYears((prev) => (prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year]))
  }

  const resetFilters = () => {
    setPriceRange([minPrice, maxPrice])
    setSelectedBrands([])
    setSelectedFuelTypes([])
    setSelectedYears([])
    setSearchTerm("")
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-4">Filters</h3>
        <Button variant="outline" size="sm" className="w-full" onClick={resetFilters}>
          Reset All
        </Button>
      </div>

      <div className="space-y-2">
        <label htmlFor="search" className="text-sm font-medium">
          Search Make or Model
        </label>
        <div className="relative">
          <input
            id="search"
            type="text"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            placeholder="e.g. BMW, Tesla Model 3"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Accordion type="multiple" defaultValue={["price", "brand", "fuel", "year"]}>
        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-2">
              <Slider
                defaultValue={[minPrice, maxPrice]}
                min={minPrice}
                max={maxPrice}
                step={1000}
                value={priceRange}
                onValueChange={setPriceRange}
              />
              <div className="flex items-center justify-between">
                <span className="text-sm">${priceRange[0].toLocaleString()}</span>
                <span className="text-sm">${priceRange[1].toLocaleString()}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="brand">
          <AccordionTrigger>Brand</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {brands.map((brand) => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox
                    id={`brand-${brand}`}
                    checked={selectedBrands.includes(brand)}
                    onCheckedChange={() => handleBrandChange(brand)}
                  />
                  <Label htmlFor={`brand-${brand}`}>{brand}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="fuel">
          <AccordionTrigger>Fuel Type</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {fuelTypes.map((fuelType) => (
                <div key={fuelType} className="flex items-center space-x-2">
                  <Checkbox
                    id={`fuel-${fuelType}`}
                    checked={selectedFuelTypes.includes(fuelType)}
                    onCheckedChange={() => handleFuelTypeChange(fuelType)}
                  />
                  <Label htmlFor={`fuel-${fuelType}`}>{fuelType}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="year">
          <AccordionTrigger>Year</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {years.map((year) => (
                <div key={year} className="flex items-center space-x-2">
                  <Checkbox
                    id={`year-${year}`}
                    checked={selectedYears.includes(year)}
                    onCheckedChange={() => handleYearChange(year)}
                  />
                  <Label htmlFor={`year-${year}`}>{year}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

