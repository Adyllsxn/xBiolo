export type {
  Product,
  PaginatedResponse,
  CreateProductDto,
  UpdateProductDto,
} from "./types/product.types";

// Services
export { getAllProducts } from "./services/getAllProducts.service";
export { getProductBySlug } from "./services/getProductBySlug.service";