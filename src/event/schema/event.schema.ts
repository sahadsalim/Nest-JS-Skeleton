import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { CreatePlayerDto } from 'src/player/dto/create-player.dto';
import { EventPlayerDto } from '../dto/event-player.dto';

export type EventDocument = HydratedDocument<Event>;

@Schema()
export class Event {
  @Prop({ required: true })
  name: string;

  @Prop()
  id: number;

  @Prop()
  image: string;
  @Prop()
  date: Date;
  @Prop()
  place: string;

  @Prop()
  players:EventPlayerDto[];
}

export const EventSchema = SchemaFactory.createForClass(Event);