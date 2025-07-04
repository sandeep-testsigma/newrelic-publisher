/**
 * Type definitions for the module
 */

export interface NewRelicSourcemapPluginOptions {
  isNewRelicEnabled?: boolean;
  applicationId?: string;
  apiKey?: string;
  javascriptUrlBase?: string;
}


export type PublishSourcemapError = Error & {
  response: {
    body: {
      code: number;
    };
  };
};

export type PublishSourcemapResponse = {
  success: boolean;
  message: string;
  data: unknown;
};