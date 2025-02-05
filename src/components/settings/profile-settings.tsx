"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

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
    bio: z.string().max(500, {
        message: "Biyografi en fazla 500 karakter olabilir.",
    }),
})

export function ProfileSettings() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "Ahmet Yılmaz",
            email: "ahmet@example.com",
            phone: "+90 555 123 4567",
            bio: "Football Academy'de U15 takımı antrenörü olarak görev yapıyorum.",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-6">
                <Avatar className="h-24 w-24">
                    <AvatarImage src="/avatars/01.png" alt="Profil fotoğrafı" />
                    <AvatarFallback>AY</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                    <h3 className="text-lg font-medium">Profil Fotoğrafı</h3>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                            Değiştir
                        </Button>
                        <Button variant="outline" size="sm">
                            Kaldır
                        </Button>
                    </div>
                </div>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>İsim</FormLabel>
                                <FormControl>
                                    <Input placeholder="İsminizi girin" {...field} />
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
                                    <Input placeholder="E-posta adresinizi girin" {...field} />
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
                                    <Input placeholder="Telefon numaranızı girin" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="bio"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Biyografi</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Kendinizden bahsedin"
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    En fazla 500 karakter.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-end">
                        <Button type="submit">Değişiklikleri Kaydet</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
} 