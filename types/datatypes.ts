export interface LoginRequest {
    email: string;
    password: string;
}
  
export interface LoginResponse {
    accessToken: string;
    userId: string;
    email: string;
    role: string;
}
  
export interface LogoutRequest {
    token: string;
}

export interface RegisterUserRequest {
    email: string;
}
  
export interface RegisterUserResponse {
    success: boolean;
    message: string;
}
  
export interface ConfirmRegistrationRequest {
    email: string;
    password: string;
    token: string;
}
  
export interface ConfirmRegistrationResponse {
    success: boolean;
    message: string;
}