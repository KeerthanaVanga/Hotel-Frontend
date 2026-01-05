import { useState } from "react";
import type {
  Payment,
  PaymentMethod,
  PaymentStatus,
} from "../../types/Payment";

interface Props {
  payment: Payment;
  onClose: () => void;
  onSave: (payment: Payment) => void;
}

export default function PaymentEditModal({
  payment,
  onClose,
  onSave,
}: Props) {
  const [form, setForm] = useState<Payment>(payment);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
      <div className="w-full max-w-lg rounded-xl border border-[#3A1A22] bg-[#241217] p-6 space-y-5">
        {/* Header */}
        <h2 className="text-lg font-serif text-[#F5DEB3]">
          Edit Payment
        </h2>

        {/* Paid Amount */}
        <Input
          label="Paid Amount"
          type="number"
          value={form.billPaid}
          onChange={(v) =>
            setForm({ ...form, billPaid: Number(v) })
          }
        />

        {/* Payment Method */}
        <Select<PaymentMethod>
          label="Payment Method"
          value={form.paymentMethod}
          options={["Cash", "Card", "UPI", "Bank Transfer"]}
          onChange={(v) =>
            setForm({ ...form, paymentMethod: v })
          }
        />

        {/* Payment Status */}
        <Select<PaymentStatus>
          label="Payment Status"
          value={form.status}
          options={["success", "failed", "pending", "partial"]}
          onChange={(v) =>
            setForm({ ...form, status: v })
          }
        />

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={onClose}
            className="text-sm text-[#F5DEB3]/70 hover:text-[#F5DEB3]"
          >
            Cancel
          </button>

          <button
            onClick={() => onSave(form)}
            className="
              rounded-md bg-[#D4AF37] px-5 py-2
              text-sm font-semibold text-[#1B0F12]
              hover:bg-[#E5C453]
            "
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Reusable Typed Inputs                                               */
/* ------------------------------------------------------------------ */

interface InputProps {
  label: string;
  value: string | number;
  type?: "text" | "number";
  onChange: (value: string) => void;
}

function Input({
  label,
  value,
  type = "text",
  onChange,
}: InputProps) {
  return (
    <div>
      <label className="block mb-1 text-sm text-[#F5DEB3]">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full rounded-md border border-[#3A1A22]
          bg-[#1F1216] px-3 py-2
          text-[#F5DEB3]
          focus:border-[#D4AF37] focus:outline-none
        "
      />
    </div>
  );
}

interface SelectProps<T extends string> {
  label: string;
  value: T;
  options: readonly T[];
  onChange: (value: T) => void;
}

function Select<T extends string>({
  label,
  value,
  options,
  onChange,
}: SelectProps<T>) {
  return (
    <div>
      <label className="block mb-1 text-sm text-[#F5DEB3]">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="
          w-full rounded-md border border-[#3A1A22]
          bg-[#1F1216] px-3 py-2
          text-[#F5DEB3]
          focus:border-[#D4AF37] focus:outline-none
        "
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
