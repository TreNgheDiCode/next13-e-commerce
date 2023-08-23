import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function POST (
  req: Request,
  { params }: { params: {storeId: string }}
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { 
      name,
      price,
      categoryId,
      colorId,
      sizeId,
      images,
      isFeatured,
      isArchieved
    } = body;

    if (!userId) {
      return new NextResponse("Tài khoản không hợp lệ", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Yêu cầu nhập tên sản phẩm", { status: 400 });
    }

    if (!images || !images.length) {
      return new NextResponse("Yêu cầu chọn ít nhất 1 ảnh cho sản phẩm", { status: 400 });
    }

    if (!price) {
      return new NextResponse("Yêu cầu nhập giá thành", { status: 400 });
    }
    
    if (!categoryId) {
      return new NextResponse("Yêu cầu chọn danh mục", { status: 400 });
    }

    if (!sizeId) {
      return new NextResponse("Yêu cầu chọn kích thước", { status: 400 });
    }

    if (!colorId) {
      return new NextResponse("Yêu cầu chọn màu sắc", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Yêu cầu mã cửa hàng", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    })

    if (!storeByUserId) {
      return new NextResponse("Cửa hàng không hợp lệ", { status: 403 });
    }

    const product = await prismadb.product.create({
      data: {
        name,
        price,
        isFeatured,
        isArchieved,
        categoryId,
        colorId,
        sizeId,
        storeId: params.storeId,
        images: {
          createMany: {
            data: [
              ...images.map((image: { url: string }) => image)
            ]
          }
        }
      }
    })

    console.log(product);
    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCTS_POST', error);
    return new NextResponse("Lỗi xảy ra", { status: 500 });
  }
}

export async function GET (
  req: Request,
  { params }: { params: { storeId: string }}
) {
  try {
    const { searchParams } = new URL(req.url)
    const categoryId = searchParams.get('categoryId') || undefined;
    const colorId = searchParams.get('colorId') || undefined;
    const sizeId = searchParams.get('sizeId') || undefined;
    const isFeatured = searchParams.get('isFeatured');

    if (!params.storeId) {
      return new NextResponse("Yêu cầu mã cửa hàng", { status: 400 });
    }

    const products = await prismadb.product.findMany({
      where: {
        storeId: params.storeId,
        categoryId,
        colorId,
        sizeId,
        isFeatured: isFeatured ? true : undefined,
        isArchieved: false,
      },
      include: {
        images: true,
        category: true,
        color: true,
        size: true,
      },
      orderBy: {
        createdAt: 'desc',
      }
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log('[PRODUCTS_GET', error);
    return new NextResponse("Lỗi xảy ra", { status: 500 });
  }
}