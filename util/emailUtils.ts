import { Resource } from "sst";
import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";

const client = new SESv2Client();

export type SendEmail = ({
  to,
  subject,
  body,
}: {
  to: string | string[];
  subject: string;
  body: string;
}) => Promise<{ statusCode: number; body: string }>;

export const sendEmail: SendEmail = async ({
  to = Resource.Email.sender,
  subject,
  body,
}) => {
  await client.send(
    new SendEmailCommand({
      FromEmailAddress: Resource.Email.sender,
      Destination: {
        ToAddresses: Array.isArray(to) ? to : [to],
      },
      Content: {
        Simple: {
          Subject: {
            Data: subject,
          },
          Body: {
            Text: {
              Data: body,
            },
          },
        },
      },
    })
  );

  return {
    statusCode: 200,
    body: "Sent!",
  };
};
