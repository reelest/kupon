import { jsonRpc, useFetch, user } from "./auth";
import processImages from "./processImages";

export const useProducts = () =>
  useFetch("/sell", ({ msg }) => {
    return msg.map((e) => {
      const files = typeof e.files === "string" ? JSON.parse(e.files) : e.files;
      return {
        id: "",
        sellerId: "",
        title: "",
        location: "",
        city: "",
        state: "",
        category: "",
        material: "",
        conditions: "",
        price: "",
        descriptions: "",
        paid: "",
        referenceId: "",
        created_at: "",
        ...e,
        files,
        image: files[0],
      };
    });
  });

export async function sellProduct(e) {
  const [res, body] = await jsonRpc("/sell", {
    sellerId: user().id,
    files: await processImages(e.images),
    title: e.name,
    location: e.location,
    city: e.city,
    state: e.state,
    category: e.category,
    material: e.material,
    conditions: e.condition,
    price: e.price,
    description: e.description,
  });
  console.log({ ok: res.ok, body });
  if (res.ok) {
    return { paymentUrl: body.msg };
  } else {
    console.log(body, "der");
    throw new Error(body.msg);
  }
}
