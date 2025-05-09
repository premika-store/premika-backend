import prismadb from "@/lib/prismadb";
import React from "react";
import ColorForm from "./components/color-form";

const ColorPage = async ({ params }: { params: { colorId: string } }) => {
  const color = await prismadb.color.findFirst({
    where: {
      id: params.colorId,
    },
  });

  return (
    <div className="flex-cols">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorForm initalData={color} />
      </div>
    </div>
  );
};

export default ColorPage;
