const { z } = require("zod");

// Scheme for validating env variables
const envSchema = z.object({
  SUPABASE_DB_PASSWORD: z.string(),
  SUPABASE_URL: z.string().url(),
  SUPABASE_ANON_KEY: z.string(),
  DATABASE_URL: z.string().url(),
  DIRECT_URL: z.string().url(),

  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  AWS_REGION: z.string(),
  S3_BUCKET: z.string(),
  AWS_LOG_GROUP_NAME: z.string(),
  AWS_LOG_STREAM_NAME: z.string(),

  INVITATION_CODE: z.string(),

  TRANSCRIPTION_SERVICE_API_KEY: z.string(),
});

// Validation of variables at build time
const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("Error: Missing or invalid env variables!");
  console.error(parsedEnv.error.format());
  process.exit(1); // Stop build process
}

module.exports.env = parsedEnv.data;
