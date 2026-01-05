import type { HotelInventory } from "../types/Inventory";

export const MOCK_HOTELS: HotelInventory[] = [
  {
    id: "1",
    name: "Zora Park Luxury Rooms",
    price: 1397,
    rating: 2.7,
    reviews: 8,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945",
    type: "Holiday rental",
    sleeps: 12,
    bedrooms: 13,
    bathrooms: 4,
    amenities: ["Air conditioning", "Wi-Fi"],
  },
  {
    id: "2",
    name: "Ganesh Bhavan By Vinayak",
    price: 550,
    rating: 4.3,
    reviews: 733,
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
    type: "Hotel",
    sleeps: 6,
    bedrooms: 3,
    bathrooms: 2,
    amenities: ["Wi-Fi", "Parking", "Pool"],
  },
];
