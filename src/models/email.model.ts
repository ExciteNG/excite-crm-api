import mongoose, { Schema, Document } from 'mongoose';

interface IEmail extends Document {
  emailId: string;
  from: string;
  to: string;
  cc: string;
  bcc: string;
  subject: string;
  body: string;
  status: 'sent' | 'failed' | 'pending';
  createdAt: Date;
}

const EmailSchema: Schema = new Schema(
  {
    emailId: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    cc: { type: String },
    bcc: { type: String },
    subject: { type: String, required: true },
    body: { type: String, required: true },
    status: {
      type: String,
      enum: ['sent', 'failed', 'pending'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

const Email = mongoose.model<IEmail>('Email', EmailSchema);
export default Email;
