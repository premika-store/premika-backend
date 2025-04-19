import { format} from "date-fns";

import prismadb from "@/lib/prismadb";

import BillboardClient from "./components/client";
import { BillboardColumn } from "./components/columns";

const BillboardsPage = async ({ params }: { params: { storeId: string } }) => {
  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      created_at: "desc",
    },
  });

  const formattedBillboards: BillboardColumn[] =  billboards.map((item) => ({
    id: item.id,
    label: item.label,
    created_at: format(item.created_at, "MMMM do, yyyy")

  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedBillboards} />
      </div>
    </div>
  );
};

export default BillboardsPage;
