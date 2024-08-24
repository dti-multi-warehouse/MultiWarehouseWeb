import { useMutation, useQueryClient, UseMutationResult } from 'react-query';
import apiClient from '@/lib/apiClient';
import { AxiosError, AxiosResponse } from 'axios';
import { getSession, signIn, signOut, useSession } from 'next-auth/react';
import { ConfirmRegistrationRequest, ConfirmRegistrationResponse, LoginRequest, LoginResponse, LogoutRequest, RegisterUserRequest, RegisterUserResponse } from '@/types/datatypes';

export const useRegisterUser = (): UseMutationResult<RegisterUserResponse, unknown, RegisterUserRequest> => {
  const queryClient = useQueryClient();
  
  return useMutation(
    (data: RegisterUserRequest) =>
      apiClient.post<RegisterUserResponse>('/api/v1/register', data).then((response) => response.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('user');
      },
      onError: (error) => {
        console.error("Error during registration:", error);
      },
    }
  );
};

export const useConfirmRegistration = (): UseMutationResult<ConfirmRegistrationResponse, unknown, ConfirmRegistrationRequest> => {
    return useMutation(
        (data: ConfirmRegistrationRequest) => {
            console.log("Sending confirmation request with data:", data); // Add this log
            return apiClient.post<ConfirmRegistrationResponse>('/api/v1/register/confirm', data)
                .then((response: AxiosResponse<ConfirmRegistrationResponse>) => response.data)
                .catch((error: AxiosError) => {
                    console.error("API Error:", error.response?.status, error.response?.data);
                    throw error;
                });
        },
        {
            onSuccess: (data) => {
                console.log("Registration confirmed successfully:", data);
            },
            onError: (error: AxiosError) => {
                console.error("Error during confirmation:", error.message);
                console.error("Error details:", error.response?.data);
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

      // Fetch the session to get the user data
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
        console.error("Error during login:", error.message);
      },
    }
  );
};


export const useLogoutUser = (): UseMutationResult<void, unknown, LogoutRequest> => {
  return useMutation(
    (data: LogoutRequest) =>
      apiClient.post('/api/v1/logout', { token: data.token }).then((response) => {
        signOut({ redirect: false });
        return response.data;
      }),
    {
      onSuccess: () => {
        console.log("Logged out successfully");
      },
      onError: (error: AxiosError) => {
        console.error("Error during logout:", error.message);
      },
    }
  );
};

export const useUser = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const loggedIn = status === "authenticated";

  return {
    session,
    loading,
    loggedIn,
  };
};