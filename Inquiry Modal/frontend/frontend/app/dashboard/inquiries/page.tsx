'use client';
import { Suspense } from "react";
import InquiriesPageClient from "./InquiriesPageClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <InquiriesPageClient />
    </Suspense>
  );
}
