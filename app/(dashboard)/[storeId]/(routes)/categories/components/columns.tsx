"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

export type CategoryColumn = {
  id: string
  name: string,
  billboardLabel: string,
  createdAt: string;
}

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: "name",
    header: "Tên danh mục",
  },
  {
    accessorKey: "billboard",
    header: "Quảng cáo",
    cell: ({ row }) => row.original.billboardLabel
  },
  {
    accessorKey: "createdAt",
    header: "Ngày khởi tạo",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  }
]