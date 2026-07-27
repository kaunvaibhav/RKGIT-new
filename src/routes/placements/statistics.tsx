import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/placements/statistics")({
  component: StatisticsRedirect,
});

function StatisticsRedirect() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate({ to: "/placements", replace: true });
  }, [navigate]);

  return null;
}
