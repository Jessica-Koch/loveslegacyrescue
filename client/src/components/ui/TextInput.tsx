import { useId } from 'react';
import './TextInput.scss';

export interface TextInputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  required?: boolean;
  type?: React.HTMLInputTypeAttribute;
  name?: string;
  id?: string;
  autoComplete?: string;
}

export default function TextInput({
  label,
  placeholder,
  value,
  defaultValue,
  onChange,
  error,
  helperText,
  disabled = false,
  required = false,
  type = 'text',
  name,
  id: idProp,
  autoComplete,
}: TextInputProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const helperId = `${id}-helper`;
  const hasError = Boolean(error);

  return (
    <div className={`text-input${hasError ? ' text-input--error' : ''}${disabled ? ' text-input--disabled' : ''}`}>
      {label && (
        <label className="text-input__label" htmlFor={id}>
          {label}
          {required && <span className="text-input__required" aria-hidden="true"> *</span>}
        </label>
      )}
      <input
        id={id}
        name={name}
        type={type}
        className="text-input__input"
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        disabled={disabled}
        required={required}
        autoComplete={autoComplete}
        aria-describedby={error || helperText ? helperId : undefined}
        aria-invalid={hasError}
      />
      {(error || helperText) && (
        <p id={helperId} className={`text-input__helper${hasError ? ' text-input__helper--error' : ''}`}>
          {error ?? helperText}
        </p>
      )}
    </div>
  );
}
