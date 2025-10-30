'use client';

import clsx from 'clsx';

import './InputGeneral.scss';

export default function InputGeneral({
  label,
  type = 'text',
  name,
  placeholder = '',
  disabled,
  errors,
  additionalClass = '',
  ...props
}) {
  const hasError = errors && errors[name]?.message;

  return (
    <div className={clsx('input-general', additionalClass && additionalClass)}>
      {label && (
        <label htmlFor={name} className="input-general__label">
          {label}
        </label>
      )}

      <input
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        autoComplete="off"
        disabled={disabled}
        className={clsx('input-general__field', hasError && 'error')}
        {...props}
      />

      {hasError && <span className="input-general__error-message">{errors[name]?.message}</span>}
    </div>
  );
}
