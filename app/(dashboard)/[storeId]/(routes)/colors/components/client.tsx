"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ColorColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

interface ColorClientProps {
  data: ColorColumn[]
}

export const ColorClient: React.FC<ColorClientProps> = ({
  data
}) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading 
          title={`Màu sắc (${data.length})`}
          description="Quản lý màu sắc của cửa hàng"
        />
        <Button onClick={() => router.push(`/${params.storeId}/colors/new`)}>
          <Plus className="hr-2 h-4 w-4"  />
          Thêm mới
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" />
      <Heading title="API" description="API cho màu sắc" />
      <Separator />
      <ApiList entityName="colors" entityIdName="colorId" />
    </>
  )
}