import { jsonRpc } from "./auth";

export async function contactUs({ email, phoneNumber, fullName, message }) {
  const [res, body] = await jsonRpc("/reach/message", {
    email,
    telephone: phoneNumber,
    fullName,
    message,
  });
  if (!res.ok) throw body.msg;
}
