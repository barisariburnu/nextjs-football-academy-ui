"use client"

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const notifications = [
    {
        title: "Antrenman Bildirimleri",
        description: "Antrenman programı değişiklikleri ve hatırlatmalar",
        defaultChecked: true,
    },
    {
        title: "Turnuva Bildirimleri",
        description: "Turnuva tarihleri ve sonuçları",
        defaultChecked: true,
    },
    {
        title: "Performans Raporları",
        description: "Haftalık ve aylık performans değerlendirmeleri",
        defaultChecked: true,
    },
    {
        title: "Takım Duyuruları",
        description: "Takım ile ilgili önemli duyurular",
        defaultChecked: true,
    },
    {
        title: "E-posta Bildirimleri",
        description: "Önemli güncellemeler ve duyurular için e-posta al",
        defaultChecked: false,
    },
    {
        title: "SMS Bildirimleri",
        description: "Acil durumlar için SMS bildirimleri",
        defaultChecked: false,
    },
]

export function NotificationSettings() {
    return (
        <div className="space-y-6">
            <div className="grid gap-4">
                {notifications.map((notification, index) => (
                    <Card key={index}>
                        <CardContent className="flex items-center justify-between p-6">
                            <div className="space-y-1">
                                <Label htmlFor={`notification-${index}`} className="text-base">
                                    {notification.title}
                                </Label>
                                <p className="text-sm text-muted-foreground">
                                    {notification.description}
                                </p>
                            </div>
                            <Switch
                                id={`notification-${index}`}
                                defaultChecked={notification.defaultChecked}
                            />
                        </CardContent>
                    </Card>
                ))}
            </div>
            <div className="flex justify-end">
                <Button>Değişiklikleri Kaydet</Button>
            </div>
        </div>
    )
} 