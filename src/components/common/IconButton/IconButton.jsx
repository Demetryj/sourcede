import clsx from 'clsx';

import './IconButton.scss';

export default function IconButton({ icon: Icon, additionalClass = '', handleClick, disabled }) {
  return (
    <button
      type="button"
      className={clsx('icon-button', additionalClass && additionalClass)}
      onClick={handleClick}
      disabled={disabled}
    >
      <Icon className="icon-button__icon" />
    </button>
  );
}
