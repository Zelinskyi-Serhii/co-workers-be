import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { reviewProvider } from './review.provider';

@Module({
  controllers: [ReviewController],
  providers: [ReviewService, ...reviewProvider],
})
export class ReviewModule {}
