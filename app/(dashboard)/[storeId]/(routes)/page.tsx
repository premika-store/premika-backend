// import prismadb from "@/lib/prismadb";
// import { auth } from "@clerk/nextjs";
// import { redirect } from "next/navigation";

import { CreditCardIcon, DollarSign, Package } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { formatter } from "@/lib/utils";
import getTotalRevenue from "@/app/actions/get-total-revenue";
import getSalesCount from "@/app/actions/get-sales-count";
import getStockCount from "@/app/actions/get-stock-count";
import Overview from "@/components/overview";

// const DashboardPage = async () => {
//   const { userId } = auth();

//   if (!userId) {
//     redirect("/sign-in");
//   }

//   const stores = await prismadb.store.findMany({
//     where: {
//       userId: userId,
//     },
//   });

//   return (
//     <>
//       {stores.map((store) => (
//         <div key={store.id}>{store.name}</div>
//       ))}
//     </>
//   );
// };

// export default DashboardPage;

interface DashboardPageProps {
  params: {
    storeId: string;
  };
}

const DashboardPage: React.FC<DashboardPageProps> = async ({
  params
}) => {

  const totalRevenue = await getTotalRevenue(params.storeId);
  const salesCount = await getSalesCount(params.storeId);
  const stockCount = await getStockCount(params.storeId);

  return (
    <div className="flex-col ">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading title="Dashboard" description="Overview of your store" />
        <Separator />
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className=" text-muted-foreground size-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatter.format(totalRevenue)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sales</CardTitle>
              <CreditCardIcon className=" text-muted-foreground size-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{salesCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Products in Stock
              </CardTitle>
              <Package className=" text-muted-foreground size-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stockCount}</div>
            </CardContent>
          </Card>
        </div>

        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <Overview data = {[]} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
