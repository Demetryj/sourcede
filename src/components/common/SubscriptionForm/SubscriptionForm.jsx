'use client';

import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { toast } from 'react-toastify';
import clsx from 'clsx';

import { PrimaryButton, SecondaryButton } from '@/components/common';

import { submitToGAS } from '@/lib/submitToGAS';

import { subscribeFormSchema } from '@/validationSchemas/subscribeFormSchema';

import './SubscriptionForm.scss';

export default function SubscriptionForm({ primary, id, footerForm }) {
  const issuedAtRef = useRef(0);

  /**Set the time for antispam checking
   * must be ≥ 4 sec и ≤ 2 h
   */
  useEffect(() => {
    issuedAtRef.current = Date.now();
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { email: '' },
    resolver: joiResolver(subscribeFormSchema),
    mode: 'onTouched',
  });

  const onSubmit = async values => {
    const payload = {
      formType: 'newsletter',
      issuedAt: issuedAtRef.current,
      formData: values,
    };

    try {
      const { ok, status, data } = await submitToGAS(payload);

      if (ok) {
        toast.success('Thank you! We will contact you soon.');
        reset();
      } else {
        toast.error('Sending error.Try again later.');
        console.warn(status, data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      //
    }
  };

  return (
    <form className="subscription-form" onSubmit={handleSubmit(onSubmit)}>
      <input
        id={id}
        name="email"
        type="text"
        placeholder="Enter your email"
        autoComplete="off"
        className={clsx(
          'subscription-form__input',
          errors.email && 'error',
          footerForm && 'footer-form'
        )}
        {...register('email')}
      />

      {primary ? (
        <PrimaryButton
          type="submit"
          additionalClass="subscription-form__submit-btn primary"
          disabled={errors.email}
          isSubmitting={isSubmitting}
        >
          Subscribe
        </PrimaryButton>
      ) : (
        <SecondaryButton
          type="submit"
          additionalClass="subscription-form__submit-btn"
          isSubmitting={isSubmitting}
        >
          Subscribe
        </SecondaryButton>
      )}
    </form>
  );
}
