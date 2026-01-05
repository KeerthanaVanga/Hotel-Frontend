export type PaymentMethod = "Cash" | "Card" | "UPI" | "Bank Transfer";

export type PaymentStatus = "pending" | "success" | "failed" | "partial";

export type Payment = {
  id: string;
  userName: string;
  bookingDate: string;
  paymentDate: string;
  roomType: string;
  nights: number;
  perNightPrice: number;
  billGenerated: number;
  billPaid: number;
  paymentMethod: string; // ✅ FIXED
  status: string; // ✅ FIXED
};
