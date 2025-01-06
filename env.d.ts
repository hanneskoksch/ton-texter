declare namespace NodeJS {
  interface ProcessEnv {
    SUPABASE_DB_PASSWORD: string;
    SUPABASE_URL: string;
    SUPABASE_ANON_KEY: string;
    DATABASE_URL: string;
    DIRECT_URL: string;

    AWS_ACCESS_KEY_ID: string;
    AWS_SECRET_ACCESS_KEY: string;
    AWS_REGION: string;
    S3_BUCKET: string;
    AWS_LOG_GROUP_NAME: string;
    AWS_LOG_STREAM_NAME: string;

    INVITATION_CODE: string;

    TRANSCRIPTION_SERVICE_API_KEY: string;
  }
}
