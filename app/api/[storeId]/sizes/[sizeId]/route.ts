import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function GET (
  req: Request,
  { params }: { params: { sizeId: string } }
) {
  try {
    if (!params.sizeId) {
      return new NextResponse("Yêu cầu mã kích thước", { status: 400 });
    }

    const size = await prismadb.size.findUnique({
      where: {
        id: params.sizeId,
      }
    })

    return NextResponse.json(size);
  } catch (error) {
    console.log('[SIZE_GET]', error);
    return new NextResponse("Lỗi xảy ra", { status: 500 });
  }
}

export async function PATCH (
  req: Request,
  { params }: { params: { storeId: string, sizeId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { name, value } = body;

    if (!userId) {
      return new NextResponse("Tài khoản chưa đăng nhập", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Yêu cầu nhập tên kích thước", { status: 400 });
    }

    if (!value) {
      return new NextResponse("Yêu cầu nhập giá trị", { status: 400 });
    }

    if (!params.sizeId) {
      return new NextResponse("Yêu cầu mã kích thước", { status: 400 });
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

    const sizs = await prismadb.size.updateMany({
      where: {
        id: params.sizeId,
      },
      data: {
        name,
        value
      }
    })

    return NextResponse.json(sizs);
  } catch (error) {
    console.log('[SIZE_PATCH]', error);
    return new NextResponse("Lỗi xảy ra", { status: 500 });
  }
}

export async function DELETE (
  req: Request,
  { params }: { params: { storeId: string, sizeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Tài khoản chưa đăng nhập", { status: 401 });
    }

    if (!params.sizeId) {
      return new NextResponse("Yêu cầu mã kích thước", { status: 400 });
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

    const sizes = await prismadb.size.deleteMany({
      where: {
        id: params.sizeId,
      }
    })

    return NextResponse.json(sizes);
  } catch (error) {
    console.log('[SIZE_DELETE]', error);
    return new NextResponse("Lỗi xảy ra", { status: 500 });
  }
}