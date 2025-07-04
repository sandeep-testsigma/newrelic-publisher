import { publishSourcemap } from '@newrelic/publish-sourcemap';
import type { NewRelicSourcemapPluginOptions, PublishSourcemapError, PublishSourcemapResponse } from './types';


// Wrap publishSourcemap in a Promise
export const publishSourcemapAsync = (publishOptions: NewRelicSourcemapPluginOptions) => {
  return new Promise((resolve, reject) => {
    publishSourcemap(publishOptions, (error: PublishSourcemapError, data: PublishSourcemapResponse) => {
      if (error) {
        if (error.response.body.code === 409) {
          console.log('✅ Sourcemap already published');
          resolve('already published');
        } else {
          console.error('❌ Failed to publish sourcemap', error.response.body);
          reject(error);
        }
      } else {
        console.log('✅ Sourcemap published successfully');
        console.log(data);
        resolve(data);
      }
    });
  });
};