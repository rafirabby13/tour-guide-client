"use client";

import { Toaster } from "../ui/sonner";


// Change 'export default' to just 'export'
export function ToasterProviders() {
  return <Toaster position="top-right" richColors />;
}