import { useEffect, useState } from "react";
import type {
  CheckInOption,
  CheckInOptionPayload,
} from "../../types/CheckInOption";

type Props = {
  open: boolean;
  mode: "create" | "edit";
  initialValue?: CheckInOption | null;
  saving: boolean;
  onClose: () => void;
  onSubmit: (payload: CheckInOptionPayload) => void;
};

type FormState = {
  title: string;
  time_range: string;
  description: string;
  tag: string;
  checkin_price: string;
  is_free: boolean;
};

const defaultFormState: FormState = {
  title: "",
  time_range: "",
  description: "",
  tag: "",
  checkin_price: "0",
  is_free: true,
};

function toFormState(option?: CheckInOption | null): FormState {
  if (!option) return defaultFormState;

  return {
    title: option.title,
    time_range: option.timeRange,
    description: option.description === "-" ? "" : option.description,
    tag: option.tag,
    checkin_price: String(option.checkinPrice),
    is_free: option.isFree,
  };
}

export default function CheckInOptionFormModal({
  open,
  mode,
  initialValue,
  saving,
  onClose,
  onSubmit,
}: Props) {
  const [form, setForm] = useState<FormState>(defaultFormState);

  useEffect(() => {
    if (!open) return;
    setForm(toFormState(initialValue));
  }, [open, initialValue]);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({
      title: form.title.trim(),
      time_range: form.time_range.trim(),
      description: form.description.trim() || null,
      tag: form.tag.trim(),
      checkin_price: form.is_free ? 0 : Number(form.checkin_price),
      is_free: form.is_free,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="w-full max-w-xl rounded-xl border border-[#3A1A22] bg-[#241217] p-5">
        <h2 className="text-xl font-semibold text-[#F5DEB3]">
          {mode === "create" ? "Add Check-in Option" : "Update Check-in Option"}
        </h2>

        <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="text-sm text-[#F5DEB3]/80">
              Title
              <input
                required
                value={form.title}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, title: e.target.value }))
                }
                className="mt-1 w-full rounded-md border border-[#3A1A22] bg-[#1A0F12] px-3 py-2 text-[#F5DEB3] outline-none focus:border-[#D4AF37]"
              />
            </label>

            <label className="text-sm text-[#F5DEB3]/80">
              Time Range
              <input
                required
                value={form.time_range}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, time_range: e.target.value }))
                }
                placeholder="6AM - 9AM"
                className="mt-1 w-full rounded-md border border-[#3A1A22] bg-[#1A0F12] px-3 py-2 text-[#F5DEB3] outline-none focus:border-[#D4AF37]"
              />
            </label>
          </div>

          <label className="block text-sm text-[#F5DEB3]/80">
            Tag
            <input
              required
              value={form.tag}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, tag: e.target.value }))
              }
              className="mt-1 w-full rounded-md border border-[#3A1A22] bg-[#1A0F12] px-3 py-2 text-[#F5DEB3] outline-none focus:border-[#D4AF37]"
            />
          </label>

          <label className="block text-sm text-[#F5DEB3]/80">
            Description
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, description: e.target.value }))
              }
              className="mt-1 w-full resize-none rounded-md border border-[#3A1A22] bg-[#1A0F12] px-3 py-2 text-[#F5DEB3] outline-none focus:border-[#D4AF37]"
            />
          </label>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="text-sm text-[#F5DEB3]/80">
              Price
              <input
                type="number"
                min="0"
                disabled={form.is_free}
                required={!form.is_free}
                value={form.checkin_price}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    checkin_price: e.target.value,
                  }))
                }
                className="mt-1 w-full rounded-md border border-[#3A1A22] bg-[#1A0F12] px-3 py-2 text-[#F5DEB3] outline-none disabled:opacity-50 focus:border-[#D4AF37]"
              />
            </label>

            <label className="mt-6 flex items-center gap-2 text-sm text-[#F5DEB3]/80">
              <input
                type="checkbox"
                checked={form.is_free}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, is_free: e.target.checked }))
                }
              />
              Free check-in option
            </label>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-[#3A1A22] px-4 py-2 text-sm text-[#F5DEB3]/80 hover:bg-white/5"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-md bg-[#D4AF37] px-4 py-2 text-sm font-medium text-[#241217] hover:opacity-90 disabled:opacity-60"
            >
              {saving
                ? "Saving..."
                : mode === "create"
                  ? "Add Option"
                  : "Update Option"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
