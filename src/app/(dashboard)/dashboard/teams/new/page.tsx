"use client"

import { TeamForm } from "@/components/teams/team-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"

export default function NewTeamPage() {
    const router = useRouter()

    const onSubmit = async (data: any) => {
        try {
            // Burada API çağrısı yapılacak
            console.log("Yeni takım verileri:", data)
            toast({
                title: "Başarılı!",
                description: "Takım başarıyla eklendi.",
            })
            router.push("/dashboard/teams")
            router.refresh()
        } catch (error) {
            toast({
                title: "Hata!",
                description: "Takım eklenirken bir hata oluştu.",
                variant: "destructive",
            })
        }
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Yeni Takım</h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Takım Bilgileri</CardTitle>
                    <CardDescription>
                        Yeni takım eklemek için formu doldurun.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <TeamForm onSubmit={onSubmit} />
                </CardContent>
            </Card>
        </div>
    )
} 