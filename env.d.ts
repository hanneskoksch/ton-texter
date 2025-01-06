declare namespace NodeJS {
  interface ProcessEnv {
    SUPABASE_DB_PASSWORD: string;
    SUPABASE_URL: string;
    SUPABASE_ANON_KEY: string;
    DATABASE_URL: string;
    DIRECT_URL: string;

    S3_ACCESS_KEY_ID: string;
    S3_SECRET_ACCESS_KEY: string;
    S3_REGION: string;
    S3_BUCKET: string;

    INVITATION_CODE: string;

    TRANSCRIPTION_SERVICE_API_KEY: string;
  }
}
