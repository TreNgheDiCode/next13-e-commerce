import prismadb from "@/lib/prismadb";

interface DashbaardProps {
  params: { storeId: string }
}

const DashboardPage: React.FC<DashbaardProps> = async ({
  params
}) => {
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId
    }
  })

  return ( 
    <div>Cửa hàng hiện tại: {store?.name}</div>
    
  );
}

export default DashboardPage;