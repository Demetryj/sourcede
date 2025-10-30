'use client';

import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import { InputGeneral, PrimaryButton, TextareaGeneral } from '@/components/common';

import { discussionFormSchema } from '@/validationSchemas/discussionFormSchema';

import './DiscussionForm.scss';

const initialFormState = { name: '', response: '' };

export default function DiscussionForm() {
  const {
    register,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm({
    defaultValues: initialFormState,
    resolver: joiResolver(discussionFormSchema),
    mode: 'onTouched',
  });

  const onSubmit = data => {
    const comment = { name: data?.name ? data?.name : 'Anonymous', response: data?.response };

    console.log('descussion form:', comment);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="discussion-form">
      <InputGeneral
        label="Name"
        name="name"
        placeholder="Enter your name"
        errors={errors}
        {...register('name')}
        additionalClass="discussion-form__input"
      />

      <TextareaGeneral
        label="Response"
        name="response"
        placeholder="Write your thoughts about topic"
        errors={errors}
        {...register('response')}
      />

      <PrimaryButton type="submit">Post Response</PrimaryButton>
    </form>
  );
}
