import { useMutation, useQueryClient, UseMutationResult } from 'react-query';
import apiClient from '@/lib/apiClient';
import { AxiosError, AxiosResponse } from 'axios';

// Define types for the request and response
interface RegisterUserRequest {
  email: string;
}

interface RegisterUserResponse {
  success: boolean;
  message: string;
}

interface ConfirmRegistrationRequest {
  email: string;
  password: string;
  token: string;
}

interface ConfirmRegistrationResponse {
  success: boolean;
  message: string;
}

// Hook for user registration
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
