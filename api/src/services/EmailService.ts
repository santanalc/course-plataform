import Mailgun from "mailgun-js";
const Config = require("../../config.json");
export interface IEmail {
  body: string;
  subject: string;
  to: string[];
}

export interface EmailService {
  sendEmail: (emailInfo: IEmail) => Promise<void>;
}

export function initEmailService(): EmailService {
  const sendEmail = async (emailInfo: IEmail) => {
    const { body, subject, to } = emailInfo;

    let mailgunClient = new Mailgun({
      apiKey: Config.MAILGUN_API_KEY,
      domain: "sandbox9a57929c8406452bb7a86ae807bdd5a6.mailgun.org",
    });

    if (Config.MAILGUN_TEST_MODE) {
      mailgunClient = new Mailgun({
        apiKey: Config.MAILGUN_API_KEY,
        domain: "sandbox9a57929c8406452bb7a86ae807bdd5a6.mailgun.org",
      });
    }

    const fromAddress = "noreply@account.learnistic.com";
    const fromName = "Learnistic";

    try {
      const response = await mailgunClient.messages().send({
        from: `${fromName} <${fromAddress}>`,
        to,
        subject,
        html: body,
        ...(Config.MAILGUN_TEST_MODE && {
          from: `Development <dev@sandbox9a57929c8406452bb7a86ae807bdd5a6.mailgun.org>`,
          to: ["dumpster@palhari.dev"],
        }),
      });
    } catch (err) {
      throw err;
    }
  };

  return { sendEmail };
}
