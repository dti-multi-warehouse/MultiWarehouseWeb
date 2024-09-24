import { useQuery, useMutation, useQueryClient } from 'react-query';
import apiClient from '@/lib/apiClient';
import { AddItemDto, CartResponse } from '@/types/datatypes';
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

export const useCart = () => {
  const queryClient = useQueryClient();

  const { data: cart, error, isLoading } = useQuery<CartResponse>(
    'cart',
    async () => {
      try {
        const config = await attachToken({});
        const response = await apiClient.get<CartResponse>('/api/v1/cart', config);
        return response.data;
      } catch (error) {
        console.error('Failed to fetch cart:', error);
        throw error;
      }
    },
    {
      retry: false, 
    }
  );

  return { cart, error, isLoading };
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (item: AddItemDto) => {
      const config = await attachToken({});
      try {
        const response = await apiClient.post('/api/v1/cart', item, config);
        console.log('Item added to cart successfully:', response.data);
      } catch (error: any) {
        console.error('Error adding item to cart:', error.response?.data || error.message);
        throw error;
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('cart'); 
      },
      onError: (error) => {
        console.error('Failed to add item to cart:', error);
      },
    }
  );
};


export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (productId: number) => {
      try {
        const config = await attachToken({});
        await apiClient.delete(`/api/v1/cart/${productId}`, config);
      } catch (error) {
        console.error('Failed to remove item from cart:', error);
        throw error;
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('cart');
      },
    }
  );
};

export const useIncrementQuantity = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (productId: number) => {
      const config = await attachToken({});
      await apiClient.put(`/api/v1/cart/increment/${productId}`, {}, config);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('cart');
      },
    }
  );
};

export const useDecrementQuantity = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (productId: number) => {
      const config = await attachToken({});
      await apiClient.put(`/api/v1/cart/decrement/${productId}`, {}, config);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('cart');
      },
    }
  );
};