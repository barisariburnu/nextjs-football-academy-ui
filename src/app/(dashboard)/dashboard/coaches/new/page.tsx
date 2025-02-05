"use client"

import { CoachForm } from "@/components/coaches/coach-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"

export default function NewCoachPage() {
    const router = useRouter()

    const onSubmit = async (data: any) => {
        try {
            // Burada API çağrısı yapılacak
            console.log("Yeni antrenör verileri:", data)
            toast({
                title: "Başarılı!",
                description: "Antrenör başarıyla eklendi.",
            })
            router.push("/dashboard/coaches")
            router.refresh()
        } catch (error) {
            toast({
                title: "Hata!",
                description: "Antrenör eklenirken bir hata oluştu.",
                variant: "destructive",
            })
        }
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Yeni Antrenör</h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Antrenör Bilgileri</CardTitle>
                    <CardDescription>
                        Yeni antrenör eklemek için formu doldurun.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <CoachForm onSubmit={onSubmit} />
                </CardContent>
            </Card>
        </div>
    )
} 