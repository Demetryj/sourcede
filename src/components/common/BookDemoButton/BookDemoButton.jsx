import { PrimaryButton } from '@/components/common';

export default function BookDemoButton({ additionalClass }) {
  return (
    <PrimaryButton withIcon href={''} additionalClass={additionalClass}>
      Book a Demo
    </PrimaryButton>
  );
}
