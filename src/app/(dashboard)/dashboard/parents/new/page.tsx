"use client"

import { ParentForm } from "@/components/parents/parent-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"

export default function NewParentPage() {
    const router = useRouter()

    const onSubmit = async (data: Record<string, unknown>) => {
        try {
            // Burada API çağrısı yapılacak
            console.log("Yeni veli verileri:", data)
            toast({
                title: "Başarılı!",
                description: "Veli başarıyla eklendi.",
            })
            router.push("/dashboard/parents")
            router.refresh()
        } catch {
            toast({
                title: "Hata!",
                description: "Veli eklenirken bir hata oluştu.",
                variant: "destructive",
            })
        }
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Yeni Veli</h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Veli Bilgileri</CardTitle>
                    <CardDescription>
                        Yeni veli eklemek için formu doldurun.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ParentForm onSubmit={onSubmit} />
                </CardContent>
            </Card>
        </div>
    )
} 