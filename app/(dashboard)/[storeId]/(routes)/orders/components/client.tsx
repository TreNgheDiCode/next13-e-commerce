"use client";

import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { columns, OrderColumn } from "./columns";

interface OrderClientProps {
  data: OrderColumn[];
}

export const OrderClient: React.FC<OrderClientProps> = ({
  data
}) => {
  return (
    <>
      <Heading 
        title={`Đơn hàng (${data.length})`}
        description="Quản lý đơn hàng của cửa hàng"
      />
      <Separator />
      <DataTable columns={columns} data={data} searchKey="products" />
    </>
  )
};