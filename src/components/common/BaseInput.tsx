type BaseInputProps = {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (id: string, value: string) => void;
  error?: string;
};

const BaseInput = ({ id, label, type = 'text', value, onChange, error }: BaseInputProps) => {
  return (
    <div>
      <label htmlFor={id} className="block mb-1 text-sm font-medium text-white">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(id, e.target.value)}
        className={`w-full px-4 py-2 rounded-3xl bg-gray-800 border ${
          error ? 'border-red-500' : 'border-gray-600'
        } text-white focus:outline-none`}
      />
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default BaseInput;
