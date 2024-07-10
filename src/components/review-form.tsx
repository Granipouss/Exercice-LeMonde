import { SubmitHandler, useForm } from 'react-hook-form';
import { useSendReview } from '../api/reviews';
import { useState } from 'react';

type Values = {
  rating: number;
  comment: string;
};

let uid = 0;

export const ReviewForm: React.FC<{ filmId: string }> = ({ filmId }) => {
  const { mutate: sendReview } = useSendReview();

  const [formId] = useState(`reviewForm${++uid}`);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>();

  const onSubmit: SubmitHandler<Values> = (data) => {
    sendReview({
      filmId,
      ...data,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} id={formId}>
      <label htmlFor={formId + 'Rating'}>Rating</label>
      <select
        {...register('rating', { required: 'This field is required' })}
        id={formId + 'Rating'}
      >
        {[1, 2, 3, 4, 5].map((rating) => (
          <option key={rating}>{rating}</option>
        ))}
      </select>
      {errors.rating && <span>{errors.rating.message}</span>}

      <br />

      <label htmlFor={formId + 'Comment'}>Comment</label>
      <textarea
        {...register('comment', {
          required: 'This field is required',
          minLength: { value: 5, message: 'The comment is too short' },
        })}
        id={formId + 'Comment'}
      />
      {errors.comment && <span>{errors.comment.message}</span>}

      <br />

      <input type="submit" />

      {errors.root && <span>{errors.root.message}</span>}
    </form>
  );
};
