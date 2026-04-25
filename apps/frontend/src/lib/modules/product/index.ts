// Types
export type {
  Product,
  Category,
  PaginatedResponse,
  CreateProductDto,
  UpdateProductDto,
} from "./types/product.types";

// Services
export { getAllProducts } from "./services/getAllProducts.service";
export { getProductBySlug } from "./services/getProductBySlug.service";
export { getProductById } from "./services/getProductById.service";
export { createProduct } from "./services/createProduct.service";
export { updateProduct } from "./services/updateProduct.service";
export { deleteProduct } from "./services/deleteProduct.service";
export { restoreProduct } from "./services/restoreProduct.service";
export { updateStock } from "./services/updateStock.service";