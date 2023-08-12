"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

export const BillboardClient = () => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading 
          title="Quảng cáo (0)"
          description="Quản lý quảng cáo của cửa hàng"
        />
        <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
          <Plus className="hr-2 h-4 w-4"  />
          Thêm mới
        </Button>
      </div>
      <Separator />
    </>
  )
}