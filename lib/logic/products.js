import { faker } from "@faker-js/faker";
import { pick, useAsyncDummyData } from "../utils/dummy_data";

const size = pick(360, 480, 600, 720, 960);
const PRODUCTS_API = {
  products: [
    {
      name: faker.commerce.productName,
      image: () => faker.image.url({ width: size(), height: size() }),
      price: () => parseFloat(faker.commerce.price()),
    },
    30,
    30,
  ],
};
export const useProducts = () => useAsyncDummyData(PRODUCTS_API)?.products;
