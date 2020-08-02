import { Expose, Type } from 'class-transformer';

import { CommentDto } from '../../dtos/comment.dto';
import { Subscription } from '../../subscription/subscription.entity';

export class SubscriptionDto {

  constructor(partial: Partial<Subscription | SubscriptionDto>) {
    Object.assign(this, partial);
  }

  @Expose()
  id: number;

  @Expose()
  @Type(() => CommentDto)
  comment: CommentDto;

  @Expose({ name: 'date' })
  created: Date;

}
