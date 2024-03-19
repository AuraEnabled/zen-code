import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from '../../entities/comment.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/createComment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
  ) {}

  public async createComment(
    createCommentDto: CreateCommentDto,
    currentUserId: number,
  ): Promise<CommentEntity> {
    const comment = new CommentEntity();
    Object.assign(comment, createCommentDto);
    comment.authorId = currentUserId;
    return this.commentRepository.save(comment);
  }
}
