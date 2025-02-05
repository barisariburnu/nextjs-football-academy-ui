"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Parent } from "@/app/(dashboard)/dashboard/parents/columns"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, X } from "lucide-react"
import { useState, useEffect } from "react"

// Örnek öğrenci listesi - Bu veri API'den gelecek
const availableChildren = [
    "Ali Yılmaz",
    "Mehmet Kaya",
    "Ayşe Yılmaz",
    "Zeynep Şahin",
    "Can Öztürk",
    "Burak Aydın",
    "Elif Yıldız",
]

const formSchema = z.object({
    name: z.string().min(2, {
        message: "İsim en az 2 karakter olmalıdır.",
    }),
    email: z.string().email({
        message: "Geçerli bir e-posta adresi giriniz.",
    }),
    phone: z.string().min(10, {
        message: "Geçerli bir telefon numarası giriniz.",
    }),
    children: z.array(z.string()).min(1, {
        message: "En az bir çocuk seçilmelidir.",
    }),
    status: z.enum(["active", "inactive"], {
        required_error: "Lütfen bir durum seçiniz.",
    }),
})

interface ParentFormProps {
    initialData?: Parent
    onSubmit: (data: z.infer<typeof formSchema>) => void
}

export function ParentForm({ initialData, onSubmit }: ParentFormProps) {
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 4
    const [allChildren, setAllChildren] = useState<string[]>([])

    useEffect(() => {
        // Başlangıçta tüm çocukları set et
        setAllChildren(availableChildren)
    }, [])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: initialData?.name ?? "",
            email: initialData?.email ?? "",
            phone: initialData?.phone ?? "",
            children: initialData?.children ?? [],
            status: initialData?.status ?? "active",
        },
    })

    const selectedChildren = form.watch("children")

    const filteredChildren = allChildren.filter(child =>
        child.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !selectedChildren.includes(child)
    )

    const totalPages = Math.ceil(filteredChildren.length / itemsPerPage)
    const currentChildren = filteredChildren.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    )

    const handleChildSelect = (child: string) => {
        const currentChildren = form.getValues("children")
        if (!currentChildren.includes(child)) {
            form.setValue("children", [...currentChildren, child])
        }
    }

    const handleChildRemove = (child: string) => {
        const currentChildren = form.getValues("children")
        form.setValue("children", currentChildren.filter(c => c !== child))
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>İsim</FormLabel>
                            <FormControl>
                                <Input placeholder="Ahmet Yılmaz" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>E-posta</FormLabel>
                            <FormControl>
                                <Input placeholder="ornek@mail.com" type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Telefon</FormLabel>
                            <FormControl>
                                <Input placeholder="+90 555 123 4567" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="children"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Çocuklar</FormLabel>
                            <Card className="p-4">
                                <div className="space-y-4">
                                    <div className="flex flex-wrap gap-2">
                                        {field.value.map((child) => (
                                            <Badge
                                                key={child}
                                                variant="default"
                                                className="gap-1 pr-0.5"
                                            >
                                                <span className="text-xs">{child}</span>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-4 w-4 hover:bg-transparent"
                                                    onClick={() => handleChildRemove(child)}
                                                >
                                                    <X className="h-3 w-3" />
                                                </Button>
                                            </Badge>
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Search className="h-4 w-4 text-muted-foreground" />
                                        <Input
                                            placeholder="Çocuk ara..."
                                            value={searchQuery}
                                            onChange={(e) => {
                                                setSearchQuery(e.target.value)
                                                setCurrentPage(1)
                                            }}
                                            className="h-8"
                                        />
                                    </div>
                                    <ScrollArea className="h-[120px]">
                                        <div className="space-y-2">
                                            {currentChildren.map((child) => (
                                                <Button
                                                    key={child}
                                                    variant="ghost"
                                                    className="w-full justify-start font-normal"
                                                    onClick={() => handleChildSelect(child)}
                                                >
                                                    {child}
                                                </Button>
                                            ))}
                                        </div>
                                    </ScrollArea>
                                    {totalPages > 1 && (
                                        <div className="flex items-center justify-center gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                                disabled={currentPage === 1}
                                            >
                                                Önceki
                                            </Button>
                                            <span className="flex items-center">
                                                {currentPage} / {totalPages}
                                            </span>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                                disabled={currentPage === totalPages}
                                            >
                                                Sonraki
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </Card>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Durum</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Durum seçin" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="active">Aktif</SelectItem>
                                    <SelectItem value="inactive">Pasif</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-end gap-4">
                    <Button type="submit">Kaydet</Button>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.back()}
                    >
                        İptal
                    </Button>
                </div>
            </form>
        </Form>
    )
} 