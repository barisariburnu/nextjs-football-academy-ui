"use client"

import { TeamForm } from "@/components/teams/team-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { Team } from "../../columns"

interface EditTeamClientProps {
    id: string
}

export function EditTeamClient({ id }: EditTeamClientProps) {
    const router = useRouter()

    // Burada API'den takım verisi çekilecek
    const team: Team = {
        id: id,
        name: "U15 Takımı",
        coach: "Fatih Terim",
        players: [],
        category: "U15",
        status: "active" as const,
    }

    const onSubmit = async (data: Record<string, unknown>) => {
        try {
            // Burada API çağrısı yapılacak
            console.log("Güncellenecek takım verileri:", { id, ...data })
            toast({
                title: "Başarılı!",
                description: "Takım başarıyla güncellendi.",
            })
            router.push("/dashboard/teams")
            router.refresh()
        } catch (_error) {
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
                    <TeamForm initialData={team} onSubmit={onSubmit} />
                </CardContent>
            </Card>
        </div>
    )
}
