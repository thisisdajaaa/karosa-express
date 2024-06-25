import { cloudinary } from "@app/config/cloudinary";
import { UploadApiResponse } from "cloudinary";
import { Readable } from "stream";

export const uploadFile = (
  buffer: Buffer,
  folderName: string,
  public_id?: string
): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: folderName,
        public_id: public_id,
      },
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
    bufferToStream(buffer).pipe(stream);
  });
};

export const deleteFile = (publicId: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, (error, result) => {
      if (result) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

/**
 * @param binary Buffer
 * returns readableInstanceStream Readable
 */
export const bufferToStream = (binary: Buffer): Readable => {
  const readableInstanceStream = new Readable({
    read() {
      this.push(binary);
      this.push(null);
    },
  });
  return readableInstanceStream;
};
