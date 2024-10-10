export interface OrderResponseDto {
    totalPage: number;
    orders: Order[];
}

export interface Order {
    id: number;
    userId: number;
    userName: string;
    email: string;
    phoneNumber: string;
    street: string;
    city: string;
    province: string;
    price: number;
    paymentProof: string | null;
    status: Status;
    paymentMethod: string;
    shippingCost: number;
    bank: string
    accountNumber: string;
    createdAt: Date;
    paymentExpiredAt: Date;
    orderItems: OrderItem[];
}

export type Status = 'AWAITING_PAYMENT' | 'AWAITING_CONFIRMATION' | 'PROCESSING' | 'DELIVERING' | 'COMPLETED' | 'CANCELLED';

export interface OrderItem {
    id: number;
    thumbnail: string;
    name: string;
    quantity: number;
}