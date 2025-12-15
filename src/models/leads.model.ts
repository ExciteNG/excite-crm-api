import { UserSource, UserStatus } from '@/interfaces/type';
import { model, Schema, Document } from 'mongoose';

export interface ILead extends Document {
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
    address: string;
    city: string;
    state: string;
    country: string;
  };
  businessName?: string;
  businessCategory?: string;
  status: string;
  source: string;
}

const leadSchema = new Schema<ILead>(
  {
    name: {
      firstname: { type: String },
      lastname: { type: String },
    },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String },
    registrationDate: { type: Date },
    language: { type: String, default: 'en' },
    country: { type: String, default: 'Nigeria' },
    location: {
      address: { type: String },
      city: { type: String },
      state: { type: String },
      country: { type: String, default: 'Nigeria' },
    },
    businessName: { type: String },
    businessCategory: { type: String },
    status: {
      type: String,
      enum: Object.values(UserStatus),
      default: UserStatus.PENDING,
    },
    source: { type: String, enum: Object.values(UserSource), required: true },
  },
  { timestamps: true }
);

leadSchema.virtual('name.fullname').get(function (this: ILead) {
  return this.name.firstname && this.name.lastname
    ? `${this.name.firstname} ${this.name.lastname}`
    : undefined;
});

leadSchema.set('toJSON', { virtuals: true });
leadSchema.set('toObject', { virtuals: true });

const Lead = model<ILead>('Lead', leadSchema);

export default Lead;
