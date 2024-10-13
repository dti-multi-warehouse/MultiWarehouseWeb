"use client";
import React, { useEffect, useState } from "react";
import StatusCard from "../components/StatusCard";
import { useOrdersByStatus } from "@/hooks/useOrder";
import { Order } from "@/types/datatypes";

const CancelOrder: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const { mutate: fetchOrdersByStatus } = useOrdersByStatus("CANCELLED");

  useEffect(() => {
    console.log("Fetching orders...");
    fetchOrdersByStatus(undefined, {
      onSuccess: (response: any) => {
        console.log("Orders fetched successfully:", response);
        if (response.success && Array.isArray(response.data)) {
          setOrders(response.data);
        } else {
          console.error("Unexpected response structure:", response);
        }
      },
      onError: (error) => {
        console.error("Error fetching orders by status:", error);
      },
    });
  }, [fetchOrdersByStatus]);

  console.log("Current orders state:", orders);

  return (
    <>
    <div className="flex flex-col gap-5">
      {orders.length > 0 ? (
        orders.map((order) => (
          <StatusCard key={order.id} order={order} />
        ))
      ) : (
        <p>No cancelled orders found.</p>
      )}
    </div>
    </>
  );
};

export default CancelOrder;