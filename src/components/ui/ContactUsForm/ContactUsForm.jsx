'use client';

import { Controller, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import {
  DropdownInputForm,
  InputGeneral,
  PrimaryButton,
  TextareaGeneral,
} from '@/components/common';

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

  const onSubmit = data => {
    console.log('form:', data);
    reset();
  };

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
