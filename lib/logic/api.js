import { jsonRpc } from "./auth";

export async function contactUs({ email, phoneNumber, name, message }) {
  const [res, body] = await jsonRpc("/user/contact_message", {
    email,
    telephone: phoneNumber,
    fullName: name,
    message,
  });
  if (!res.ok) throw body.msg;
}
