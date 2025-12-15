import { ManagerRole, UserStatus } from '@/interfaces/type';
import { model, Schema, Document } from 'mongoose';

export interface IManager extends Document {
  name: {
    firstname: string;
    lastname: string;
    fullname?: string;
  };
  email: string;
  password: string;
  avatar?: string;
  language?: string;
  country?: string;
  isVerified: boolean;
  role: string;
  status: string;
  confirmationCode: string;
}

const managerSchema = new Schema<IManager>(
  {
    name: {
      firstname: { type: String },
      lastname: { type: String },
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String },
    language: { type: String, default: 'en' },
    country: { type: String, default: 'Nigeria' },
    isVerified: { type: Boolean, default: false },
    role: {
      type: String,
      enum: Object.values(ManagerRole),
      default: ManagerRole.MANAGER,
    },
    status: {
      type: String,
      enum: Object.values(UserStatus),
      default: UserStatus.PENDING,
    },
    confirmationCode: { type: String },
  },
  { timestamps: true }
);

managerSchema.virtual('name.fullname').get(function (this: IManager) {
  return this.name.firstname && this.name.lastname
    ? `${this.name.firstname} ${this.name.lastname}`
    : undefined;
});

managerSchema.set('toJSON', { virtuals: true });
managerSchema.set('toObject', { virtuals: true });

const Managers = model<IManager>('Manager', managerSchema);

export default Managers;
