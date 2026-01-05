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
  paymentMethod: string;
  status: "pending" | "success" | "partial";
};
