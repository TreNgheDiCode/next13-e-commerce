"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

export type SizeColumn = {
  id: string
  name: string;
  value: string;
  createdAt: string;
}

export const columns: ColumnDef<SizeColumn>[] = [
  {
    accessorKey: "name",
    header: "Tên kích thước",
  },
  {
    accessorKey: "value",
    header: "Giá trị",
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