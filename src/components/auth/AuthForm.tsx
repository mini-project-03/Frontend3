import React, { useState, useCallback, useEffect } from 'react';
import BaseInput from '../common/BaseInput';
import { validateField, validateForm } from '@/utils/AuthFormValidation';

type Field = {
  id: string;
  label: string;
  type?: string;
};

type AuthFormProps = {
  title: string;
  fields: Field[];
  buttonText: string;
  onSubmit: (formData: Record<string, string>) => void;
  bottomText?: React.ReactNode;
};

const AuthForm = ({ title, fields, buttonText, onSubmit, bottomText }: AuthFormProps) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = useCallback((id: string, value: string) => {
    setFormData((prev) => {
      const updated = { ...prev, [id]: value };
      const errorMsg = validateField(id, value);
      setErrors((prevErrors) => ({ ...prevErrors, [id]: errorMsg }));

      const { isValid } = validateForm(updated);
      setIsFormValid(isValid);

      return updated;
    });
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const { isValid, errors } = validateForm(formData);
      setErrors(errors);
      if (isValid) {
        onSubmit(formData);
      }
    },
    [formData, onSubmit],
  );

  useEffect(() => {
    const { isValid } = validateForm(formData);
    setIsFormValid(isValid);
  }, [formData]);

  return (
    <div className="md:w-1/2 md:pl-12 flex flex-col justify-center w-full">
      <div className="bg-item-background text-white rounded-lg shadow-md w-full max-w-md p-2 md:p-4">
        <h2 className="text-md font-semibold mb-6 text-left">{title}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field) => (
            <BaseInput
              key={field.id}
              id={field.id}
              label={field.label}
              type={field.type}
              value={formData[field.id] || ''}
              onChange={handleChange}
              error={errors[field.id]}
            />
          ))}
          <button
            type="submit"
            className={`w-full py-2 rounded-3xl font-semibold mt-4 text-white ${
              isFormValid ? 'bg-login-btn hover:bg-indigo-500' : 'bg-gray-500 cursor-not-allowed'
            }`}
            disabled={!isFormValid}
          >
            {buttonText}
          </button>

          {bottomText && <p className="text-sm mt-4 text-center text-white">{bottomText}</p>}
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
