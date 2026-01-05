import type { HotelInventory } from "../types/Inventory";

export const hotels: HotelInventory[] = [
  {
    id: "1",
    propertyToken: "hotel-demo-001",
    name: "Luxury Suite",
    price: 4200,
    rating: 4.6,
    reviews: 112,
    image: "/images/hotel1.jpg",
    type: "Suite",
    sleeps: 4,
    bedrooms: 2,
    bathrooms: 2,
    amenities: ["WiFi", "AC", "Breakfast"],
  },
  {
    id: "2",
    propertyToken: "hotel-demo-002",
    name: "Deluxe Room",
    price: 2800,
    rating: 4.4,
    reviews: 89,
    image: "/images/hotel2.jpg",
    type: "Deluxe",
    sleeps: 2,
    bedrooms: 1,
    bathrooms: 1,
    amenities: ["WiFi", "AC"],
  },
];
