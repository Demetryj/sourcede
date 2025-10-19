import './InputGeneral.scss';

export default function InputGeneral({
  label = 'Some label *',
  type = 'text',
  name,
  placeholder = '',
  disabled,
  ...props
}) {
  return (
    <div className="input-general">
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
        className="input-general__field"
        {...props}
      />
    </div>
  );
}
