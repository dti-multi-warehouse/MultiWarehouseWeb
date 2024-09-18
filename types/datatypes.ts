export interface AddItemDto {
    productId: number;
    quantity: number;
}

export interface cartItems {
    productId: number;
    name: string;
    price: number;
    quantity: number;
    imageUrl: string; 
}

export interface CartResponse {
    cartItems: cartItems[];
    totalPrice: number;
}

export interface productCards{
    image: string;
    name: string;
    price: number;
    stock: number;
}

export interface userAddress {
    id: number;
    name: string;
    phoneNumber: string;
    label: string;
    address: {
      street: string;
      city: string;
      province: string;
      latitude: number;
      longitude: number;
    };
    isPrimary: boolean;
}  

export interface productCategories{
    name: string;
    icon: string;
    content: productCards[];
}

export interface UserProfileDTO {
    id: number;
    username: string;
    email: string;
    social: boolean;
    verified: boolean;
    avatar: string;
    role: string;
  }

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

export interface ResetPasswordRequest{
    email: string;
}

export interface ResetPasswordResponse{
    message: string;
}

export interface ConfirmResetPasswordRequest {
    email: string;
    token: string;
    newPassword: string;
}
