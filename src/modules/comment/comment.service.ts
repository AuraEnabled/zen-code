import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    let parentComment: CommentEntity;

    if (createCommentDto.replyToId) {
      parentComment = await this.getCommentById(createCommentDto.replyToId);
    }

    if (createCommentDto.replyToId && !parentComment) {
      throw new HttpException(
        'Comment you wish to reply to does not exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    Object.assign(comment, createCommentDto);
    comment.authorId = currentUserId;
    return this.commentRepository.save(comment);
  }

  public async getComments(id: number) {
    return await this.commentRepository.findOne({
      where: { id },
      relations: ['replies'],
    });
  }

  private async getCommentById(id: number): Promise<CommentEntity> {
    return await this.commentRepository.findOne({ where: { id } });
  }
}
