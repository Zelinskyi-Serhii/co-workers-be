import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto, ReviewDto } from './dto/create-review.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('review')
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @ApiResponse({ status: 200, description: 'Review added successfully' })
  @Post('create')
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewService.create(createReviewDto);
  }

  @ApiResponse({ status: 200, type: [ReviewDto] })
  @Get('getAll/:employeeId')
  findAll(@Param('employeeId') employeeId: number) {
    return this.reviewService.findAll(employeeId);
  }
}
