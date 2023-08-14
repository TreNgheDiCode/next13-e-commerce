"use client";

import * as z from "zod";
import axios from "axios";
import { Trash } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Color } from "@prisma/client";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AlertModal } from "@/components/modals/alert-modal";

interface ColorFormProps {
  initialData: Color | null;
}

const formSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(4).regex(/^#/, {
    message: "Mã màu phải là giá trị thập lục phân (VD: #000000)",
  }),
})

type ColorFormValues = z.infer<typeof formSchema>;

export const ColorForm: React.FC<ColorFormProps> = ({
  initialData
}) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Chỉnh sửa màu sắc" : "Tạo mới màu sắc";
  const description = initialData ? "Chỉnh sửa màu sắc" : "Thêm mới màu sắc";
  const toastMessage = initialData ? "Cập nhật màu sắc thành công" : "Tạo màu sắc thành công";
  const action = initialData ? "Lưu thay đổi" : "Tạo mới";

  const form = useForm<ColorFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: '',
      value: '',
    }
  });

  const onSubmit = async (data: ColorFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/${params.storeId}/colors/${params.colorId}`, data);
      } else {
        await axios.post(`/api/${params.storeId}/colors`, data);
      }
      router.refresh();
      router.push(`/${params.storeId}/colors`)
      toast.success(toastMessage);
    } catch (error) {
      toast.error("Lỗi xảy ra khi tương tác với màu sắc")
    } finally {
      setLoading(false);
    }
  }

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/colors/${params.colorId}`);
      router.refresh();
      router.push(`/${params.storeId}/colors`);
      toast.success("Xóa màu sắc thành công");
    } catch (error) {
      toast.error("Bạn phải xóa tất cả sản phẩm đang sử dụng màu sắc này")
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }

  return (
    <>
      <AlertModal 
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading 
          title={title}
          description={description}
        />
        {initialData && (
          <Button
            disabled={loading}
            variant={"destructive"}
            size={"sm"}
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên màu sắc</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Nhập tên màu sắc" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Giá trị</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-x-4">
                      <Input disabled={loading} placeholder="Nhập giá trị màu sắc" {...field} />
                      <div
                        className="border p-4 rounded-full"
                        style={{ backgroundColor: field.value }}
                      >
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
              {action}
          </Button>
        </form>
      </Form>
    </>
  )
}