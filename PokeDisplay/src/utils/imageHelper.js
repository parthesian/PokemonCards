import { Cloudinary } from '@cloudinary/url-gen';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';
import { auto as autoFormat } from '@cloudinary/url-gen/qualifiers/format';
import { auto as autoQuality } from '@cloudinary/url-gen/qualifiers/quality';

const cld = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
  }
});

export const getCloudinaryImage = (cloudinaryId) => {
  if (!cloudinaryId) return null;

  return cld
    .image(cloudinaryId)
    .delivery(format(autoFormat()))
    .delivery(quality(autoQuality()));
};