export type RoomAvailabilityStatus =
  | "available"
  | "booked"
  | "maintenance"
  | string;

export type RoomSummary = {
  roomId: number;
  roomName: string;
  roomType: string;
  price: number;
  totalRooms: number;
  roomsAvailable: number;
  bookedRooms: number;
  guests: number;
};

export type RoomNumber = {
  id: number;
  roomNumber: number;
  status: RoomAvailabilityStatus;
  roomId: number;
  createdAt: string;
  updatedAt: string;
  room: RoomSummary;
};
