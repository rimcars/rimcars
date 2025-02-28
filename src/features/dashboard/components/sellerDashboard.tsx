'use client';
import React, { useState } from 'react';
import { 
  Gauge, 
  Fuel, 
  Calendar, 
  Users, 
  Car, 
  DollarSign,
  Plus,
  Edit2,
  Trash2,
  Search,
  Home,
  MessageSquare,
  Settings,
  Bell,
  ChevronDown,
  Cog,
  Menu
} from 'lucide-react';
import Image from 'next/image';

// Mock data for demonstration
const cars = [
  {
    id: 1,
    name: 'Mercedes-Benz C-Class',
    image: 'https://images.unsplash.com/photo-1617531653332-bd46c24d2e89?auto=format&fit=crop&q=80&w=1000',
    price: 45000,
    year: 2023,
    mileage: 15000,
    fuelType: 'Petrol',
    transmission: 'manuel',
    status: 'Available',
    views:220

  },
  {
    id: 2,
    name: 'BMW 5 Series',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=1000',
    price: 52000,
    year: 2022,
    mileage: 20000,
    fuelType: 'Diesel',
    transmission:'manuel',
    status: 'Under Offer',
    views:220

  },
  {
    id: 3,
    name: 'Audi A6',
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&q=80&w=1000',
    price: 48000,
    year: 2023,
    mileage: 12000,
    fuelType: 'Hybrid',
    transmission: 5,
    status: 'Available',
    views:220
  }
];

const userProfile = {
  name: 'John Smith',
  role: 'Premium Seller',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
  notifications: 3
};

const SellerDashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`bg-white fixed md:static inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition duration-200 ease-in-out z-30 w-64 shadow-lg`}>
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between h-16 px-4 border-b">
            <div className="flex items-center">
              <Car className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">CarMarket</span>
            </div>
            <button 
              className="md:hidden"
              onClick={() => setIsSidebarOpen(false)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
          
          <nav className="flex-1 px-4 py-6 space-y-2">
            <a href="#" className="flex items-center px-4 py-2.5 text-gray-900 bg-gray-100 rounded-lg">
              <Home className="h-5 w-5 mr-3" />
              Dashboard
            </a>
            <a href="#" className="flex items-center px-4 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg">
              <Car className="h-5 w-5 mr-3" />
              My Listings
            </a>
            <a href="#" className="flex items-center px-4 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg">
              <MessageSquare className="h-5 w-5 mr-3" />
              Messages
            </a>
            <a href="#" className="flex items-center px-4 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg">
              <Settings className="h-5 w-5 mr-3" />
              Settings
            </a>
          </nav>

          <div className="border-t p-4">
            <div className="flex items-center">
              <Image 
                src={userProfile.avatar}
                alt={userProfile.name}
                width={40}
                height={40}
                className="h-10 w-10 rounded-full"
              />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{userProfile.name}</p>
                <p className="text-xs text-gray-500">{userProfile.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <button 
                  className="md:hidden mr-4"
                  onClick={() => setIsSidebarOpen(true)}
                >
                  <Menu className="h-6 w-6" />
                </button>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Notifications */}
                <button className="relative p-2 text-gray-600 hover:text-gray-900">
                  <Bell className="h-6 w-6" />
                  {userProfile.notifications > 0 && (
                    <span className="absolute top-0 right-0 h-5 w-5 text-xs flex items-center justify-center bg-red-500 text-white rounded-full">
                      {userProfile.notifications}
                    </span>
                  )}
                </button>

                {/* Profile Dropdown */}
                <div className="relative">
                  <button 
                    className="flex items-center space-x-3 focus:outline-none"
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  >
                    <Image 
                      src={userProfile.avatar}
                      alt={userProfile.name}
                      className="h-8 w-8 rounded-full"
                      width={40}
                      height={40}
                    />
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-medium text-gray-900">{userProfile.name}</p>
                      <p className="text-xs text-gray-500">{userProfile.role}</p>
                    </div>
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </button>

                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Help Center</a>
                      <div className="border-t border-gray-100"></div>
                      <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                        Sign out
                      </a>
                    </div>
                  )}
                </div>

                <button className="hidden md:inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-5 w-5 mr-2" />
                  Add New Car
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <Car className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total Cars</p>
                  <p className="text-2xl font-semibold text-gray-900">12</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total Value</p>
                  <p className="text-2xl font-semibold text-gray-900">$580,000</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Profile Views</p>
                  <p className="text-2xl font-semibold text-gray-900">25</p>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-lg shadow mb-8">
            <div className="p-4">
              <div className="flex items-center">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Search cars..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
                <select className="ml-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>All Status</option>
                  <option>Available</option>
                  <option>Under Offer</option>
                  <option>Sold</option>
                </select>
              </div>
            </div>
          </div>

          {/* Car List */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="grid gap-6 p-6">
              {cars.map(car => (
                <div key={car.id} className="flex flex-col md:flex-row bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="md:w-72 h-48 relative">
                    <Image 
                      src={car.image} 
                      alt={car.name}
                      className="w-full h-full object-cover"
                      width={40}
                      height={40}
                    />
                    <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded text-sm font-medium">
                      {car.status}
                    </div>
                    <div className="absolute bottom-2 left-2 bg-black text-white px-2 py-1 rounded text-sm font-medium opacity-0 hover:opacity-100 transition-opacity duration-300">
                      {car.views} views
                    </div>
                  </div>
                  <div className="flex-1 p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{car.name}</h3>
                        <p className="text-2xl font-bold text-blue-600 mt-2">${car.price.toLocaleString()}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-2 text-gray-600 hover:text-blue-600">
                          <Edit2 className="h-5 w-5" />
                        </button>
                        <button className="p-2 text-gray-600 hover:text-red-600">
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-gray-400" />
                        <span className="ml-2 text-sm text-gray-600">{car.year}</span>
                      </div>
                      <div className="flex items-center">
                        <Gauge className="h-5 w-5 text-gray-400" />
                        <span className="ml-2 text-sm text-gray-600">{car.mileage.toLocaleString()} km</span>
                      </div>
                      <div className="flex items-center">
                        <Fuel className="h-5 w-5 text-gray-400" />
                        <span className="ml-2 text-sm text-gray-600">{car.fuelType}</span>
                      </div>
                      <div className="flex items-center">
                        <Cog className="h-5 w-5 text-gray-400" />
                        <span className="ml-2 text-sm text-gray-600">{car.transmission}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SellerDashboard; 