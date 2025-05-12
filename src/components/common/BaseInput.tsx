type BaseInputProps = {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (id: string, value: string) => void;
};

const BaseInput = ({ id, label, type = 'text', value, onChange }: BaseInputProps) => {
  return (
    <div>
      <label htmlFor={id} className="block mb-1 text-sm text-white">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(id, e.target.value)}
        className="w-full px-4 py-2 rounded-3xl bg-transparent border border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
      />
    </div>
  );
};

export default BaseInput;
