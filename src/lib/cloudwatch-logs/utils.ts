import { PutLogEventsCommand } from "@aws-sdk/client-cloudwatch-logs";
import { client } from "./client";

// Define the log group and stream names
const logGroupName = process.env.AWS_LOG_GROUP_NAME;
const logStreamName = process.env.AWS_LOG_STREAM_NAME;

/**
 * Logs a message to the cloudwatch logs and to the console.
 * @param message - The message to log.
 * @param logLevel - Can be "Info", "Warning" or "Error".
 */
export const logMessage = async (
  message: string,
  logLevel: "Info" | "Warning" | "Error",
) => {
  // Log to console
  switch (logLevel) {
    case "Info":
      console.log(message);
      break;
    case "Warning":
      console.warn(message);
      break;
    case "Error":
      console.error(message);
      break;
  }

  // Log to cloudwatch
  const input = {
    logGroupName: logGroupName,
    logStreamName: logStreamName,
    logEvents: [
      {
        timestamp: Date.now(),
        message: `[${logLevel}] ${message}`,
      },
    ],
  };
  const command = new PutLogEventsCommand(input);
  await client.send(command);
};
