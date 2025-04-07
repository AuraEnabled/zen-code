import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../guards/auth.guard';
import { CreateCommentDto } from './dto/createComment.dto';
import { User } from '../../decorators/user.decorator';
import { CommentService } from './comment.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Comments')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiBody({ type: CreateCommentDto })
  @ApiOperation({ summary: 'Publish a comment' })
  async publishComment(
    @User('id') currentUserId: number,
    @Body('comment') createCommentDto: CreateCommentDto,
  ): Promise<any> {
    return this.commentService.createComment(createCommentDto, currentUserId);
  }
}
