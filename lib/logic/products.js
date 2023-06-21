import { pick, useAsyncDummyData } from "../utils/dummy_data";
import { useFetch } from "./auth";

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

const SENT_PRODUCTS_API = {
  dispatch: [
    {
      name: "name",
      trackingNumber: "range(599933, 999022)",
      image: "image",
      status: pick("out for delivery"),
    },
  ],
};

export const useSentItemsAPI = () =>
  useAsyncDummyData(SENT_PRODUCTS_API)?.dispatch;
