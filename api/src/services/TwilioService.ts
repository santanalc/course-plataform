import Twilio from "twilio";

const Configs = require("../../config.json");

interface ISendSms {
  to: string;
  body: string;
}

export interface TwilioService {
  rawTwilioClient: Twilio.Twilio;
  sendSms: ({ to, body }: ISendSms) => Promise<void>;
  preparePhoneNumber: (phone: string) => Promise<string>;
}

export function initTwilio(): TwilioService {
  const twilio = (() =>
    Twilio(Configs.TWILIO.ACCOUNT_SID, Configs.TWILIO.AUTH_TOKEN))();

  /**
   * Function that validate and internationalize phone
   * numbers before doing Twilio API operations
   */
  async function preparePhoneNumber(phone: string) {
    let twilioResponse = await twilio.lookups.v1.phoneNumbers(phone).fetch();
    return twilioResponse.phoneNumber;
  }

  const sendSms = async ({ to, body }: ISendSms) => {
    const smsSent = await twilio.messages.create({
      to,
      body,
      from: Configs.TWILIO.FROM,
    });
    console.log({ smsSent });
  };
  return { rawTwilioClient: twilio, sendSms, preparePhoneNumber };
}
