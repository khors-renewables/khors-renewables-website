"use client";

import type { ReactNode } from "react";
import { useConsultation } from "./ConsultationContext";

type Props = {
  className?: string;
  children: ReactNode;
};

export default function ConsultationButton({ className, children }: Props) {
  const { open } = useConsultation();

  return (
    <button type="button" onClick={open} className={className}>
      {children}
    </button>
  );
}
