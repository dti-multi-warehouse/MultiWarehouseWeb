'use client'

import { QueryClient, QueryClientProvider } from "react-query"
import { ReactNode, FC } from "react";

const makeQueryClient = () => {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 1000 * 60 * 5,
            },
        },
    });
};

let browserQueryClient: QueryClient | undefined = undefined;

const getQueryClient = () => {
    if (typeof window === "undefined") {
        return makeQueryClient();
    } else {
        if (!browserQueryClient) browserQueryClient = makeQueryClient();
        return browserQueryClient;
    }
};

const ReactQueryProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const queryClient = getQueryClient();

    return (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
};

export default ReactQueryProvider;