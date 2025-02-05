"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ProfileSettings } from "@/components/settings/profile-settings"
import { NotificationSettings } from "@/components/settings/notification-settings"
import { SecuritySettings } from "@/components/settings/security-settings"
import { AppearanceSettings } from "@/components/settings/appearance-settings"

export default function SettingsPage() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Ayarlar</h1>
            </div>

            <Card>
                <CardContent className="p-6">
                    <Tabs defaultValue="profile" className="space-y-4">
                        <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value="profile">Profil</TabsTrigger>
                            <TabsTrigger value="notifications">Bildirimler</TabsTrigger>
                            <TabsTrigger value="security">Güvenlik</TabsTrigger>
                            <TabsTrigger value="appearance">Görünüm</TabsTrigger>
                        </TabsList>
                        <TabsContent value="profile" className="space-y-4">
                            <div>
                                <h2 className="text-xl font-semibold tracking-tight">
                                    Profil Ayarları
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                    Profil bilgilerinizi yönetin.
                                </p>
                            </div>
                            <ProfileSettings />
                        </TabsContent>
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
                        <TabsContent value="security" className="space-y-4">
                            <div>
                                <h2 className="text-xl font-semibold tracking-tight">
                                    Güvenlik Ayarları
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                    Hesap güvenliği ayarlarınızı yönetin.
                                </p>
                            </div>
                            <SecuritySettings />
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