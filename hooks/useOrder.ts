import { useMutation, useQueryClient } from 'react-query';
import apiClient from '@/lib/apiClient';
import { CreateOrderRequestDto, CreateOrderResponseDto, Order } from '@/types/datatypes';
import { AxiosError } from 'axios';
import { getSession } from 'next-auth/react';

const attachToken = async (config: any) => {
  const session = await getSession();
  if (session?.accessToken) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${session.accessToken}`,
    };
  }
  return config;
};

export const useOrdersByStatus = (status: string) => {
  const queryClient = useQueryClient();

  return useMutation(
    async () => {
      const config = await attachToken({});
      const session = await getSession();
      if (!session || !session.user?.id) throw new Error('User session not found');
      const response = await apiClient.get<Order[]>(`/api/v1/order/user/${session.user.id}/status/${status}`, config);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('ordersByStatus');
      },
      onError: (error: AxiosError) => {
        console.error('Error fetching orders by status:', error.response?.data);
      },
    }
  );
};

export const useOrderDetails = (orderId: number) => {
  const queryClient = useQueryClient();

  return useMutation(
    async () => {
      const config = await attachToken({});
      const response = await apiClient.get<Order>(`/api/v1/order/${orderId}`, config);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('orderDetails');
      },
      onError: (error: AxiosError) => {
        console.error('Error fetching order details:', error.response?.data);
      },
    }
  );
};

export const useOrderDetailByUser = (orderId: number) => {
  const queryClient = useQueryClient();

  return useMutation(
    async () => {
      const config = await attachToken({});
      const session = await getSession();
      if (!session || !session.user?.id) throw new Error('User session not found');
      const response = await apiClient.get<Order[]>(`/api/v1/order/user/${session.user.id}`, config);
      const orders = response.data;
      return orders.find((order) => order.id === orderId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('orderDetails');
      },
      onError: (error: AxiosError) => {
        console.error('Error fetching order details:', error.response?.data);
      },
    }
  );
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (data: CreateOrderRequestDto) => {
      const config = await attachToken({});
      const response = await apiClient.post<CreateOrderResponseDto>('/api/v1/order', data, config);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('cart');
      },
      onError: (error: AxiosError) => {
        console.error('Error creating order:', error.response?.data);
      }
    }
  );
};

export const useUploadPaymentProof = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ orderId, paymentProof }: { orderId: number; paymentProof: File }) => {
      const formData = new FormData();
      formData.append('paymentProof', paymentProof);

      const response = await apiClient.post(`/api/v1/order/payment/${orderId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('order');
      },
      onError: (error: AxiosError) => {
        console.error('Error uploading payment proof:', error.response?.data);
      }
    }
  );
};

export const useCancelOrder = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (orderId: number) => {
      const response = await apiClient.put(`/api/v1/order/cancel/${orderId}`);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('order');
      },
      onError: (error: AxiosError) => {
        console.error('Error cancelling order:', error.response?.data);
      }
    }
  );
};

export const useConfirmPayment = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (orderId: number) => {
      const response = await apiClient.put(`/api/v1/order/confirm/${orderId}`);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('order');
      },
      onError: (error: AxiosError) => {
        console.error('Error confirming payment:', error.response?.data);
      }
    }
  );
};

export const useSendOrder = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (orderId: number) => {
      const response = await apiClient.put(`/api/v1/order/send/${orderId}`);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('order');
      },
      onError: (error: AxiosError) => {
        console.error('Error sending order:', error.response?.data);
      }
    }
  );
};

export const useFinalizeOrder = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (orderId: number) => {
      const response = await apiClient.put(`/api/v1/order/finalize/${orderId}`);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('order');
      },
      onError: (error: AxiosError) => {
        console.error('Error finalizing order:', error.response?.data);
      }
    }
  );
};
