import { useMutation, useQueryClient } from 'react-query';
import apiClient from '@/lib/apiClient';
import { CreateOrderRequestDto, CreateOrderResponseDto } from '@/types/datatypes';
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
