import './AuthInput.css';
import { AuthInputProps } from '../../types';

function AuthInput({
  name,
  type,
  placeholder,
  required,
  error,
  value,
  onChange,
  ...rest
}: AuthInputProps) {
  return (
    <label className="auth-form__label">
      {placeholder}
      <input
        className="auth-form__input"
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        {...rest}
      />
      {error && <span className="auth-form__input-error">{error}</span>}
    </label>
  );
}

export default AuthInput;
