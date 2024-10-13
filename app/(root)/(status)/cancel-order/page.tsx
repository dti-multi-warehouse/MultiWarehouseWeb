"use client"; // Ensures the component only runs on the client side

import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import StatusCard from '../components/StatusCard';
import { useOrdersByStatus } from '@/hooks/useOrder';
import { Order } from '@/types/datatypes';

const CancelOrder: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { mutate: fetchOrdersByStatus } = useOrdersByStatus('CANCELLED');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      fetchOrdersByStatus(undefined, {
        onSuccess: (response: any) => {
          if (response.success && Array.isArray(response.data)) {
            setOrders(response.data);
          } else {
            console.error('Unexpected response structure:', response);
          }
          setLoading(false);
        },
        onError: (error) => {
          console.error('Error fetching orders:', error);
          setLoading(false);
        },
      });
    }
  }, [fetchOrdersByStatus]);

  return (
    <div className="flex flex-col gap-5">
      {loading ? (
        <p>Loading cancelled orders...</p>
      ) : orders.length > 0 ? (
        orders.map((order) => <StatusCard key={order.id} order={order} />)
      ) : (
        <p>No cancelled orders found.</p>
      )}
    </div>
  );
};

export default dynamic(() => Promise.resolve(CancelOrder), { ssr: false });
