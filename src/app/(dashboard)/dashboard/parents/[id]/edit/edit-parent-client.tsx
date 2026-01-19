"use client"

import { ParentForm } from "@/components/parents/parent-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { Parent } from "../../columns"

interface EditParentClientProps {
    id: string
}

export function EditParentClient({ id }: EditParentClientProps) {
    const router = useRouter()

    // Burada API'den veli verisi çekilecek
    const parent: Parent = {
        id: id,
        name: "Ali Veli",
        email: "ali@example.com",
        phone: "+90 555 123 4567",
        children: ["Ahmet Yılmaz"],
        status: "active"
    }

    const onSubmit = async (data: Record<string, unknown>) => {
        try {
            // Burada API çağrısı yapılacak
            console.log("Güncellenecek veli verileri:", data)
            toast({
                title: "Başarılı!",
                description: "Veli başarıyla güncellendi.",
            })
            router.push("/dashboard/parents")
            router.refresh()
        } catch {
            toast({
                title: "Hata!",
                description: "Veli güncellenirken bir hata oluştu.",
                variant: "destructive",
            })
        }
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Veli Düzenle</h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Veli Bilgileri</CardTitle>
                    <CardDescription>
                        Veli bilgilerini güncellemek için formu düzenleyin.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ParentForm initialData={parent} onSubmit={onSubmit} />
                </CardContent>
            </Card>
        </div>
    )
}
