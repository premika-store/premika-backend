import prismadb from "@/lib/prismadb";
import React from "react";
import BillboardForm from "./components/billboard-form";

const BillboardPage = async ({
  params,
}: {
  params: { billboardId: string };
}) => {
  const billboard = await prismadb.billboard.findFirst({
    where: {
      id: params.billboardId,
    },
  });

  return (
    <div className="flex-cols">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm initalData={billboard} />
      </div>
    </div>
  );
};

export default BillboardPage;
