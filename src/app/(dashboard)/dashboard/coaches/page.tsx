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
import { Coach } from "./columns"
import { useRouter } from "next/navigation"

const coaches: Coach[] = [
    {
        id: "1",
        name: "Fatih Terim",
        email: "fatih@example.com",
        phone: "+90 555 123 4567",
        age: 70,
        position: "Teknik Direktör",
        status: "active"
    },
    {
        id: "2",
        name: "Şenol Güneş",
        email: "senol@example.com",
        phone: "+90 555 234 5678",
        age: 71,
        position: "Teknik Direktör",
        status: "active"
    },
    {
        id: "3",
        name: "Abdullah Avcı",
        email: "abdullah@example.com",
        phone: "+90 555 345 6789",
        age: 60,
        position: "Teknik Direktör",
        status: "inactive"
    },
]

export default function CoachesPage() {
    const router = useRouter()

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Antrenörler</h1>
                <Button onClick={() => router.push("/dashboard/coaches/new")}>
                    <Plus className="mr-2 h-4 w-4" />
                    Yeni Antrenör
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Tüm Antrenörler</CardTitle>
                    <CardDescription>
                        Akademideki tüm antrenörlerin listesi.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        data={coaches}
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