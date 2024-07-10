import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from './client';

export type Review = {
  id: string;
  rating: number;
  comment: string;
  filmId: string;
};

export type SendReviewDTO = {
  rating: number;
  comment: string;
  filmId: string;
};

// TODO: Test fake DB
const DB: Review[] = [];

const getReview = async (filmId: string) => {
  return DB.filter((review) => review.filmId === filmId);
};

const sendReview = async (dto: SendReviewDTO) => {
  DB.push({
    id: crypto.randomUUID(),
    ...dto,
  });
};

export const useReviews = (filmId: string) =>
  useQuery({
    queryKey: ['reviews', filmId],
    queryFn: () => getReview(filmId),
  });

export const useSendReview = () =>
  useMutation({
    mutationFn: sendReview,
    onSuccess(_data, dto) {
      queryClient.invalidateQueries({ queryKey: ['reviews', dto.filmId] });
    },
  });
