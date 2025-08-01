// Code Generated by Sidekick is for learning and experimentation purposes only.
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

// GET: Get product by ID
export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    if (!params.productId) {
      return new NextResponse("Product Id is required", { status: 400 });
    }

    const product = await prismadb.product.findUnique({
      where: { id: params.productId },
      include: {
        images: true,
        category: true,
        color: true,
        productSizes: {
          include: {
            size: true,
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// PATCH: Update product by ID
export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const {
      name,
      price,
      categoryId,
      colorId,
      images,
      isFeatured,
      isArchived,
      productSizes, // [{ sizeId, stock, unlimitedStock }]
    } = body;

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });
    if (!name) return new NextResponse("Name is required", { status: 400 });
    if (!price) return new NextResponse("Price is required", { status: 400 });
    if (!categoryId)
      return new NextResponse("Category ID is required", { status: 400 });
    if (!colorId)
      return new NextResponse("Color ID is required", { status: 400 });
    if (!images || !images.length)
      return new NextResponse("Images is required", { status: 400 });
    if (!params.productId)
      return new NextResponse("Product Id is required", { status: 400 });

    const storeByUserId = await prismadb.store.findFirst({
      where: { id: params.storeId, userId },
    });
    if (!storeByUserId)
      return new NextResponse("Unauthorized", { status: 403 });

    // Delete old images and productSizes
    await prismadb.product.update({
      where: { id: params.productId },
      data: {
        name,
        price,
        categoryId,
        colorId,
        images: { deleteMany: {} },
        productSizes: { deleteMany: {} },
        isFeatured,
        isArchived,
      },
    });

    // Add new images and productSizes
    const product = await prismadb.product.update({
      where: { id: params.productId },
      data: {
        images: {
          createMany: {
            data: images.map((image: string) => ({ url: image })),
          },
        },
        productSizes: {
          createMany: {
            data:
              productSizes?.map(
                (ps: {
                  sizeId: string;
                  stock: number;
                  unlimitedStock?: boolean;
                }) => ({
                  sizeId: ps.sizeId,
                  stock: ps.stock,
                  unlimitedStock: ps.unlimitedStock ?? false,
                })
              ) || [],
          },
        },
      },
      include: {
        images: true,
        category: true,
        color: true,
        productSizes: {
          include: {
            size: true,
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// DELETE: Delete product by ID
export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });
    if (!params.productId)
      return new NextResponse("Product Id is required", { status: 400 });

    const storeByUserId = await prismadb.store.findFirst({
      where: { id: params.storeId, userId },
    });
    if (!storeByUserId)
      return new NextResponse("Unauthorized", { status: 403 });

    const product = await prismadb.product.delete({
      where: { id: params.productId },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
