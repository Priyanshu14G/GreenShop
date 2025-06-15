const PackagingToggle = ({ value, onChange }) => (
  <div role="group" aria-label="Packaging choice" className="flex gap-2">
    <label
      className={`px-3 py-2 rounded border cursor-pointer ${value ? "bg-green-700 text-white border-green-700 font-bold" : "bg-white border-gray-400 dark:bg-neutral-800"}`}
    >
      <input
        type="radio"
        name="packaging"
        checked={value}
        onChange={() => onChange(true)}
        className="sr-only"
        aria-checked={value}
      />
      Eco
    </label>
    <label
      className={`px-3 py-2 rounded border cursor-pointer ${!value ? "bg-gray-300 text-gray-800 border-gray-600 font-bold" : "bg-white border-gray-400 dark:bg-neutral-800"}`}
    >
      <input
        type="radio"
        name="packaging"
        checked={!value}
        onChange={() => onChange(false)}
        className="sr-only"
        aria-checked={!value}
      />
      Default
    </label>
  </div>
);

export default PackagingToggle;