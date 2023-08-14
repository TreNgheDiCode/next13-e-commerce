import { format } from "date-fns";
import { vi } from "date-fns/locale";

import { SizeClient } from "./components/client";

import prismadb from "@/lib/prismadb";
import { SizeColumn } from "./components/columns";

const SizesPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc"
    }
  })

  const formattedSizes: SizeColumn[] = sizes.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "13 MMMM, yyyy", {locale: vi})
  }))

  return (  
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeClient data={formattedSizes} />
      </div>
    </div>
  );
}

export default SizesPage;