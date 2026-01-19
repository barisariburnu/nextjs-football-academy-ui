"use client"

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Calendar, Trophy, Users } from "lucide-react"
import { useState } from "react"

const notifications = [
    {
        title: "Antrenman Bildirimleri",
        description: "Antrenman programı değişiklikleri ve hatırlatmalar",
        icon: Calendar,
        options: [
            { label: "Program değişiklikleri", value: "changes" },
            { label: "Antrenman hatırlatmaları", value: "reminders" },
            { label: "Performans raporları", value: "reports" },
        ]
    },
    {
        title: "Turnuva Bildirimleri",
        description: "Turnuva tarihleri ve sonuçları",
        icon: Trophy,
        options: [
            { label: "Turnuva duyuruları", value: "announcements" },
            { label: "Maç sonuçları", value: "results" },
            { label: "Canlı skor bildirimleri", value: "live" },
        ]
    },
    {
        title: "Takım Bildirimleri",
        description: "Takım değişiklikleri ve duyurular",
        icon: Users,
        options: [
            { label: "Kadro değişiklikleri", value: "roster" },
            { label: "Takım duyuruları", value: "team_announcements" },
            { label: "Performans güncellemeleri", value: "performance" },
        ]
    },
]

const channels = [
    {
        title: "Uygulama Bildirimleri",
        description: "Bildirimler uygulama içinde görüntülenir",
        defaultChecked: true,
    },
    {
        title: "E-posta Bildirimleri",
        description: "Bildirimler e-posta adresinize gönderilir",
        defaultChecked: false,
    },
]

export function NotificationSettings() {
    // State for tracking enabled status of categories and their options
    const [enabledCategories, setEnabledCategories] = useState<{ [key: string]: boolean }>({
        "Antrenman Bildirimleri": true,
        "Turnuva Bildirimleri": true,
        "Takım Bildirimleri": true,
    })

    const [enabledOptions, setEnabledOptions] = useState<{ [key: string]: { [key: string]: boolean } }>({
        "Antrenman Bildirimleri": {
            changes: true,
            reminders: true,
            reports: true,
        },
        "Turnuva Bildirimleri": {
            upcoming: true,
            results: true,
            changes: true,
        },
        "Takım Bildirimleri": {
            updates: true,
            meetings: true,
            reports: true,
        },
    })

    // Handle main category toggle
    const handleMainToggle = (category: string, enabled: boolean) => {
        setEnabledCategories(prev => ({ ...prev, [category]: enabled }))

        // Update all options under this category
        const categoryOptions = notifications.find(n => n.title === category)?.options || []
        const updatedOptions = { ...enabledOptions }
        updatedOptions[category] = {}

        categoryOptions.forEach(option => {
            updatedOptions[category][option.value] = enabled
        })

        setEnabledOptions(prev => ({ ...prev, ...updatedOptions }))
    }

    // Handle individual option toggle
    const handleOptionToggle = (category: string, option: string, enabled: boolean) => {
        setEnabledOptions(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                [option]: enabled
            }
        }))

        // Check if all options are disabled to update the main category
        const updatedOptions = {
            ...enabledOptions[category],
            [option]: enabled
        }

        const allDisabled = Object.values(updatedOptions).every(value => !value)
        if (allDisabled) {
            setEnabledCategories(prev => ({ ...prev, [category]: false }))
        } else {
            setEnabledCategories(prev => ({ ...prev, [category]: true }))
        }
    }

    return (
        <div className="space-y-6">
            {notifications.map((notification) => {
                const Icon = notification.icon
                return (
                    <Card key={notification.title}>
                        <CardContent className="p-6">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <Icon className="h-5 w-5 text-muted-foreground" />
                                        <div>
                                            <Label>{notification.title}</Label>
                                            <p className="text-sm text-muted-foreground">
                                                {notification.description}
                                            </p>
                                        </div>
                                    </div>
                                    <Switch
                                        checked={enabledCategories[notification.title]}
                                        onCheckedChange={(enabled) => handleMainToggle(notification.title, enabled)}
                                    />
                                </div>
                                <Separator />
                                <div className="grid gap-4">
                                    {notification.options.map((option) => (
                                        <div key={option.value} className="flex items-center justify-between">
                                            <Label className="flex-1">{option.label}</Label>
                                            <Switch
                                                checked={enabledOptions[notification.title]?.[option.value] || false}
                                                onCheckedChange={(enabled) => handleOptionToggle(notification.title, option.value, enabled)}
                                                disabled={!enabledCategories[notification.title]}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )
            })}

            <Card>
                <CardContent className="p-6">
                    <Label className="text-base mb-4 block">Bildirim Kanalları</Label>
                    <div className="space-y-4">
                        {channels.map((channel) => (
                            <div key={channel.title} className="flex items-center justify-between">
                                <div>
                                    <Label className="text-sm">{channel.title}</Label>
                                    <p className="text-sm text-muted-foreground">{channel.description}</p>
                                </div>
                                <Switch defaultChecked={channel.defaultChecked} />
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Button>Değişiklikleri Kaydet</Button>
            </div>
        </div>
    )
} 