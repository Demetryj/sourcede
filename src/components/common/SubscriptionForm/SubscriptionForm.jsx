'use client';

import { PrimaryButton, SecondaryButton } from '@/components/common';

import './SubscriptionForm.scss';

export default function SubscriptionForm({ primary, name = 'subscription' }) {
  const handleSubmit = e => {
    e.preventDefault();
    console.log('Subscribe');
  };

  return (
    <form className="subscription-form" onSubmit={handleSubmit}>
      <input
        name={name}
        type="email"
        placeholder="Enter your email"
        autoComplete="off"
        className="subscription-form__input"
      />

      {primary ? (
        <PrimaryButton type="submit" additionalClass="subscription-form__submit-btn primary">
          Subscribe
        </PrimaryButton>
      ) : (
        <SecondaryButton type="submit" additionalClass="subscription-form__submit-btn">
          Subscribe
        </SecondaryButton>
      )}
    </form>
  );
}
