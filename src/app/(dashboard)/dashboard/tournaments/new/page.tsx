"use client"

import { TournamentForm } from "@/components/tournaments/tournament-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"

export default function NewTournamentPage() {
    const router = useRouter()

    const onSubmit = async (data: Record<string, unknown>) => {
        try {
            // Burada API çağrısı yapılacak
            console.log("Yeni turnuva verileri:", data)
            toast({
                title: "Başarılı!",
                description: "Turnuva başarıyla eklendi.",
            })
            router.push("/dashboard/tournaments")
            router.refresh()
        } catch {
            toast({
                title: "Hata!",
                description: "Turnuva eklenirken bir hata oluştu.",
                variant: "destructive",
            })
        }
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Yeni Turnuva</h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Turnuva Bilgileri</CardTitle>
                    <CardDescription>
                        Yeni turnuva eklemek için formu doldurun.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <TournamentForm onSubmit={onSubmit} />
                </CardContent>
            </Card>
        </div>
    )
} 