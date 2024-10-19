import { WarehouseList } from "@/types/warehouse";

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
    primary: boolean;
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
  stock: number;
}

export interface CartResponse {
  data: {
    cartItems: cartItems[];
    totalPrice: number;
  };
}

export interface productCards {
  id: number;
  thumbnail: string;
  name: string;
  price: number;
  stock: number;
}

export interface productCategories {
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
   warehouseId?: number;
   warehouseName?: string;
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

export interface ResetPasswordRequest {
  email: string;
}

export interface ResetPasswordResponse {
  message: string;
}

export interface ConfirmResetPasswordRequest {
  email: string;
  token: string;
  newPassword: string;
}

export interface StockDetailsResponse {
  stockMovements: StockDetails[];
  stockMovementChartData: StockMovementChartData[];
}

export interface StockDetails {
  date: Date;
  quantity: number;
  source: "order" | "restock" | "mutation_in" | "mutation_out";
  note: number;
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
    warehouseToName: string
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
  MIDTRANS = "MIDTRANS",
  BANK_TRANSFER = "BANK_TRANSFER",
}

export enum BankTransfer {
  BCA = "BCA",
  BRI = "BRI",
  BNI = "BNI",
  CIMB = "CIMB",
}

export interface CreateOrderItemRequestDto {
  productIds: number;
  quantity: number; 
}

export interface CreateOrderRequestDto {
  items: CreateOrderItemRequestDto[];
  paymentMethod: PaymentMethod;
  bankTransfer?: BankTransfer;
  shippingMethod: string; 
  shippingAddressId: number;
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
    userName: string;
    warehouseId: number;
    warehouseName: string;
    paymentProof: string | null;
    status: string;
    paymentMethod: string;
    shippingCost: number;
    bank: string;
    accountNumber: string;
    createdAt: string;
    paymentExpiredAt: string;
    invoiceNumber: number;
    items: OrderItems[];
    totalAmount: number;
    price: number;
    buyerName: string;
    buyerPhoneNumber: string;
    buyerAddress: {
      id: number;
      street: string;
      city: string;
      province: string;
    };
    warehouseAddress: {
      id: number;
      street: string;
      city: string;
      province: string;
    };
    statusLabel: string;
    shippingDate: string;
    virtualAccountNumber: string;
  }

  export interface OrderItems{
    id: number;
    name: string;
    quantity: number;
    thumbnail: string;
    price: number;
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
    product: ProductStockDetails;
    warehouse: WarehouseList;
    date: Date;
    isAdmin: boolean;
    isStockDrawerOpen: boolean;
    setProduct: (product: ProductStockDetails) => void;
    setWarehouse: (warehouse: WarehouseList) => void;
    setDate: (date: Date) => void;
    setIsAdmin: (isAdmin: boolean) => void;
    setIsStockDrawerOpen: (isStockDrawerOpen: boolean) => void;
  }

export interface ProductStockDetails {
  id: number;
  name: string;
  stock: number;
}
