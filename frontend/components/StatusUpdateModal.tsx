import StatusBadge from "./StatusBadge";

export const typeOptions = [
  "Loose",
  "In Jewellery",
  "Certified",
  "Natural",
];

export const availabilityOptions = [
  "Pending",
  "Hold",
  "Not Available",
  "On Memo",
  "Confirmed - TOH",
  "Hold - TOH",
  "Release",
  "Added to Stock",
  "In Exhibition",
  "Dispatched",
];

export const paymentOptions = [
  "RCVD",
  "Pending",
  "APRVd",
  "HALF RCVD",
  "Transfer SS Sent",
  "Null",
];

export const qcRemarkOptions = [
  "OK",
  "BLUE TINGE",
  "OTHER TINGE",
  "CULET BROKEN",
  "OTHER ISSUE",
  "NO BGM",
  "Null",
];

export const statusOfStoneOptions = [
  "Stone - OH",
  "Cert - OH",
  "Pending",
  "S & C BOTH - ON",
  "Mumbai Hold - Ready to Dispatch",
  "Tomorrow",
  "On the Way",
  "HK Office",
  "Null",
];

export const otRemarkOptions = [
  "Available",
  "Not Available",
  "Released",
  "Sent to Vndr.",
  "Fr Other",
  "Released, Sta",
  "Own HK",
  "Own India",
  "Surat",
  "Mumbai",
  "Null",
];

export const locationOptions = [
  "Surat",
  "Mumbai",
  "Hongkong",
  "USA",
  "Other",
  "Null",
];

// Generic dropdown component for table cells
export function StatusDropdown({
  options,
  value,
  onChange,
  open,
  setOpen,
  id,
  colKey,
}: {
  options: string[];
  value: string;
  onChange: (val: string) => void;
  open: string | number | null;
  setOpen: (val: string | number | null) => void;
  id: string | number;
  colKey: string;
}) {
  return (
    <>
      <span
        style={{ cursor: "pointer", display: "inline-block" }}
        onClick={() => setOpen(open === `${colKey}-${id}` ? null : `${colKey}-${id}`)}
      >
        <StatusBadge status={value} />
      </span>
      {open === `${colKey}-${id}` && (
        <div
          className="absolute z-10 bg-gray-50 border border-gray-300 shadow-md mt-2 left-1/2 -translate-x-1/2 min-w-[160px] text-left"
          style={{ minWidth: 160 }}
        >
          {options.map((option) => (
            <div
              key={option}
              className="p-2 pl-2 hover:bg-gray-100 cursor-pointer flex items-center"
              onClick={() => {
                onChange(option);
                setOpen(null);
              }}
            >
              <StatusBadge status={option} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}