"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

export type ProductColumn = {
  id: string
  name: string;
  price: string;
  category: string;
  size: string;
  color: string;
  createdAt: string;
  isFeatured: boolean;
  isArchived: boolean;
}

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Tên sản phẩm",
  },
  {
    accessorKey: "isArchieved",
    header: "Trạng thái",
    cell: ({ row }) => (
      <div>
        {row.original.isArchived ? "Hết hàng" : "Còn hàng" }
      </div>
    )
  },
  {
    accessorKey: "isFeatured",
    header: "Đang đăng bán",
    cell: ({ row }) => (
      <div>
        {row.original.isFeatured ? "Có" : "Không" }
      </div>
    )
  },
  {
    accessorKey: "price",
    header: "Giá thành",
  },
  {
    accessorKey: "category",
    header: "Danh mục",
  },
  {
    accessorKey: "size",
    header: "Kích thước",
  },
  {
    accessorKey: "color",
    header: "Màu sắc",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.color}
        <div 
          className="h-6 w-6 rounded-full border"
          style={{ backgroundColor: row.original.color }}
        />
      </div>
    )
  },
  {
    accessorKey: "createdAt",
    header: "Ngày khởi tạo",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  },
];