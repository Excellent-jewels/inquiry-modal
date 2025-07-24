'use client';
import { Listbox } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

type CustomDropdownProps = {
  label: string;
  name: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
};

export default function CustomDropdown({
  label,
  name,
  options,
  value,
  onChange,
}: CustomDropdownProps) {
  return (
    <div className="relative">
      <label htmlFor={name} className="block text-sm font-medium mb-1 capitalize">
        {label}
      </label>
      <Listbox value={value} onChange={onChange}>
        <div className="relative">
          <Listbox.Button
            name={name}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-left bg-white flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-bray-500"
          >
            <span className={value ? 'text-black' : 'text-gray-400'}>
              {value || `Select ${label}`}
            </span>
            <ChevronDownIcon className="w-5 h-5 text-gray-500 ml-2" />
          </Listbox.Button>
          <Listbox.Options className="absolute z-50 w-full max-h-60 overflow-auto rounded-md bg-white border border-gray-300 text-sm shadow-lg focus:outline-none">
            <Listbox.Option
              key=""
              value=""
              className={({ active }) =>
                `cursor-pointer px-4 py-2 bg-gray-100 ${active ? 'bg-gray-100' : ''} text-gray-600`
              }
            >
              {`Select ${label}`}
            </Listbox.Option>
            {options.map((opt) => (
              <Listbox.Option
                key={opt}
                value={opt}
                className={({ active, selected }) =>
                  `cursor-pointer px-4 py-1 ${active ? 'bg-gray-200' : 'bg-white'} ${selected ? 'font-semibold' : ''}`
                }
              >
                {opt}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
}
