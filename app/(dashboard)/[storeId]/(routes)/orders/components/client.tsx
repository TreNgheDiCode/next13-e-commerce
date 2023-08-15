"use client";

import { useParams, useRouter } from "next/navigation";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { OrderColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

interface OrderClientProps {
  data: OrderColumn[]
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
}