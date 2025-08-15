
import { useForm, useFieldArray, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Trash2, PlusCircle, Save } from "lucide-react"
import Card from "../../components/ui/card"
import { Label } from "../../components/ui/label"
import { Input } from "../../components/ui/input"
import { Textarea } from "../../components/ui/textarea"
import Button from "../../components/ui/button"
import { Select } from "../../components/ui/select"
import ImagePicker from "../../components/ui/image-picker"
import { Product, ProductFormData, productFormSchema } from "../../types/product"
import { useEffect, useState } from "react"
import axios from "axios"

interface ProductFormProps {
  product?: Product
  onSubmit: (data: FormData) => void
  isLoading?: boolean
}

export function ProductForm({ product, onSubmit, isLoading }: ProductFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      ar_name: product?.name.ar || "",
      en_name: product?.name.en || "",
      ar_description: product?.description.ar || "",
      en_description: product?.description.en || "",
      original_price: product?.price || 0,
      status: product?.status || "draft",
      discount: product?.discount,
      discount_type: product?.discount_type,
      specifications: product ? Object.entries(product.specifications).map(([key, value]) => ({ key, value })) : [{key: '', value: ''}],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "specifications",
  })

  const [image, setImage] = useState<File | undefined | null>()

  const getRemoteFile = async (url: string) => {
    const blog = await axios.get(url, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    })
    console.log(typeof blog.data);
  }

  useEffect(() => {
    getRemoteFile("C:\\Users\\RTX\\Downloads\\20250808_1007_Virevo Logo Design_simple_compose_01k24837aye6crgyxmz8bp1fwm.png")
  }, [])

  const handleFormSubmit = (data: ProductFormData) => {
    const formData = new FormData()
    
    // Convert specifications to a simple object before stringifying
    const specsObject = data.specifications?.reduce((acc, spec) => {
        if (spec.key) acc[spec.key] = spec.value;
        return acc;
    }, {} as Record<string, string>) || {};


    if(image) {
      formData.append('image', image)
    }
    console.log(specsObject);

    Object.entries(data).forEach(([key, value]) => {
      console.log(`${key} - ${value}`);
       
      if (key === 'specifications') {
        formData.append(key, JSON.stringify([specsObject]));
      } else if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });

    if (product) {
      formData.append('_method', 'PUT');
    }

    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6" dir="rtl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <h3 className="text-lg font-semibold mb-4 border-b pb-3">البيانات الأساسية</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <div>
                <Label htmlFor="ar_name">الاسم بالعربية *</Label>
                <Input id="ar_name" {...register("ar_name")} />
                {errors.ar_name && <p className="text-sm text-red-600 mt-1">{errors.ar_name.message}</p>}
              </div>
              <div>
                <Label htmlFor="en_name">الاسم بالإنجليزية *</Label>
                <Input id="en_name" {...register("en_name")} />
                {errors.en_name && <p className="text-sm text-red-600 mt-1">{errors.en_name.message}</p>}
              </div>
            </div>
            <div className="mt-4">
              <Label htmlFor="ar_description">الوصف بالعربية *</Label>
              <Textarea id="ar_description" {...register("ar_description")} rows={5} />
              {errors.ar_description && <p className="text-sm text-red-600 mt-1">{errors.ar_description.message}</p>}
            </div>
            <div className="mt-4">
              <Label htmlFor="en_description">الوصف بالإنجليزية *</Label>
              <Textarea id="en_description" {...register("en_description")} rows={5} />
              {errors.en_description && <p className="text-sm text-red-600 mt-1">{errors.en_description.message}</p>}
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold mb-4 border-b pb-3">التسعير والخصومات</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              <div>
                <Label htmlFor="original_price">السعر الأصلي *</Label>
                <Input id="original_price" type="number" {...register("original_price")} />
                {errors.original_price && <p className="text-sm text-red-600 mt-1">{errors.original_price.message}</p>}
              </div>
              <div>
                <Label htmlFor="discount">قيمة الخصم</Label>
                <Input id="discount" type="number" {...register("discount")} />
              </div>
              <div>
                <Label htmlFor="discount_type">نوع الخصم</Label>
                <Controller control={control} name="discount_type" render={({ field }) => (
                    <Select options={[{ label: "نسبة مئوية", value: "percentage" }, { label: "مبلغ ثابت", value: "fixed" }]} value={field.value} onChange={field.onChange}/>
                )}/>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex justify-between items-center mb-4 border-b pb-3">
              <h3 className="text-lg font-semibold">المواصفات</h3>
              <Button type="button" variant="secondary" size="sm" onClick={() => append({ key: "", value: "" })}>
                <PlusCircle className="w-4 h-4 ml-2" /> إضافة
              </Button>
            </div>
            <div className="space-y-3 pt-4">
              {fields.map((field, index) => (
                <div key={field.id} className="flex items-center gap-2">
                  <Input {...register(`specifications.${index}.key`)} placeholder="المفتاح (مثال: الخامة)" />
                  <Input {...register(`specifications.${index}.value`)} placeholder="القيمة (مثال: جلد طبيعي)" />
                  <Button type="button" variant="danger" size="sm" onClick={() => remove(index)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column - Side Details */}
        <div className="space-y-6">

          <Card className="space-y-4">
            <h3 className="text-lg font-semibold mb-4 border-b pb-3">الصورة الرئيسية *</h3>
            <div className="pt-4">
            <ImagePicker onChange={(file) => setImage(file as File)} multiple={false}/>
            </div>

            <div>
                    <Label htmlFor="status">حالة المنتج *</Label>
                    <Controller control={control} name="status" render={({ field }) => (
                        <Select options={[{ label: "نشط", value: "active" }, { label: "مسودة", value: "draft" }]} value={field.value} onChange={field.onChange} />
                    )} />
                    {errors.status && <p className="text-sm text-red-600 mt-1">{errors.status.message}</p>}
                </div>
          </Card>


        </div>
      </div>

      <div className="flex justify-end pt-4 border-t">
        <Button type="submit" disabled={isLoading} size="md">
          <Save className="w-4 h-4 ml-2" />
          {isLoading ? "جاري الحفظ..." : product ? "تحديث المنتج" : "إنشاء المنتج"}
        </Button>
      </div>
    </form>
  )
}