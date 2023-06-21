import { jsonRpc } from "./auth";

export async function contactUs({ email, phoneNumber, name, message }) {
  await jsonRpc("/contact-us", { email, phoneNumber, name, message });
}
