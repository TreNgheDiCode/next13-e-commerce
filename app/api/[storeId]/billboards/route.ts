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

    const { label, imageUrl } = body;

    if (!userId) {
      return new NextResponse("Tài khoản không hợp lệ", { status: 401 });
    }

    if (!label) {
      return new NextResponse("Yêu cầu nhập tiêu đề", { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse("Yêu cầu chọn ảnh đại diện", { status: 400 });
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

    const billboard = await prismadb.billboard.create({
      data: {
        label,
        imageUrl,
        storeId: params.storeId
      }
    })

    console.log(billboard);
    return NextResponse.json(billboard);
  } catch (error) {
    console.log('[BILLBOARDS_POST', error);
    return new NextResponse("Lỗi xảy ra", { status: 500 });
  }
}

export async function GET (
  req: Request,
  { params }: { params: {storeId: string }}
) {
  try {
    if (!params.storeId) {
      return new NextResponse("Yêu cầu mã cửa hàng", { status: 400 });
    }

    const billboard = await prismadb.billboard.findMany({
      where: {
        storeId: params.storeId
      }
    })

    return NextResponse.json(billboard);
  } catch (error) {
    console.log('[BILLBOARDS_GET', error);
    return new NextResponse("Lỗi xảy ra", { status: 500 });
  }
}