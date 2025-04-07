import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { CommentService } from './comment.service';
import { Server, Socket } from 'socket.io';
import { CreateCommentDto } from './dto/createComment.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class CommentGateway {
  constructor(private readonly commentService: CommentService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('createComment')
  async create(
    @MessageBody() createCommentDto: CreateCommentDto,
  ): Promise<any> {
    const comment = await this.commentService.createComment(
      createCommentDto,
      1,
    );

    this.server.emit('comment', comment);

    return comment;
  }

  @SubscribeMessage('getAllComments')
  async getAllComments() {
    return await this.commentService.getCommentsRecursive();
  }

  // @SubscribeMessage('join')
  // joinRoom(
  //   @MessageBody('name') name: string,
  //   @ConnectedSocket() client: Socket,
  // ){
  //   this.commentService.identify(name, client.id);
  // }
}
