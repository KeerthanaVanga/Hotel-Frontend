import axiosInstance from "../lib/axios-interceptor";
import type {
  ApiCheckInOption,
  CheckInOption,
  CheckInOptionPayload,
} from "../types/CheckInOption";

type CheckInOptionsApiResponse = {
  success: boolean;
  count: number;
  data: ApiCheckInOption[];
};

type CheckInOptionApiResponse = {
  success: boolean;
  data: ApiCheckInOption;
  message?: string;
};

function mapCheckInOption(option: ApiCheckInOption): CheckInOption {
  return {
    id: String(option.id),
    title: option.title,
    timeRange: option.time_range,
    description: option.description ?? "-",
    tag: option.tag,
    checkinPrice: Number(option.checkin_price),
    isFree: option.is_free,
  };
}

export async function getCheckInOptions(): Promise<CheckInOption[]> {
  const res =
    await axiosInstance.get<CheckInOptionsApiResponse>("/checkins/options");

  if (!res.data.success) {
    throw new Error("Failed to fetch check-in options");
  }

  return res.data.data.map(mapCheckInOption);
}

export async function createCheckInOption(payload: CheckInOptionPayload) {
  const res = await axiosInstance.post<CheckInOptionApiResponse>(
    "/checkins/options/create",
    payload,
  );

  if (!res.data.success) {
    throw new Error("Failed to create check-in option");
  }

  return res.data;
}

export async function updateCheckInOption(
  id: string,
  payload: CheckInOptionPayload,
) {
  const res = await axiosInstance.patch<CheckInOptionApiResponse>(
    `/checkins/options/${id}`,
    payload,
  );

  if (!res.data.success) {
    throw new Error("Failed to update check-in option");
  }

  return res.data;
}

export async function deleteCheckInOption(id: string) {
  const res = await axiosInstance.delete<{
    success: boolean;
    message?: string;
  }>(`/checkins/options/${id}`);

  if (!res.data.success) {
    throw new Error("Failed to delete check-in option");
  }

  return res.data;
}
