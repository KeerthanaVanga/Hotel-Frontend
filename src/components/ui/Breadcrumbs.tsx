import { Link, useLocation } from "react-router-dom";
import { Home, ChevronRight } from "lucide-react";

const LABEL_MAP: Record<string, string> = {
  rooms: "Rooms",
  new: "Add Room",
  edit: "Edit Room",
};

export default function Breadcrumbs() {
  const location = useLocation();
  const segments = location.pathname.split("/").filter(Boolean);

  return (
    <nav
      aria-label="Breadcrumb"
      className="
        sticky top-0 z-30
        rounded-xl border border-[#3A1A22]
        bg-linear-to-r from-[#241217] via-[#1F1216] to-[#241217]
        px-6 py-4
      "
    >
      <ol className="flex flex-wrap items-center gap-2 text-sm">
        {/* Home */}
        <li>
          <Link
            to="/"
            className="
              flex items-center gap-1
              text-[#D4AF37] hover:text-[#F5DEB3]
              transition
            "
          >
            <Home size={14} />
          </Link>
        </li>

        {segments.map((segment, index) => {
          const path = "/" + segments.slice(0, index + 1).join("/");
          const isLast = index === segments.length - 1;

          const label =
            LABEL_MAP[segment] ||
            (segment.match(/^\d+$/)
              ? "Room Details"
              : segment);

          return (
            <li key={path} className="flex items-center gap-2">
              <ChevronRight
                size={14}
                className="text-[#F5DEB3]/40"
              />

              {isLast ? (
                <span className="font-medium text-[#F5DEB3]">
                  {label}
                </span>
              ) : (
                <Link
                  to={path}
                  className="
                    text-[#F5DEB3]/70
                    hover:text-[#F5DEB3]
                    transition
                  "
                >
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
