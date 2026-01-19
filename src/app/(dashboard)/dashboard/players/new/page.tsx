"use client"

import { PlayerForm } from "@/components/players/player-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"

export default function NewPlayerPage() {
    const router = useRouter()

    const onSubmit = async (data: Record<string, unknown>) => {
        try {
            // Burada API çağrısı yapılacak
            console.log("Yeni oyuncu verileri:", data)
            toast({
                title: "Başarılı!",
                description: "Oyuncu başarıyla eklendi.",
            })
            router.push("/dashboard/players")
            router.refresh()
        } catch {
            toast({
                title: "Hata!",
                description: "Oyuncu eklenirken bir hata oluştu.",
                variant: "destructive",
            })
        }
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Yeni Oyuncu</h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Oyuncu Bilgileri</CardTitle>
                    <CardDescription>
                        Yeni oyuncu eklemek için formu doldurun.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <PlayerForm onSubmit={onSubmit} />
                </CardContent>
            </Card>
        </div>
    )
} 