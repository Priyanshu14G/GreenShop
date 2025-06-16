import { fetchProductByBarcode } from "./getProductById";

export async function getFilteredProducts(filters) {
  const barcodes = [
    "3017624010701", "737628064502", "0048151623426"
  ];

  const prods = await Promise.all(
    barcodes.map(async (code) => {
      try {
        return await fetchProductByBarcode(code);
      } catch {
        return null;
      }
    })
  );

  return prods.filter(Boolean);
}
