import { useMutation, useQuery, useQueryClient, UseMutationResult } from 'react-query';
import apiClient from '@/lib/apiClient';

export const useGetWarehouseById = (id: number) => {
  return useQuery(
    ['warehouse', id],
    async () => {
      const response = await apiClient.get(`/api/v1/warehouse/${id}`);
      return response.data;
    },
    {
      enabled: !!id, 
      staleTime: 5 * 60 * 1000,
      onError: (error) => {
        console.error('Error fetching warehouse:', error);
      },
    }
  );
};

export const useSearchWarehouses = (params: { name?: string; city?: string; province?: string; page?: number; size?: number }) => {
  const { name, city, province, page = 0, size = 10 } = params;
  return useQuery(
    ['warehouses', { name, city, province, page, size }],
    async () => {
      const response = await apiClient.get(`/api/v1/warehouse/search`, {
        params: { name, city, province, page, size }
      });
      return response.data;
    },
    {
      keepPreviousData: true, 
      onError: (error) => {
        console.error('Error searching warehouses:', error);
      },
    }
  );
};

export const useCreateWarehouse = (): UseMutationResult<void, unknown, { name: string, street: string, city: string, province: string, latitude: number, longitude: number }> => {
  const queryClient = useQueryClient();
  
  return useMutation(
    async (data) => {
      const response = await apiClient.post(`/api/v1/warehouse/create`, data);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('warehouses');
      },
      onError: (error) => {
        console.error('Error creating warehouse:', error);
      },
    }
  );
};

export const useUpdateWarehouse = (): UseMutationResult<void, unknown, { id: number, data: any }> => {
  const queryClient = useQueryClient();
  
  return useMutation(
    async ({ id, data }) => {
      const response = await apiClient.put(`/api/v1/warehouse/update/${id}`, data);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('warehouses'); 
        queryClient.invalidateQueries(['warehouse', id]); 
      },
      onError: (error) => {
        console.error('Error updating warehouse:', error);
      },
    }
  );
};

export const useDeleteWarehouse = (): UseMutationResult<void, unknown, number> => {
  const queryClient = useQueryClient();
  
  return useMutation(
    async (id: number) => {
      await apiClient.delete(`/api/v1/warehouse/delete/${id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('warehouses');
      },
      onError: (error) => {
        console.error('Error deleting warehouse:', error);
      },
    }
  );
};

export const useAssignWarehouseAdmin = (): UseMutationResult<void, unknown, { warehouseId: number, userId: number }> => {
  return useMutation(
    async (data) => {
      const response = await apiClient.post(`/api/v1/warehouse/assign-admin`, data);
      return response.data;
    },
    {
      onError: (error) => {
        console.error('Error assigning warehouse admin:', error);
      },
    }
  );
};