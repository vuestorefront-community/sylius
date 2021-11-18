import { ReviewGetters, AgnosticRateCount } from '@vue-storefront/core';
import { parse as parseDate, format as formatDate } from 'date-fns';
type Review = any;
type ReviewItem = any;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getItems = (review: Review): ReviewItem[] => review.filter(r => r.status === 'accepted');

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getReviewId = (item: ReviewItem): string => item.id;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getReviewAuthor = (item: ReviewItem): string => item.author.fullName;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getReviewMessage = (item: ReviewItem): string => item.comment;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getReviewRating = (item: ReviewItem): number => item.rating;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getReviewDate = (item: ReviewItem): string => {
  const parsedDate = parseDate(item.createdAt, 'yyyy-MM-dd\'T\'HH:mm:ssxxx', new Date());
  return formatDate(parsedDate, 'dd.MM.yyyy');
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getTotalReviews = (review: Review): number => review.filter(r => r.status === 'accepted').length;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getAverageRating = (review: Review): number => 0;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getRatesCount = (review: Review): AgnosticRateCount[] => [];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getReviewsPage = (review: Review): number => 1;

export const reviewGetters: ReviewGetters<Review, ReviewItem> = {
  getItems,
  getReviewId,
  getReviewAuthor,
  getReviewMessage,
  getReviewRating,
  getReviewDate,
  getTotalReviews,
  getAverageRating,
  getRatesCount,
  getReviewsPage
};
