"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import ApiList from "@/components/ui/api-list";

import { ProductColumn, columns } from "./columns";

interface ProductClientProps {
    data: ProductColumn[];
}


const ProductClient: React.FC<ProductClientProps> = ({
  data
}) => {
    const router = useRouter();
    const params = useParams();

  return (
    <>
    <div className="flex items-center justify-between ">
        <Heading
            title={`Products (${data.length})`}
            description="Manage your products here."

        />
        <Button onClick={()=> {router.push(`/${params.storeId}/products/new`)}}>
            <Plus className="mr-2 size-4" />
            Add New
        </Button>
    </div>
    <Separator />
    <DataTable searchKey="name" columns={columns} data={data} />
    <Heading title="API" description="API calls for Products" />
    <Separator />
    <ApiList entityName="products" entityIdName="productId" />
    </>
  );
};

export default ProductClient;
