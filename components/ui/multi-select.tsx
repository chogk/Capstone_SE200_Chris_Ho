"use client";

interface MultiSelectProps {
  name: string;
  options: { label: string; value: string }[];
}

export default function MultiSelect({ name, options }: MultiSelectProps) {
  return (
    <select
      name={name}
      multiple
      className="w-full h-40 border rounded px-2 py-1"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
