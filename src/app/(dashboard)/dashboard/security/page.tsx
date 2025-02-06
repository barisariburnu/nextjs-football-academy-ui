"use client"

import { SecuritySettings } from "@/components/settings/security-settings"
import { Card, CardContent } from "@/components/ui/card"

export default function SecurityPage() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Güvenlik</h1>
            </div>

            <Card>
                <CardContent className="p-6">
                    <div className="space-y-4">
                        <div>
                            <h2 className="text-xl font-semibold tracking-tight">
                                Güvenlik Ayarları
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                Hesap güvenliği ayarlarınızı yönetin.
                            </p>
                        </div>
                        <SecuritySettings />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
} 