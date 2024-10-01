import {date} from "yup";

export interface userAddress {
    data?: {
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
        primary: boolean;
    }
}

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
    data: {
        cartItems: cartItems[];
        totalPrice: number;
    }
}

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
    name: string;
    stock: number
    thumbnail: string;
    incoming: number;
    outgoing: number;
}

export interface StockDetailsResponse {
    stockMovements: StockDetails[];
    stockMovementChartData: StockMovementChartData[]
}

export interface StockDetails {
    date: Date;
    quantity: number;
    source: 'order' | 'restock' | 'mutation_in' | 'mutation_out';
    note: number
}

export interface StockMovementChartData {
    period: number;
    restock: number;
    mutationIn: number;
    mutationOut: number;
    order: number;
}

export interface StockMutation {
    id: number;
    warehouseToId: number;
    warehouseFromId: number;
    name: string;
    quantity: number;
    created_at: Date;
}

export interface ProductAndStockAvailablity {
    productId: number;
    name: string;
    stock: number;
    thumbnail: string;
}

export enum PaymentMethod {
    MIDTRANS = 'MIDTRANS',
    BANK_TRANSFER = 'BANK_TRANSFER',
}

export enum BankTransfer {
    BCA = 'BCA',
    BRI = 'BRI',
    BNI = 'BNI',
    CIMB = 'CIMB',
}

export interface CreateOrderItemRequestDto {
    productId: number;
    quantity: number;
}

export interface CreateOrderRequestDto {
    paymentMethod: PaymentMethod;
    bankTransfer?: BankTransfer;
    shippingMethod: string;
}

export interface CreateOrderResponseDto {
    transactionId: string;
    currency: string;
    price: string;
    transactionTime: string;
    transactionStatus: string;
    paymentType: string;
    bank: string;
    vaNumber: string;
    message: string;
}

export interface Order {
    id: number;
    userId: number;
    warehouseId: number;
    price: number;
    paymentProof: string | null;
    status: string;
    paymentMethod: PaymentMethod;
    orderItems: OrderItem[];
    createdAt: string;
    updatedAt: string;
}

export interface OrderItem {
    id: number;
    productId: number;
    quantity: number;
    price: number;
}

export interface CreateOrderResponseDto {
    orderId: number;
    totalAmount: number;
    orderItems: OrderItem[];
    paymentUrl: string;
}

export interface MidtransError {
    statusCode: number;
    message: string;
    error: string;
}

export interface WarehouseDTO {
    id: number;
    street: string;
    city: string;
    province: string;
    latitude: number;
    longitude: number;
  }

  export interface CreateWarehouseDto {
    name: string;
    street: string;
    city: string;
    province: string;
    latitude: number;
    longitude: number;
  }

  export interface AssignWarehouseAdminDTO {
    warehouseId: number;
    userId: number;
  }

  export interface DashboardStore {
    warehouseId: number;
    product: ProductStockDetails;
    setProduct: (product: ProductStockDetails) => void;
  }

  export interface ProductStockDetails {
    id: number;
    name: string;
    stock: number;
  }