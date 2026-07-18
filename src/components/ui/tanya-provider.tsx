"use client";

import { createContext, useContext, useState, useCallback } from "react";
import TanyaDialog from "@/components/ui/tanya-dialog";

/* =========================================
   TanyaProvider — Context for Tanya Ustadz
   dialog. Wraps the app so any "Tanya Ustadz"
   button can trigger the popup.
   ========================================= */

interface TanyaContextType {
  openTanya: () => void;
}

const TanyaContext = createContext<TanyaContextType>({
  openTanya: () => {},
});

export function useTanyaDialog() {
  return useContext(TanyaContext);
}

export default function TanyaProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  const openTanya = useCallback(() => setOpen(true), []);
  const closeTanya = useCallback(() => setOpen(false), []);

  return (
    <TanyaContext.Provider value={{ openTanya }}>
      {children}
      <TanyaDialog open={open} onClose={closeTanya} />
    </TanyaContext.Provider>
  );
}
