import { useQuery, useMutation, useQueryClient } from 'react-query';
import apiClient from '@/lib/apiClient';
import { AxiosError } from 'axios';
import { getSession } from 'next-auth/react';
import { AssignWarehouseAdminDTO, CreateWarehouseDto, WarehouseDTO } from '@/types/datatypes';

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

export const useGetWarehouses = () => {
  return useQuery<WarehouseDTO[], AxiosError>(
    'warehouses',
    async () => {
      const config = await attachToken({});
      const response = await apiClient.get<WarehouseDTO[]>('/api/v1/warehouse/all', config);
      return response.data;
    },
    {
      retry: false, 
      staleTime: 60000, 
    }
  );
};

export const useGetWarehouseById = (id: number) => {
  return useQuery<WarehouseDTO, AxiosError>(
    ['warehouse', id],
    async () => {
      const config = await attachToken({});
      const response = await apiClient.get<WarehouseDTO>(`/api/v1/warehouse/${id}`, config);
      return response.data;
    },
    {
      retry: false,
      enabled: !!id,
    }
  );
};

export const useCreateWarehouse = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (data: CreateWarehouseDto) => {
      const config = await attachToken({});
      const response = await apiClient.post<WarehouseDTO>('/api/v1/warehouse/create', data, config);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('warehouses'); 
      },
      onError: (error: AxiosError) => {
        console.error('Error creating warehouse:', error.response?.data);
      },
    }
  );
};

export const useUpdateWarehouse = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ id, data }: { id: number; data: CreateWarehouseDto }) => {
      const config = await attachToken({});
      const response = await apiClient.put<WarehouseDTO>(`/api/v1/warehouse/update/${id}`, data, config);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('warehouses');
      },
      onError: (error: AxiosError) => {
        console.error('Error updating warehouse:', error.response?.data);
      },
    }
  );
};

export const useDeleteWarehouse = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (id: number) => {
      const config = await attachToken({});
      const response = await apiClient.delete(`/api/v1/warehouse/delete/${id}`, config);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('warehouses');
      },
      onError: (error: AxiosError) => {
        console.error('Error deleting warehouse:', error.response?.data);
      },
    }
  );
};

export const useAssignWarehouseAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (data: AssignWarehouseAdminDTO) => {
      const config = await attachToken({});
      const response = await apiClient.post('/api/v1/warehouse/assign-admin', data, config);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('warehouses');
      },
      onError: (error: AxiosError) => {
        console.error('Error assigning warehouse admin:', error.response?.data);
      },
    }
  );
};
