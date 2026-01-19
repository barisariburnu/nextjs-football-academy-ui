"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Player } from "@/app/(dashboard)/dashboard/players/columns"
import { useRouter } from "next/navigation"

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
    age: z.coerce.number().min(5).max(25, {
        message: "Yaş 5 ile 25 arasında olmalıdır.",
    }),
    position: z.string({
        required_error: "Lütfen bir pozisyon seçiniz.",
    }),
    status: z.enum(["active", "inactive"], {
        required_error: "Lütfen bir durum seçiniz.",
    }),
})

interface PlayerFormProps {
    initialData?: Player
    onSubmit: (data: z.infer<typeof formSchema>) => void
}

export function PlayerForm({ initialData, onSubmit }: PlayerFormProps) {
    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: initialData?.name || "",
            email: initialData?.email || "",
            phone: initialData?.phone || "",
            age: initialData?.age || 0,
            position: initialData?.position || "",
            status: initialData?.status || "active",
        },
    })

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                                <Input placeholder="ornek@mail.com" {...field} />
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
                    name="age"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Yaş</FormLabel>
                            <FormControl>
                                <Input type="number" min={5} max={25} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="position"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Pozisyon</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pozisyon seçiniz" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Kaleci">Kaleci</SelectItem>
                                    <SelectItem value="Defans">Defans</SelectItem>
                                    <SelectItem value="Orta Saha">Orta Saha</SelectItem>
                                    <SelectItem value="Forvet">Forvet</SelectItem>
                                </SelectContent>
                            </Select>
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
                                        <SelectValue placeholder="Durum seçiniz" />
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
                    <Button type="button" variant="outline" onClick={() => router.back()}>
                        İptal
                    </Button>
                    <Button type="submit">
                        {initialData ? "Güncelle" : "Kaydet"}
                    </Button>
                </div>
            </form>
        </Form>
    )
} 