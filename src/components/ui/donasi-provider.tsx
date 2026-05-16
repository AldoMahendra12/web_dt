"use client";

import { createContext, useContext, useState, useCallback } from "react";
import DonasiDialog from "@/components/ui/donasi-dialog";

/* =========================================
   DonasiProvider — Context for donation
   dialog. Wraps the app so any "Donasi
   Sekarang" button can trigger the popup.
   ========================================= */

interface DonasiContextType {
  openDonasi: () => void;
}

const DonasiContext = createContext<DonasiContextType>({
  openDonasi: () => {},
});

export function useDonasiDialog() {
  return useContext(DonasiContext);
}

export default function DonasiProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  const openDonasi = useCallback(() => setOpen(true), []);
  const closeDonasi = useCallback(() => setOpen(false), []);

  return (
    <DonasiContext.Provider value={{ openDonasi }}>
      {children}
      <DonasiDialog open={open} onClose={closeDonasi} />
    </DonasiContext.Provider>
  );
}
