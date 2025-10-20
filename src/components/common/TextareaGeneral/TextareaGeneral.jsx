'use client';

import clsx from 'clsx';

import './TextareaGeneral.scss';

export default function TextareaGeneral({
  label,
  type = 'text',
  name,
  placeholder = '',
  disabled,
  errors,
  ...props
}) {
  const hasError = errors[name]?.message;

  return (
    <div className="textarea-general">
      {label && (
        <label htmlFor={name} className="textarea-general__label">
          {label}
        </label>
      )}

      <textarea
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        autoComplete="off"
        disabled={disabled}
        className={clsx('textarea-general__field', hasError && 'error')}
        {...props}
      />

      {hasError && <span className="textarea-general__error-message">{errors[name]?.message}</span>}
    </div>
  );
}
