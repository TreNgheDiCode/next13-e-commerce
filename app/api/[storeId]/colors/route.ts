import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function POST (
  req: Request,
  { params }: { params: { storeId: string }}
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name, value } = body;

    if (!userId) {
      return new NextResponse("Tài khoản không hợp lệ", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Yêu cầu nhập tên màu sắc", { status: 400 });
    }

    if (!value) {
      return new NextResponse("Yêu cầu nhập giá trị", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Yêu cầu mã màu sắc", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    })

    if (!storeByUserId) {
      return new NextResponse("Màu sắc không hợp lệ", { status: 403 });
    }

    const color = await prismadb.color.create({
      data: {
        name,
        value,
        storeId: params.storeId
      }
    })

    console.log(color);
    return NextResponse.json(color);
  } catch (error) {
    console.log('[COLORS_POST', error);
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

    const colors = await prismadb.color.findMany({
      where: {
        storeId: params.storeId
      }
    })

    return NextResponse.json(colors);
  } catch (error) {
    console.log('[COLORS_GET', error);
    return new NextResponse("Lỗi xảy ra", { status: 500 });
  }
}