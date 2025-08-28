'use client';
import InquiryStatusPage from "@/components/InquiryStatusPage";

export default function DispatchPage() {
  return <InquiryStatusPage title="Dispatched" statuses={["Dispatched"]} showInvoiceColumn={true}/>;
}
