"use client"

import { Analytics } from "@/components/dashboard/analytics"
import { Card, CardContent } from "@/components/ui/card"

export default function AnalyticsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Analizler</h2>
            </div>

            <Card>
                <CardContent className="p-6">
                    <Analytics />
                </CardContent>
            </Card>
        </div>
    )
} 