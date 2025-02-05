"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Team } from "@/app/(dashboard)/dashboard/teams/columns"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, X } from "lucide-react"
import { useState } from "react"

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Takım adı en az 2 karakter olmalıdır.",
    }),
    category: z.string().min(2, {
        message: "Kategori seçiniz.",
    }),
    coach: z.string().min(2, {
        message: "Antrenör seçiniz.",
    }),
    players: z.array(z.string()).min(1, {
        message: "En az bir oyuncu seçilmelidir.",
    }),
    status: z.enum(["active", "inactive"], {
        required_error: "Lütfen bir durum seçiniz.",
    }),
})

interface TeamFormProps {
    initialData?: Team
    onSubmit: (data: z.infer<typeof formSchema>) => void
}

// Örnek kategoriler
const categories = [
    { label: "U13", value: "U13" },
    { label: "U15", value: "U15" },
    { label: "U17", value: "U17" },
    { label: "U19", value: "U19" },
]

// Örnek antrenörler - Bu liste API'den gelecek
const coaches = [
    { label: "Fatih Terim", value: "Fatih Terim" },
    { label: "Şenol Güneş", value: "Şenol Güneş" },
    { label: "Abdullah Avcı", value: "Abdullah Avcı" },
]

// Örnek oyuncular - Bu liste API'den gelecek
const players = [
    { label: "Ali Yılmaz", value: "Ali Yılmaz" },
    { label: "Ayşe Demir", value: "Ayşe Demir" },
    { label: "Mehmet Kaya", value: "Mehmet Kaya" },
    { label: "Zeynep Şahin", value: "Zeynep Şahin" },
    { label: "Can Öztürk", value: "Can Öztürk" },
    { label: "Elif Yıldız", value: "Elif Yıldız" },
    { label: "Burak Aydın", value: "Burak Aydın" },
    { label: "Selin Çelik", value: "Selin Çelik" },
]

const ITEMS_PER_PAGE = 5

export function TeamForm({ initialData, onSubmit }: TeamFormProps) {
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState("")
    const [currentPage, setCurrentPage] = useState(1)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: initialData?.name || "",
            category: initialData?.category || "",
            coach: initialData?.coach || "",
            players: initialData?.players ? [initialData.players.toString()] : [],
            status: initialData?.status || "active",
        },
    })

    // Arama ve sayfalama işlemleri
    const filteredPlayers = players.filter(player =>
        player.label.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const totalPages = Math.ceil(filteredPlayers.length / ITEMS_PER_PAGE)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const paginatedPlayers = filteredPlayers.slice(startIndex, startIndex + ITEMS_PER_PAGE)

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Takım Adı</FormLabel>
                            <FormControl>
                                <Input placeholder="U15 Takımı" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Kategori</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Kategori seçin" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectItem key={category.value} value={category.value}>
                                            {category.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="coach"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Antrenör</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Antrenör seçin" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {coaches.map((coach) => (
                                        <SelectItem key={coach.value} value={coach.value}>
                                            {coach.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="players"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Oyuncular</FormLabel>
                            <Card className="p-4">
                                {/* Seçili oyuncuların gösterimi */}
                                {Array.isArray(field.value) && field.value.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {field.value.map((player) => (
                                            <Badge
                                                key={player}
                                                variant="secondary"
                                                className="flex items-center gap-1"
                                            >
                                                {player}
                                                <X
                                                    className="h-3 w-3 cursor-pointer"
                                                    onClick={() => {
                                                        form.setValue(
                                                            "players",
                                                            field.value.filter((value) => value !== player),
                                                            { shouldValidate: true }
                                                        )
                                                    }}
                                                />
                                            </Badge>
                                        ))}
                                    </div>
                                )}

                                {/* Arama kutusu */}
                                <div className="relative mb-4">
                                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Oyuncu ara..."
                                        value={searchQuery}
                                        onChange={(e) => {
                                            setSearchQuery(e.target.value)
                                            setCurrentPage(1)
                                        }}
                                        className="pl-8"
                                    />
                                </div>

                                {/* Oyuncu listesi */}
                                <ScrollArea className="h-[200px]">
                                    <div className="space-y-2">
                                        {paginatedPlayers.map((player) => (
                                            <div
                                                key={player.value}
                                                className="flex items-center justify-between p-2 hover:bg-muted rounded-md cursor-pointer"
                                                onClick={() => {
                                                    const currentValue = Array.isArray(field.value) ? field.value : []
                                                    const isSelected = currentValue.includes(player.value)
                                                    const newValue = isSelected
                                                        ? currentValue.filter((value) => value !== player.value)
                                                        : [...currentValue, player.value]
                                                    form.setValue("players", newValue, { shouldValidate: true })
                                                }}
                                            >
                                                <span>{player.label}</span>
                                                {field.value?.includes(player.value) && (
                                                    <Badge>Seçili</Badge>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </ScrollArea>

                                {/* Sayfalama */}
                                {totalPages > 1 && (
                                    <div className="flex justify-center gap-2 mt-4">
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