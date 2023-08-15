"use client"

import { ColumnDef } from "@tanstack/react-table"

export type OrderColumn = {
  id: string
  phone: string
  address: string
  isPaid: boolean
  totalPrice: string
  products: string
  createdAt: string;
}

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "products",
    header: "Danh sách sản phẩm",
  },
  {
    accessorKey: "phone",
    header: "Số điện thoại",
  },
  {
    accessorKey: "address",
    header: "Địa chỉ",
  },
  {
    accessorKey: "totalPrice",
    header: "Thành tiền",
  },
  {
    accessorKey: "isPaid",
    header: "Trạng thái",
    cell: ({ row }) => (
      <div>
        {row.original.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
      </div>
    )
  },
  {
    accessorKey: "createdAt",
    header: "Ngày khởi tạo",
  }
]
