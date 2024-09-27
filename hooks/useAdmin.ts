import { useMutation, useQuery, useQueryClient, UseMutationResult } from 'react-query';
import apiClient from '@/lib/apiClient';

export const useSearchUsers = (params: { role?: string, username?: string, email?: string, page?: number, size?: number }) => {
  const { role, username, email, page = 0, size = 10 } = params;
  return useQuery(
    ['users', { role, username, email, page, size }],
    async () => {
      const response = await apiClient.get(`/api/v1/admin/users/search`, {
        params: { role, username, email, page, size }
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
      return response.data;
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

export const useUpdateWarehouseAdmin = (): UseMutationResult<void, unknown, { id: number, data: { username?: string, email?: string, password?: string, avatar?: File } }> => {
  const queryClient = useQueryClient();
  
  return useMutation(
    async ({ id, data }) => {
      const formData = new FormData();
      if (data.username) formData.append('username', data.username);
      if (data.email) formData.append('email', data.email);
      if (data.password) formData.append('password', data.password);
      if (data.avatar) formData.append('avatar', data.avatar);

      const response = await apiClient.put(`/api/v1/admin/warehouse-admins/${id}`, formData);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('warehouseAdmins');
      },
      onError: (error) => {
        console.error('Error updating warehouse admin:', error);
      },
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
