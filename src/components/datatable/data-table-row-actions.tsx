"use client"

import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Edit, Copy, Trash } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"
import { toast } from "@/components/ui/use-toast"

interface DataTableRowActionsProps<TData> {
    row: Row<TData>
}

export function DataTableRowActions<TData>({
    row,
}: DataTableRowActionsProps<TData>) {
    const router = useRouter()
    const pathname = usePathname()
    const data = row.original as Record<string, unknown>

    // URL'den entity type'ı al (players, coaches, parents)
    const entityType = pathname.split("/").filter(Boolean)[1]

    const onCopy = async () => {
        try {
            const newData = { ...data }
            delete newData.id
            // Burada API çağrısı yapılacak
            console.log("Kopyalanacak veri:", newData)
            toast({
                title: "Başarılı!",
                description: "Kayıt başarıyla kopyalandı.",
            })
            router.refresh()
        } catch {
            toast({
                title: "Hata!",
                description: "Kayıt kopyalanırken bir hata oluştu.",
                variant: "destructive",
            })
        }
    }

    const onDelete = async () => {
        try {
            // Burada API çağrısı yapılacak
            console.log("Silinecek kayıt ID:", data.id)
            toast({
                title: "Başarılı!",
                description: "Kayıt başarıyla silindi.",
            })
            router.refresh()
        } catch {
            toast({
                title: "Hata!",
                description: "Kayıt silinirken bir hata oluştu.",
                variant: "destructive",
            })
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                >
                    <DotsHorizontalIcon className="h-4 w-4" />
                    <span className="sr-only">Menüyü aç</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
                <DropdownMenuItem onClick={() => router.push(`/dashboard/${entityType}/${data.id}/edit`)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Düzenle
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onCopy}>
                    <Copy className="mr-2 h-4 w-4" />
                    Kopyala
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onDelete} className="text-red-600">
                    <Trash className="mr-2 h-4 w-4" />
                    Sil
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
} 