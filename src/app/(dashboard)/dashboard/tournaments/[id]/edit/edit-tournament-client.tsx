"use client"

import { TournamentForm } from "@/components/tournaments/tournament-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { Tournament } from "../../columns"

interface EditTournamentClientProps {
    id: string
}

export function EditTournamentClient({ id }: EditTournamentClientProps) {
    const router = useRouter()

    // Burada API'den turnuva verisi çekilecek
    const tournament: Tournament = {
        id: id,
        name: "Cumhuriyet Kupası",
        startDate: "2024-05-19",
        endDate: "2024-05-21",
        location: "Ankara",
        teams: ["U15 Takımı", "U17 Takımı"],
        status: "active" as const,
    }

    const onSubmit = async (data: Record<string, unknown>) => {
        try {
            // Burada API çağrısı yapılacak
            console.log("Güncellenecek turnuva verileri:", { id, ...data })
            toast({
                title: "Başarılı!",
                description: "Turnuva başarıyla güncellendi.",
            })
            router.push("/dashboard/tournaments")
            router.refresh()
        } catch (_error) {
            toast({
                title: "Hata!",
                description: "Turnuva güncellenirken bir hata oluştu.",
                variant: "destructive",
            })
        }
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Turnuva Düzenle</h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Turnuva Bilgileri</CardTitle>
                    <CardDescription>
                        Turnuva bilgilerini güncellemek için formu düzenleyin.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <TournamentForm initialData={tournament} onSubmit={onSubmit} />
                </CardContent>
            </Card>
        </div>
    )
}
