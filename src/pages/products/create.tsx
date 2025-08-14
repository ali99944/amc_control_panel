"use client"

import { useCreateProduct } from "../../hooks/use-products"
import Toolbar from "../../components/ui/toolbar"
import Button from "../../components/ui/button"
import { ArrowRight } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { ProductForm } from "./product_form"

export default function CreateProductPage() {
  const { mutate: createProduct, isPending } = useCreateProduct()
  const navigate = useNavigate()

  return (
    <div className="space-y-6" dir="rtl">
      <Toolbar title="إضافة منتج جديد">
        <Button variant="secondary" onClick={() => navigate("/products")}>
          <ArrowRight className="w-4 h-4 ml-2" />
          العودة إلى المنتجات
        </Button>
      </Toolbar>
      <ProductForm onSubmit={createProduct} isLoading={isPending} />
    </div>
  )
}