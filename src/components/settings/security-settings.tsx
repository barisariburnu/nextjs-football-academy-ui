"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

const passwordSchema = z.object({
    currentPassword: z.string().min(1, "Mevcut şifre gereklidir"),
    newPassword: z.string()
        .min(8, "Şifre en az 8 karakter olmalıdır")
        .regex(/[A-Z]/, "En az bir büyük harf içermelidir")
        .regex(/[a-z]/, "En az bir küçük harf içermelidir")
        .regex(/[0-9]/, "En az bir rakam içermelidir")
        .regex(/[^A-Za-z0-9]/, "En az bir özel karakter içermelidir"),
    confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Şifreler eşleşmiyor",
    path: ["confirmPassword"],
})

export function SecuritySettings() {
    const form = useForm<z.infer<typeof passwordSchema>>({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    })

    function onSubmit(values: z.infer<typeof passwordSchema>) {
        console.log(values)
    }

    return (
        <div className="space-y-6">
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Card>
                    <CardContent className="p-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="currentPassword">Mevcut Şifre</Label>
                                <Input
                                    id="currentPassword"
                                    type="password"
                                    {...form.register("currentPassword")}
                                />
                                {form.formState.errors.currentPassword && (
                                    <p className="text-sm text-red-500">
                                        {form.formState.errors.currentPassword.message}
                                    </p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="newPassword">Yeni Şifre</Label>
                                <Input
                                    id="newPassword"
                                    type="password"
                                    {...form.register("newPassword")}
                                />
                                {form.formState.errors.newPassword && (
                                    <p className="text-sm text-red-500">
                                        {form.formState.errors.newPassword.message}
                                    </p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Şifre Tekrar</Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    {...form.register("confirmPassword")}
                                />
                                {form.formState.errors.confirmPassword && (
                                    <p className="text-sm text-red-500">
                                        {form.formState.errors.confirmPassword.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </form>

            <Card>
                <CardContent className="p-6">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>İki Faktörlü Doğrulama</Label>
                                <p className="text-sm text-muted-foreground">
                                    Hesabınıza ekstra güvenlik katmanı ekleyin
                                </p>
                            </div>
                            <Switch />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>Oturum Açma Bildirimleri</Label>
                                <p className="text-sm text-muted-foreground">
                                    Yeni bir cihazdan oturum açıldığında bildirim alın
                                </p>
                            </div>
                            <Switch defaultChecked />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
                    Değişiklikleri Kaydet
                </Button>
            </div>
        </div>
    )
}
