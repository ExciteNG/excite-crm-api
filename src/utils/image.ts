import {
  AWS_ACCESS_ID,
  AWS_ACCESS_SECRET,
  BUCKET_NAME,
  BUCKET_REGION,
} from '@/config';
import { HttpException } from '@/exceptions/HttpException';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: BUCKET_REGION ? BUCKET_REGION : '',
  credentials: {
    accessKeyId: AWS_ACCESS_ID ? AWS_ACCESS_ID : '',
    secretAccessKey: AWS_ACCESS_SECRET ? AWS_ACCESS_SECRET : '',
  },
});

async function uploadImage(
  file: Buffer,
  fileName: string,
  emailSubject: string
) {
  if (!BUCKET_NAME)
    throw new HttpException(500, ' Contact support to include a storage name!');
  const Key = `${emailSubject}/${fileName}`;

  const command = new PutObjectCommand({
    Key,
    Bucket: BUCKET_NAME,
    Body: file,
  });

  const result = await s3Client.send(command);

  return result.$metadata;
}

export default uploadImage;
