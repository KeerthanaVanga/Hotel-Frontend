import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CalendarCheck } from "lucide-react";

import EmptyState from "../components/ui/EmptyState";
import CheckInOptionsTable from "../components/checkin-options/CheckInOptionsTable";
import CheckInOptionsPageSkeleton from "../components/checkin-options/CheckInOptionsPageSkeleton";
import CheckInOptionFormModal from "../components/checkin-options/CheckInOptionFormModal";
import ConfirmModal from "../components/ui/ConfirmModel";
import {
  createCheckInOption,
  deleteCheckInOption,
  getCheckInOptions,
  updateCheckInOption,
} from "../api/checkin-options.api";
import { useToast } from "../components/layout/ToastProvider";
import type {
  CheckInOption,
  CheckInOptionPayload,
} from "../types/CheckInOption";

type FormMode = "create" | "edit";

export default function CheckInOptionsPage() {
  const qc = useQueryClient();
  const { showToast } = useToast();

  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<FormMode>("create");
  const [selectedOption, setSelectedOption] = useState<CheckInOption | null>(
    null,
  );
  const [deleteTarget, setDeleteTarget] = useState<CheckInOption | null>(null);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["checkin-options"],
    queryFn: getCheckInOptions,
  });

  const createMutation = useMutation({
    mutationFn: (payload: CheckInOptionPayload) => createCheckInOption(payload),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["checkin-options"] });
      showToast("success", "Check-in option added successfully");
      setFormOpen(false);
    },
    onError: (err) => {
      showToast("error", (err as Error).message || "Failed to add option");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: CheckInOptionPayload;
    }) => updateCheckInOption(id, payload),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["checkin-options"] });
      showToast("success", "Check-in option updated successfully");
      setFormOpen(false);
      setSelectedOption(null);
      setProcessingId(null);
    },
    onError: (err) => {
      showToast("error", (err as Error).message || "Failed to update option");
      setProcessingId(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteCheckInOption(id),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["checkin-options"] });
      showToast("success", "Check-in option deleted successfully");
      setDeleteTarget(null);
      setProcessingId(null);
    },
    onError: (err) => {
      showToast("error", (err as Error).message || "Failed to delete option");
      setProcessingId(null);
    },
  });

  const handleSubmitForm = (payload: CheckInOptionPayload) => {
    if (formMode === "create") {
      createMutation.mutate(payload);
      return;
    }

    if (!selectedOption) return;

    setProcessingId(selectedOption.id);
    updateMutation.mutate({ id: selectedOption.id, payload });
  };

  if (isLoading) {
    return <CheckInOptionsPageSkeleton />;
  }

  if (isError) {
    return (
      <section className="space-y-6">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-2xl font-serif text-[#F5DEB3]">
            Check-in Options
          </h1>
          <button
            className="rounded-lg bg-[#D4AF37] px-4 py-2 text-sm font-medium text-[#241217] hover:opacity-90"
            onClick={() => {
              setFormMode("create");
              setSelectedOption(null);
              setFormOpen(true);
            }}
          >
            Add Option
          </button>
        </div>
        <p className="text-red-400">
          {(error as Error)?.message || "Failed to load check-in options"}
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-serif text-[#F5DEB3]">Check-in Options</h1>
        <button
          className="rounded-lg bg-[#D4AF37] px-4 py-2 text-sm font-medium text-[#241217] hover:opacity-90"
          onClick={() => {
            setFormMode("create");
            setSelectedOption(null);
            setFormOpen(true);
          }}
        >
          Add Option
        </button>
      </div>

      {data.length === 0 ? (
        <div className="rounded-xl border border-[#3A1A22] bg-linear-to-b from-[#241217] to-[#1F1216] p-6">
          <EmptyState
            title="No check-in options"
            description="Add check-in options to start offering early check-ins."
            icon={<CalendarCheck className="h-8 w-8 text-[#D4AF37]" />}
          />
        </div>
      ) : (
        <CheckInOptionsTable
          options={data}
          processingId={processingId}
          onEdit={(option) => {
            setFormMode("edit");
            setSelectedOption(option);
            setFormOpen(true);
          }}
          onDelete={(option) => {
            setDeleteTarget(option);
          }}
        />
      )}

      <CheckInOptionFormModal
        open={formOpen}
        mode={formMode}
        initialValue={selectedOption}
        saving={createMutation.isPending || updateMutation.isPending}
        onClose={() => {
          if (createMutation.isPending || updateMutation.isPending) return;
          setFormOpen(false);
        }}
        onSubmit={handleSubmitForm}
      />

      <ConfirmModal
        open={Boolean(deleteTarget)}
        title="Delete Check-in Option?"
        description={
          deleteTarget
            ? `This will permanently delete ${deleteTarget.title}.`
            : "This will permanently delete this check-in option."
        }
        confirmText={deleteMutation.isPending ? "Deleting..." : "Delete"}
        cancelText="Cancel"
        destructive
        onCancel={() => {
          if (deleteMutation.isPending) return;
          setDeleteTarget(null);
        }}
        onConfirm={() => {
          if (!deleteTarget) return;
          setProcessingId(deleteTarget.id);
          deleteMutation.mutate(deleteTarget.id);
        }}
      />
    </section>
  );
}
