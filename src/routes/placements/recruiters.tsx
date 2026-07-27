import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/placements/recruiters")({
  component: RecruitersRedirect,
});

function RecruitersRedirect() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate({ to: "/placements", replace: true });
  }, [navigate]);

  return null;
}
