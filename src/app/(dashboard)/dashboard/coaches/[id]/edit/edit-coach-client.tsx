"use client"

import { CoachForm } from "@/components/coaches/coach-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { Coach } from "../../columns"

interface EditCoachClientProps {
    id: string
}

export function EditCoachClient({ id }: EditCoachClientProps) {
    const router = useRouter()

    // Burada API'den antrenör verisi çekilecek
    const coach: Coach = {
        id: id,
        name: "Fatih Terim",
        email: "fatih@example.com",
        phone: "+90 555 123 4567",
        age: 70,
        position: "Teknik Direktör",
        status: "active"
    }

    const onSubmit = async (data: Record<string, unknown>) => {
        try {
            // Burada API çağrısı yapılacak
            console.log("Güncellenecek antrenör verileri:", data)
            toast({
                title: "Başarılı!",
                description: "Antrenör başarıyla güncellendi.",
            })
            router.push("/dashboard/coaches")
            router.refresh()
        } catch (_error) {
            toast({
                title: "Hata!",
                description: "Antrenör güncellenirken bir hata oluştu.",
                variant: "destructive",
            })
        }
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Antrenör Düzenle</h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Antrenör Bilgileri</CardTitle>
                    <CardDescription>
                        Antrenör bilgilerini güncellemek için formu düzenleyin.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <CoachForm initialData={coach} onSubmit={onSubmit} />
                </CardContent>
            </Card>
        </div>
    )
}
