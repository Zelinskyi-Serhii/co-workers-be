import { Review } from './review.entity';

export const reviewProvider = [
  {
    provide: 'REVIEW_REPOSITORY',
    useValue: Review,
  },
];
