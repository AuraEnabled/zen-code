import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from '../../entities/comment.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateCommentDto } from './dto/createComment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
    private dataSource: DataSource,
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
      loadEagerRelations: true,
    });
  }

  public async getCommentsRecursive(): Promise<CommentEntity[]> {
    const comments = await this.dataSource.manager.query(`
  with recursive cte ("id", "authorId", "replyToId", "text") as (
  select     "id",
             "authorId",
             "replyToId",
             "text"
  from       "comments"
  union all
  select     p."id",
             p."authorId",
             p."replyToId",
             p."text"
  from       "comments" p
  inner join cte
          on p."replyToId" = cte.id
  )
select * from cte;
    `);

    return comments;
  }

  private async getCommentById(id: number): Promise<CommentEntity> {
    return await this.commentRepository.findOne({ where: { id } });
  }
}
