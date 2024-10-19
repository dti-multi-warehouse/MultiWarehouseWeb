import { useMutation, useQuery, useQueryClient, UseMutationResult } from 'react-query';
import apiClient from '@/lib/apiClient';
import { useSession } from 'next-auth/react';
import { userAddress } from '@/types/datatypes';

interface ApiResponse<T> {
  statusCode: number;
  message: string;
  success: boolean;
  data: T;
}

export const useGetUserAddresses = () => {
  const { data: session } = useSession();

  const { data, error, isLoading, refetch } = useQuery<userAddress[]>(
    ['userAddresses', session?.user?.id],
    async () => {
      if (!session?.user?.id) throw new Error('User is not logged in');
      const response = await apiClient.get<ApiResponse<userAddress[]>>(
        `/api/v1/address/user/${session.user.id}`
      );
      return response.data.data;
    },
    {
      enabled: !!session?.user?.id,
      retry: 1,
      onError: (err) => {
        console.error('Error fetching addresses:', err);
      },
    }
  );

  return {
    addresses: data,
    isLoading,
    error,
    refetch,
  };
};

export const useCreateUserAddress = (): UseMutationResult<userAddress, unknown, userAddress> => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  return useMutation(
    async (data: userAddress) => {
      if (!session?.user?.id) throw new Error('User is not logged in');
      const response = await apiClient.post<userAddress>(`/api/v1/address/user/${session.user.id}/add`, data);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['userAddresses', session?.user?.id]);
      },
      onError: (error) => {
        console.error('Error creating address:', error);
      },
    }
  );
};

export const useUpdateUserAddress = (): UseMutationResult<userAddress, unknown, { addressId: number, data: userAddress }> => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  return useMutation(
    async ({ addressId, data }: { addressId: number, data: userAddress }) => {
      if (!session?.user?.id) throw new Error('User is not logged in');
      const response = await apiClient.put<userAddress>(`/api/v1/address/user/${session.user.id}/update/${addressId}`, data);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['userAddresses', session?.user?.id]);
      },
      onError: (error) => {
        console.error('Error updating address:', error);
      },
    }
  );
};

export const useDeleteUserAddress = (): UseMutationResult<void, unknown, number> => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  return useMutation(
    async (addressId: number) => {
      if (!session?.user?.id) throw new Error('User is not logged in');
      await apiClient.delete(`/api/v1/address/delete/${addressId}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['userAddresses', session?.user?.id]);
      },
      onError: (error) => {
        console.error('Error deleting address:', error);
      },
    }
  );
};

export const useGetUserAddressById = (id: number) => {
  const { data: session } = useSession();

  const { data, error, isLoading, refetch } = useQuery<userAddress>(
    ['userAddress', id],
    async () => {
      if (!session?.user?.id) throw new Error('User is not logged in');
      const response = await apiClient.get<ApiResponse<userAddress>>(
        `/api/v1/address/userAddress/${id}`
      );
      return response.data.data;
    },
    {
      enabled: !!session?.user?.id,
    }
  );

  return {
    address: data,
    isLoading,
    error,
    refetch,
  };
};