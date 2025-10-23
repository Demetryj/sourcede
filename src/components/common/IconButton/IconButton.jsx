import clsx from 'clsx';

import './IconButton.scss';

export default function IconButton({
  icon: Icon,
  additionalClass = '',
  handleClick,
  disabled,
  ...props
}) {
  return (
    <button
      type="button"
      className={clsx('icon-button', additionalClass && additionalClass)}
      onClick={handleClick}
      disabled={disabled}
      {...props}
    >
      <Icon className="icon-button__icon" />
    </button>
  );
}
