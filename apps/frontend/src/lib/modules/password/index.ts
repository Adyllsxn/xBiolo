// Types
export type { ChangePasswordRequest, ChangePasswordResponse, ForgotPasswordRequest, ForgotPasswordResponse } from "./types/password.types";

// Services
export { changePassword } from "./services/changePassword.service";
export { forgotPassword } from "./services/forgotPassword.service";