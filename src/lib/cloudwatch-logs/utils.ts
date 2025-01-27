import { PutLogEventsCommand } from "@aws-sdk/client-cloudwatch-logs";
import { client } from "./client";

// Define the log group and stream names
const logGroupName = process.env.AWS_LOG_GROUP_NAME;
const logStreamName = process.env.AWS_LOG_STREAM_NAME;

export const logMessage = async (
  message: string,
  logLevel: "Info" | "Warning" | "Error",
) => {
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
  const response = await client.send(command);
  console.log(response);
};
