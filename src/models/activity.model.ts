import { UserStatus } from '@/interfaces/type';
import { model, Schema, Document } from 'mongoose';

export interface IActivity extends Document {
  user: Schema.Types.ObjectId;
}

const activitySchema = new Schema<IActivity>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true, discriminatorKey: 'userType' }
);

const Activity = model<IActivity>('Activity', activitySchema);

export default Activity;
