export type CheckInStatus = "checked-in" | "upcoming" | "cancelled";

export type CheckIn = {
  id: string;
  guestName: string;
  roomType: string;
  status: CheckInStatus;
  bookingDate: string;
  adults: number;
  children: number;
  nights: number;
  fromDate: string;
  toDate: string;
};
