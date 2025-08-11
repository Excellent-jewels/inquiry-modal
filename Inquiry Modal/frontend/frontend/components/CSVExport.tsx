// components/CSVExport.tsx
'use client';

import { CSVLink } from 'react-csv';

interface CSVExportProps {
  data: any[];
  filename: string;
  disabled?: boolean;
}

const CSVExport: React.FC<CSVExportProps> = ({ data, filename, disabled }) => {
  return (
    <CSVLink
      data={data}
      filename={filename}
      target="_self"
      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition text-sm"
    >
      Export CSV
    </CSVLink>
  );
};

export default CSVExport;
