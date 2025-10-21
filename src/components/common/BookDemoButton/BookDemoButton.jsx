import { PrimaryButton } from '@/components/common';

import './BookDemoButton.scss';

export default function BookDemoButton() {
  return (
    <PrimaryButton withIcon href={''}>
      Book a Demo
    </PrimaryButton>
  );
}
