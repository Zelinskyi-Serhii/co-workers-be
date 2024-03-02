import { Inject, Injectable } from '@nestjs/common';
import { Review } from './review.entity';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewService {
  constructor(
    @Inject('REVIEW_REPOSITORY')
    private reviewRepository: typeof Review,
  ) {}

  create(review: CreateReviewDto) {
    return this.reviewRepository.create(review, {
      fields: ['id', 'employeeId', 'review'],
    });
  }

  findAll(employeeId: number) {
    return this.reviewRepository.findAll({ where: { employeeId } });
  }
}
