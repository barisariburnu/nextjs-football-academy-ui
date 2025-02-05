"use client"

import { TeamForm } from "@/components/teams/team-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"

export default function EditTeamPage({ params }: { params: { id: string } }) {
    const router = useRouter()

    // Örnek takım verisi - Bu veri API'den gelecek
    const teamData = {
        id: params.id,
        name: "U15 Takımı",
        category: "U15",
        coach: "Fatih Terim",
        players: ["Ali Yılmaz", "Mehmet Kaya"],
        status: "active" as const,
    }

    const onSubmit = async (data: any) => {
        try {
            // Burada API çağrısı yapılacak
            console.log("Güncellenecek takım verileri:", data)
            toast({
                title: "Başarılı!",
                description: "Takım başarıyla güncellendi.",
            })
            router.push("/dashboard/teams")
            router.refresh()
        } catch (error) {
            toast({
                title: "Hata!",
                description: "Takım güncellenirken bir hata oluştu.",
                variant: "destructive",
            })
        }
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Takım Düzenle</h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Takım Bilgileri</CardTitle>
                    <CardDescription>
                        Takım bilgilerini güncellemek için formu düzenleyin.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <TeamForm initialData={teamData} onSubmit={onSubmit} />
                </CardContent>
            </Card>
        </div>
    )
} 