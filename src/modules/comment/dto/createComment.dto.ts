import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @IsNotEmpty()
  @ApiProperty({ description: 'Comment text', nullable: false })
  readonly text: string;

  @ApiProperty({
    description: 'Comment ID you wish to reply to',
    nullable: true,
  })
  readonly replyToId: number;
}
