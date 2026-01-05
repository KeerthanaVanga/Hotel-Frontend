import axiosInstance from "../lib/axios-interceptor";

export type ApiPayment = {
  payment_id: string;
  user_id: number;
  booking_id: string;
  method: string;
  status: "pending" | "success" | "partial";
  currency: string;
  bill_amount: string;
  bill_paid_amount: string;
  created_at: string;

  users: {
    user_id: number;
    name: string;
    email: string;
  };

  bookings: {
    booking_id: string;
    check_in: string;
    check_out: string;
    status: string;
  };
};

export type GetPaymentsResponse = {
  success: boolean;
  count: number;
  data: ApiPayment[];
};

export async function getPayments() {
  const res = await axiosInstance.get<GetPaymentsResponse>(
    "/payments/payments"
  );

  if (!res.data.success) {
    throw new Error("Failed to fetch payments");
  }

  return res.data;
}
