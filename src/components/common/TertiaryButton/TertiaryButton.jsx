import { ChevronTopDropdown, ChevronDownDropdown } from '@/components/icons';

import './TertiaryButton.scss';

export default function TertiaryButton({ children, isOpen, handleClick, disabled }) {
  return (
    <button type="button" className="tertiary-button" onClick={handleClick} disabled={disabled}>
      {children}

      {isOpen ? (
        <ChevronTopDropdown className="tertiary-button__icon" />
      ) : (
        <ChevronDownDropdown className="tertiary-button__icon" />
      )}
    </button>
  );
}
