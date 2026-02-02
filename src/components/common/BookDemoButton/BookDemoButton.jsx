'use client';

import { PrimaryButton } from '@/components/common';

import TemporaryTooltip from '../TemporaryTooltip/TemporaryTooltip';

export default function BookDemoButton({ additionalClass, fullWidth }) {
  // Tooltip added temporarily until there is a link to the Platform

  return (
    <TemporaryTooltip fullWidth={fullWidth}>
      <PrimaryButton
        // href="#"
        withIcon
        additionalClass={additionalClass}
        type="button"
      >
        Book a Demo
      </PrimaryButton>
    </TemporaryTooltip>
  );
}
