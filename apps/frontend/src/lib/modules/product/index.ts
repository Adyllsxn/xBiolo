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
export { getProductById } from "./services/getProductBySlug.service";
