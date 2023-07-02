import { jsonRpc, useFetch, user } from "./auth";
import processImages from "./processImages";

export async function sendPackage(e) {
  // itemName
  // images
  // senderName ?
  // senderEmail ?
  // senderPhoneNumber
  // senderCompany
  // pickupAddress
  // pickupCity
  // receiverName
  // receiverEmail
  // receiverPhoneNumber
  // receiverPostCode
  // receiverCode
  // deliveryAddress
  // deliveryCity
  const payload = {
    userId: user()?.id,
    packageName: e.itemName,
    files: await processImages(e.images),
    firstName: e.receiverFirstName,
    lastName: e.receiverLastName,
    email: e.receiverEmail,
    telephone: e.senderPhoneNumber,
    company: e.senderCompany,
    pickupAddress: e.pickupAddress,
    pickupCity: e.pickupCity,
    pickupState: e.pickupState,
    postCode: e.receiverPostCode,
    receiverTelephone: e.receiverPhoneNumber,
    deliveryAddress: e.deliveryAddress,
    deliveryCity: e.deliveryCity,
    deliveryState: e.deliveryState,
    packageCode: e.receiverCode,
    description: e.description,
  };
  const [res, body] = await jsonRpc("/logistic/send", payload);
  console.log({ ok: res.ok, body });
  if (res.ok) {
    return { paymentUrl: body.msg };
  } else {
    console.log(body, "der");
    throw new Error(body.msg);
  }
}
/**
 * 
 * @returns {{ 
 *    name: string,
 *    trackingNumber: number,
 *    image: string,
 *    status: string
 * }}
    
 */
export const useSentPackages = () =>
  useFetch("/logistic/user", ({ msg }) => msg);
