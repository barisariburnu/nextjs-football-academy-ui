"use client"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { PlusCircle } from "lucide-react"
import { columns, Team } from "./columns"
import { DataTable } from "@/components/datatable/data-table"
import { useRouter } from "next/navigation"

// Örnek takım verileri - Bu veriler API'den gelecek
const teams: Team[] = [
    {
        id: "1",
        name: "U15 Takımı",
        category: "U15",
        coach: "Fatih Terim",
        players: ["Ali Yılmaz", "Mehmet Kaya"],
        status: "active",
    },
    {
        id: "2",
        name: "U17 Takımı",
        category: "U17",
        coach: "Şenol Güneş",
        players: ["Can Öztürk", "Burak Aydın"],
        status: "active",
    },
    {
        id: "3",
        name: "U19 Takımı",
        category: "U19",
        coach: "Abdullah Avcı",
        players: ["Zeynep Şahin", "Elif Yıldız"],
        status: "inactive",
    },
]

export default function TeamsPage() {
    const router = useRouter()

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Takımlar</h1>
                <Button onClick={() => router.push("/dashboard/teams/new")}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Yeni Takım
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Tüm Takımlar</CardTitle>
                    <CardDescription>
                        Akademideki tüm takımların listesi.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        data={teams}
                        searchableColumns={[
                            {
                                id: "name",
                                title: "Takım Adı"
                            }
                        ]}
                        filterableColumns={[
                            {
                                id: "status",
                                title: "Durum",
                                options: [
                                    {
                                        label: "Aktif",
                                        value: "active",
                                    },
                                    {
                                        label: "Pasif",
                                        value: "inactive",
                                    },
                                ],
                            },
                        ]}
                    />
                </CardContent>
            </Card>
        </div>
    )
} 