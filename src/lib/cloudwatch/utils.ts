import AWS from "aws-sdk";

// Configure AWS credentials and region
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Create a CloudWatch Logs client
const cloudWatchLogs = new AWS.CloudWatchLogs();

// Define the log group and stream names
const logGroupName = process.env.AWS_LOG_GROUP_NAME;
const logStreamName = process.env.AWS_LOG_STREAM_NAME;

// Function to write a log message to CloudWatch Logs
export const logMessage = (message: string) => {
  const params = {
    logGroupName: logGroupName,
    logStreamName: logStreamName,
    logEvents: [
      {
        message: message,
        timestamp: Date.now(),
      },
    ],
  };

  cloudWatchLogs.putLogEvents(params, (error, data) => {
    if (error) {
      console.log("Error writing log:", error);
    } else {
      console.log("Log written successfully:", data);
    }
  });
};
