"use client";

import React, { useEffect, useState } from 'react';
import StatusCard from '../components/StatusCard';
import { useOrdersByStatus } from '@/hooks/useOrder';
import { Order } from '@/types/datatypes';
import dynamic from 'next/dynamic';

const InProcess: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { mutate: fetchOrdersByStatus } = useOrdersByStatus('PROCESSING');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      fetchOrdersByStatus(undefined, {
        onSuccess: (response: any) => {
          if (response.success && Array.isArray(response.data)) {
            setOrders(response.data);
          }
          setLoading(false);
        },
        onError: (error) => {
          console.error('Error fetching orders by status:', error);
          setLoading(false);
        },
      });
    }
  }, [fetchOrdersByStatus]);

  return (
    <div className="flex flex-col gap-5">
      {loading ? (
        <p>Loading in-process orders...</p>
      ) : orders.length > 0 ? (
        orders.map((order) => <StatusCard key={order.id} order={order} />)
      ) : (
        <p>No in-process orders found.</p>
      )}
    </div>
  );
};

export default dynamic(() => Promise.resolve(InProcess), { ssr: false });