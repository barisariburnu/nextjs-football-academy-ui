"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { NotificationSettings } from "@/components/settings/notification-settings"
import { AppearanceSettings } from "@/components/settings/appearance-settings"

export default function SettingsPage() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Ayarlar</h1>
            </div>

            <Card>
                <CardContent className="p-6">
                    <Tabs defaultValue="notifications" className="space-y-4">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="notifications">Bildirimler</TabsTrigger>
                            <TabsTrigger value="appearance">Görünüm</TabsTrigger>
                        </TabsList>
                        <TabsContent value="notifications" className="space-y-4">
                            <div>
                                <h2 className="text-xl font-semibold tracking-tight">
                                    Bildirim Ayarları
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                    Bildirim tercihlerinizi yapılandırın.
                                </p>
                            </div>
                            <NotificationSettings />
                        </TabsContent>
                        <TabsContent value="appearance" className="space-y-4">
                            <div>
                                <h2 className="text-xl font-semibold tracking-tight">
                                    Görünüm Ayarları
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                    Uygulama görünümünü özelleştirin.
                                </p>
                            </div>
                            <AppearanceSettings />
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    )
} 