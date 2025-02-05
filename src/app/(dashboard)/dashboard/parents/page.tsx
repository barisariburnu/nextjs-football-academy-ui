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
import { Parent } from "./columns"

const parents: Parent[] = [
    {
        id: "1",
        name: "Ahmet Yılmaz",
        email: "ahmet@example.com",
        phone: "+90 555 123 4567",
        children: ["Ali Yılmaz", "Ayşe Yılmaz"],
        status: "active"
    },
    {
        id: "2",
        name: "Mehmet Demir",
        email: "mehmet@example.com",
        phone: "+90 555 234 5678",
        children: ["Can Demir"],
        status: "active"
    },
    {
        id: "3",
        name: "Fatma Kaya",
        email: "fatma@example.com",
        phone: "+90 555 345 6789",
        children: ["Zeynep Kaya", "Mustafa Kaya", "Elif Kaya"],
        status: "inactive"
    },
]

export default function ParentsPage() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Veliler</h1>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Yeni Veli
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Tüm Veliler</CardTitle>
                    <CardDescription>
                        Akademideki tüm velilerin listesi.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        data={parents}
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