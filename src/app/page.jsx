'use client';

import { useEffect } from 'react';

import {
  PrimaryButton,
  SecondaryButton,
  TertiaryButton,
  TextButton,
  SubscriptionForm,
  InputGeneral,
} from '@/components/common';
import { HomePage } from '@/views';

export default function Home() {
  useEffect(() => {
    document.title = 'Home';
  });

  return (
    <>
      <div>
        <h2>asdasdasdad</h2>
        <p>ashdkasdkjahksjdhaksjdhaks</p>
        <TextButton>Platform</TextButton>
        <TertiaryButton>Book a Demo</TertiaryButton>
        <SecondaryButton>Book a Dem</SecondaryButton>
        <PrimaryButton withIcon>Book a Demo</PrimaryButton>
        <SubscriptionForm />
        <InputGeneral name="sdsfsdf" />
      </div>

      <HomePage />
    </>
  );
}
