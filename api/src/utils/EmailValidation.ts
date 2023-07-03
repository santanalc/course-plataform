import { ROLE_BASED_EMAILS } from "./RoleBasedEmails";
import { SUPRESSED_EMAILS } from "./SupressedEmails";

const ONE_EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export function validationEmail(email: string): boolean {
  if (email.includes("+")) return false;

  if (SUPRESSED_EMAILS[email.split("@")[1]]) return false;

  if (ROLE_BASED_EMAILS[email.split("@")[0]]) return false;

  if (ONE_EMAIL_REGEX.test(email) && email !== "") return true;

  return false;
}
