import { ReactNode } from "react";
import { Resend } from "resend";
import { RESEND_API_KEY, SENDER_EMAIL } from "../constants";

export const sendEmail = async (to: string, subject: string, template: ReactNode) => {
  const resend = new Resend(RESEND_API_KEY);

  const { data, error } = await resend.emails.send({
    from: SENDER_EMAIL,
    to,
    subject,
    text: "",
    react: template,
  });

  if (error) {
    throw error;
  }

  return data;
};
