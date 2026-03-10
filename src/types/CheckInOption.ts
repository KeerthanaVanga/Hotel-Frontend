export type ApiCheckInOption = {
  id: number;
  title: string;
  time_range: string;
  description: string | null;
  tag: string;
  checkin_price: number;
  is_free: boolean;
};

export type CheckInOption = {
  id: string;
  title: string;
  timeRange: string;
  description: string;
  tag: string;
  checkinPrice: number;
  isFree: boolean;
};

export type CheckInOptionPayload = {
  title: string;
  time_range: string;
  description?: string | null;
  tag: string;
  checkin_price: number;
  is_free: boolean;
};
