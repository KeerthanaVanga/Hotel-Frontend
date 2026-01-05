import type { ReactNode } from "react";

export default function ScrollableContainer({
  children,
  maxHeight = "460px",
}: {
  children: ReactNode;
  maxHeight?: string;
}) {
  return (
    <div className="overflow-y-auto pr-2" style={{ maxHeight }}>
      {children}
    </div>
  );
}
