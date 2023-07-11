import axios from "axios";
import { jsonRpc, useFetch, user } from "./auth";
import processImages from "./processImages";

export async function sendPackage(e) {
  // senderName ?
  // senderEmail ?
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
  useFetch("/logistic/user", ({ msg }) => {
    return msg.map((data) => {
      const images = JSON.parse(data.files);
      return { image: images[0], images, ...data };
    });
  });

export async function verifyLogisticsPayment(txnRef) {
  await jsonRpc(
    `/dashboard/logistics/user?trxref=${txnRef}&reference=${txnRef}`,
    null,
    {
      method: "GET",
    }
  );
}
