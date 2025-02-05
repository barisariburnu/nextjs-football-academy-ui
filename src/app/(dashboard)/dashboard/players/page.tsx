"use client"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Plus } from "lucide-react"
import { columns } from "./columns"
import { DataTable } from "@/components/datatable/data-table"
import { Player } from "./columns"

const players: Player[] = [
    {
        id: "1",
        name: "Ahmet Yılmaz",
        email: "ahmet@example.com",
        phone: "+90 555 123 4567",
        age: 15,
        position: "Forvet",
        status: "active"
    },
    {
        id: "2",
        name: "Mehmet Demir",
        email: "mehmet@example.com",
        phone: "+90 555 234 5678",
        age: 14,
        position: "Orta Saha",
        status: "active"
    },
    {
        id: "3",
        name: "Ali Kaya",
        email: "ali@example.com",
        phone: "+90 555 345 6789",
        age: 16,
        position: "Defans",
        status: "inactive"
    },
]

export default function PlayersPage() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Oyuncular</h1>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Yeni Oyuncu
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Tüm Oyuncular</CardTitle>
                    <CardDescription>
                        Akademideki tüm oyuncuların listesi.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        data={players}
                        searchableColumns={[
                            {
                                id: "name",
                                title: "İsim"
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