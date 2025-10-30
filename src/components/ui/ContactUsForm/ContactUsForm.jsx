'use client';

import { useEffect, useRef } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import {
  DropdownInputForm,
  InputGeneral,
  PrimaryButton,
  TextareaGeneral,
} from '@/components/common';

import { submitToGAS } from '@/lib/submitToGAS';

import { contactUsFormSchema } from '@/validationSchemas/contactUsFormSchema';
import { inputsListData, inquiryList } from '@/data/contactUsForm';

import './ContactUsForm.scss';

const initialFormState = {
  first_name: '',
  last_name: '',
  email: '',
  phone_number: '',
  position: '',
  inquiry: '',
  message: '',
};

export default function ContactUsForm() {
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
    control,
    formState: { errors },
  } = useForm({
    defaultValues: initialFormState,
    resolver: joiResolver(contactUsFormSchema),
    mode: 'onTouched',
  });

  async function onSubmit(values) {
    const mapped = {
      firstName: values.first_name,
      lastName: values.last_name,
      email: values.email,
      phone: values.phone_number,
      position: values.position,
      inquiry: values.inquiry,
      message: values.message,
    };

    const payload = {
      formType: 'contact',
      issuedAt: issuedAtRef.current,
      formData: mapped,
    };

    const { ok, status, data } = await submitToGAS(payload);
    if (ok) {
      alert('Thank you! We will contact you soon.');
      reset();
    } else {
      alert('Sending error (' + status + '): ' + (data?.error || 'Try later'));
    }
  }

  return (
    <form className="contact-us-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="contact-us-form__inputs-wrapper">
        {inputsListData.map(({ label, name, placeholder }) => {
          return (
            <InputGeneral
              key={name}
              label={label}
              name={name}
              placeholder={placeholder}
              errors={errors}
              {...register(name)}
            />
          );
        })}

        <Controller
          name="inquiry"
          control={control}
          render={({ field, fieldState }) => (
            <DropdownInputForm
              label="Inquiry"
              placeholder="Select an inquiry"
              dropdownList={inquiryList}
              value={field.value}
              onChange={value => field.onChange(value)}
              onBlur={field.onBlur}
              name={field.name}
              error={fieldState.error}
            />
          )}
        />
      </div>

      <TextareaGeneral
        label="Meassage"
        name="message"
        placeholder="Enter your message"
        errors={errors}
        {...register('message')}
      />

      <PrimaryButton type="submit" additionalClass="contact-us-form__submit-btn">
        Submit
      </PrimaryButton>
    </form>
  );
}
