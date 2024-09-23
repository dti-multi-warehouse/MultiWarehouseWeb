import {date} from "yup";

export interface productCards{
    id: number;
    thumbnail: string;
    name: string;
    price: number;
    stock: number;
}

export interface productCategories{
    name: string;
    icon: string;
    content: productCards[];
}

export interface FeaturedProductsDTO {
    featuredProducts: FeaturedProducts[];
}

interface FeaturedProducts {
    group_key: string;
    hits: Document[];
}

interface Document {
    document: productCards;
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

export interface Stock {
    id: number;
    warehouseId: number;
    thumbnail: string;
    name: string;
    stock: number
}

export interface StockMutation {
    id: number;
    warehouseToId: number;
    warehouseFromId: number;
    name: string;
    quantity: number;
    created_at: Date;
}
