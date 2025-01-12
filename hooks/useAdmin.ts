import { useMutation, useQuery, useQueryClient, UseMutationResult } from 'react-query';
import apiClient from '@/lib/apiClient';

export const useSearchUsers = (params: {
  role?: string;
  username?: string;
  email?: string;
  page?: number;
  size?: number;
  sortField?: string;
  sortDirection?: string;
}) => {
  const { role, username, email, page = 0, size = 10, sortField, sortDirection } = params;

  return useQuery(
    ['users', { role, username, email, page, size, sortField, sortDirection }],
    async () => {
      const response = await apiClient.get(`/api/v1/admin/users/search`, {
        params: { role, username, email, page, size, sortField, sortDirection },
      });
      return response.data;
    },
    {
      keepPreviousData: true,
    }
  );
};

export const useGetWarehouseAdminById = (id: number) => {
  return useQuery(['warehouseAdmin', id], async () => {
    const response = await apiClient.get(`/api/v1/admin/warehouse-admins/${id}`);
    return response.data;
  }, {
    enabled: !!id,
    onError: (error) => {
      console.error(`Error fetching warehouse admin with ID ${id}:`, error);
    }
  });
};

export const useGetWarehouseAdmins = () => {
  return useQuery(
    'warehouseAdmins',
    async () => {
      const response = await apiClient.get(`/api/v1/admin/warehouse-admins`);
      const warehouseAdmins = response.data.data;

      if (!Array.isArray(warehouseAdmins)) {
        throw new Error("Expected an array of warehouse admins.");
      }
      return warehouseAdmins;
    },
    {
      retry: 1,
      onError: (err) => {
        console.error('Error fetching warehouse admins:', err);
      },
    }
  );
};

export const useCreateWarehouseAdmin = (): UseMutationResult<
  void, 
  unknown, 
  FormData
> => {
  const queryClient = useQueryClient();

  return useMutation(
    async (formData: FormData) => {
      const response = await apiClient.post(`/api/v1/admin/warehouse-admins`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('warehouseAdmins');
      },
      onError: (error) => {
        console.error('Error creating warehouse admin:', error);
      },
    }
  );
};

export const useUpdateWarehouseAdmin = () => {
  return useMutation(
    async ({ id, data }: { id: number; data: FormData }) => {
      const response = await apiClient.put(`/api/v1/admin/warehouse-admins/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    }
  );
};

export const useDeleteWarehouseAdmin = (): UseMutationResult<void, unknown, number> => {
  const queryClient = useQueryClient();
  
  return useMutation(
    async (id: number) => {
      await apiClient.delete(`/api/v1/admin/warehouse-admins/${id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('warehouseAdmins');
      },
      onError: (error) => {
        console.error('Error deleting warehouse admin:', error);
      },
    }
  );
};
