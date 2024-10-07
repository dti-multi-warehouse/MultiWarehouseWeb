import { useMutation, useQueryClient, UseMutationResult, useQuery } from 'react-query';
import apiClient from '@/lib/apiClient';
import { getSession, signIn, signOut, useSession } from 'next-auth/react';
import {
  ConfirmRegistrationRequest,
  ConfirmRegistrationResponse,
  ConfirmResetPasswordRequest,
  LoginRequest,
  LoginResponse,
  LogoutRequest,
  RegisterUserRequest,
  RegisterUserResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  UserProfileDTO,
} from '@/types/datatypes';

export const useRegisterUser = (): UseMutationResult<
  RegisterUserResponse,
  unknown,
  RegisterUserRequest
> => {
  const queryClient = useQueryClient();
  return useMutation(
    (data: RegisterUserRequest) =>
      apiClient.post<RegisterUserResponse>('/v1/auth/register', data).then((response) => response.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('user');
      },
      onError: (error) => {
        console.error('Error during registration:', error);
      },
    }
  );
};

export const useConfirmRegistration = (): UseMutationResult<
  ConfirmRegistrationResponse,
  unknown,
  ConfirmRegistrationRequest
> => {
  return useMutation(
    (data: ConfirmRegistrationRequest) => {
      return apiClient
        .post<ConfirmRegistrationResponse>('/v1/auth/register/confirm', data)
        .then((response) => response.data)
        .catch((error) => {
          console.error('API Error:', error.response?.status, error.response?.data);
          throw error;
        });
    },
    {
      onSuccess: (data) => {
        console.log('Registration confirmed successfully:', data);
      },
      onError: (error: any) => {
        console.error('Error during confirmation:', error.message);
        console.error('Error details:', error.response?.data);
      },
    }
  );
};

export const useLoginUser = (): UseMutationResult<LoginResponse, unknown, LoginRequest> => {
  const queryClient = useQueryClient();
  return useMutation(
    async (data: LoginRequest) => {
      const result = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      if (!result?.ok) {
        throw new Error('Failed to sign in');
      }

      const session = await getSession();
      if (!session?.user) {
        throw new Error('Failed to get user session');
      }

      return {
        accessToken: session.accessToken!,
        userId: session.user.id!,
        email: session.user.email!,
        role: session.user.role!,
      };
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('user');
      },
      onError: (error: any) => {
        console.error('Error during login:', error.message);
      },
    }
  );
};

export const useLogoutUser = (): UseMutationResult<void, unknown, LogoutRequest> => {
  return useMutation(
    (data: LogoutRequest) =>
      apiClient.post('/v1/auth/logout', { token: data.token }).then((response) => {
        signOut({ redirect: false });
        return response.data;
      }),
    {
      onSuccess: () => {
        console.log('Logged out successfully');
      },
      onError: (error: any) => {
        console.error('Error during logout:', error.message);
      },
    }
  );
};

export const saveEmailToBackend = async (email: string) => {
  return await apiClient.post('/v1/auth/save-email', { email });
};

export const checkEmailExists = async (email: string) => {
  const response = await apiClient.post<{ exists: boolean }>('/v1/auth/check-email', { email });
  return response.data.exists;
};


export const useGetProfile = () => {
  const { data: session } = useSession();

  const { data, error, isLoading, refetch } = useQuery<UserProfileDTO>(
    ["userProfile", session?.user?.id],
    async () => {
      if (!session?.user?.id) throw new Error("User is not logged in");

      const response = await apiClient.get<UserProfileDTO>("/v1/profile", {
        params: { userId: session.user.id },
      });

      return response.data;
    },
    {
      enabled: !!session?.user?.id,
    }
  );

  return {
    profile: data,
    isLoading,
    error,
    refetch,
  };
};

export const useUpdateProfile = (): UseMutationResult<void, unknown, FormData> => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  return useMutation(
    async (data: FormData) => {
      if (!session?.accessToken) {
        throw new Error("No access token");
      }

      await apiClient.put('/v1/updateProfile', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${session.accessToken}`,
        },
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('userProfile');
      },
      onError: (error) => {
        console.error('Profile update failed:', error);
      },
    }
  );
};

export const useRequestPasswordReset = (): UseMutationResult<
  ResetPasswordResponse,
  unknown,
  ResetPasswordRequest
> => {
  return useMutation(
    (data: ResetPasswordRequest) => {
      return apiClient
        .post<ResetPasswordResponse>('/v1/auth/reset-password/request', data)
        .then((response) => response.data)
        .catch((error) => {
          console.error('API Error during password reset request:', error.response?.status, error.response?.data);
          throw error;
        });
    },
    {
      onSuccess: (data) => {
        console.log('Password reset email sent successfully:', data);
      },
      onError: (error: any) => {
        console.error('Error during password reset request:', error.message);
        console.error('Error details:', error.response?.data);
      },
    }
  );
};

export const useConfirmPasswordReset = (): UseMutationResult<
  ResetPasswordResponse,
  unknown,
  ConfirmResetPasswordRequest
> => {
  return useMutation(
    (data: ConfirmResetPasswordRequest) => {
      return apiClient.post<ResetPasswordResponse>('/v1/auth/reset-password/confirm', data)
      .then((response) => response.data)
      .catch((error) => {
        console.error('API Error during password reset confirmation:', error.response?.status, error.response?.data);
        throw error;
      });
    },
    {
      onSuccess: (data) => {
        console.log('Password reset confirmed successfully:', data);
      },
      onError: (error: any) => {
        console.error('Error during password reset confirmation:', error.message);
        console.error('Error details:', error.response?.data);
      }
    }
  )
}

export const useResendVerificationEmail = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ email }: { email: string }) => {
      const response = await apiClient.post(`/v1/auth/resend-verification-email?email=${encodeURIComponent(email)}`);
      if (response.status !== 200) {
        throw new Error("Failed to resend verification email");
      }
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("userProfile");
      },
      onError: (error) => {
        console.error("Failed to resend verification email:", error);
      },
    }
  );
};


export const useUser = () => {
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const loggedIn = status === 'authenticated';
  return {
    session,
    loading,
    loggedIn,
  };
};
