import { UserSource, UserStatus } from '@/interfaces/type';
import { model, Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: {
    firstname: string;
    lastname: string;
    fullname?: string;
  };
  email: string;
  phoneNumber?: string;
  registrationDate?: Date;
  avatar?: string;
  language?: string;
  country?: string;
  accountType?: string;
  location?: {
    city: string;
    state: string;
    country: string;
  };
  businessCategory?: string;
  firstLogin?: Date;
  lastLogin?: Date;
  walletActive: boolean;
  status: string;
  source: string;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      firstname: { type: String },
      lastname: { type: String },
    },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String },
    registrationDate: { type: Date },
    avatar: { type: String },
    language: { type: String },
    country: { type: String },
    accountType: { type: String },
    location: {
      city: { type: String },
      state: { type: String },
      country: { type: String },
    },
    businessCategory: { type: String },
    firstLogin: { type: Date },
    lastLogin: { type: Date },
    walletActive: { type: Boolean, default: false },
    status: {
      type: String,
      enum: Object.values(UserStatus),
      default: UserStatus.PENDING,
    },
    source: { type: String, enum: Object.values(UserSource), required: true },
  },
  { timestamps: true }
);

userSchema.virtual('name.fullname').get(function (this: IUser) {
  return this.name.firstname && this.name.lastname
    ? `${this.name.firstname} ${this.name.lastname}`
    : undefined;
});

userSchema.set('toJSON', { virtuals: true });
userSchema.set('toObject', { virtuals: true });

const User = model<IUser>('User', userSchema);

export default User;
