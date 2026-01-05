import axiosInstance from "../lib/axios-interceptor";

export type ApiBooking = {
  booking_id: string;
  status: string;
  adults: number;
  children: number;
  guests_total: number;
  check_in: string;
  check_out: string;
  created_at: string;

  users: {
    user_id: number;
    name: string;
    email: string;
  };

  rooms: {
    room_id: number;
    room_type: string;
    room_name: string;
    room_number: number;
    price: string;
  };
};

export type GetBookingsResponse = {
  success: boolean;
  count: number;
  data: ApiBooking[];
};

export async function getUpcomingBookings() {
  // update route if your backend is different
  const res = await axiosInstance.get<GetBookingsResponse>("/bookings/upcoming");

  if (!res.data.success) {
    throw new Error("Failed to fetch bookings");
  }

  return res.data; // {success,count,data}
}
