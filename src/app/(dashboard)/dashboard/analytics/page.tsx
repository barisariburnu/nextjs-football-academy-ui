"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Overview } from "@/components/dashboard/overview"
import { BarChart3, TrendingUp, Users, UserPlus, Trophy, Calendar } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AgeDistribution } from "@/components/analytics/age-distribution"
import { PositionDistribution } from "@/components/analytics/position-distribution"
import { ActivityTimeline } from "@/components/analytics/activity-timeline"
import { TeamPerformance } from "@/components/analytics/team-performance"

const stats = [
    {
        title: "Toplam Oyuncu",
        value: "127",
        change: "+5.2%",
        description: "Geçen aya göre",
        icon: Users,
    },
    {
        title: "Yeni Kayıtlar",
        value: "24",
        change: "+12%",
        description: "Bu ay",
        icon: UserPlus,
    },
    {
        title: "Turnuva Başarısı",
        value: "85%",
        change: "+3.1%",
        description: "Son turnuvada",
        icon: Trophy,
    },
    {
        title: "Antrenman Katılımı",
        value: "92%",
        change: "-1.2%",
        description: "Bu hafta",
        icon: Calendar,
    },
]

export default function AnalyticsPage() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Analizler</h1>
                <div className="flex items-center gap-2">
                    <Tabs defaultValue="overview" className="w-[400px]">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="overview">Genel Bakış</TabsTrigger>
                            <TabsTrigger value="details">Detaylar</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, index) => (
                    <Card key={index}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                {stat.title}
                            </CardTitle>
                            <stat.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <div className="flex items-center text-xs text-muted-foreground">
                                <span className={stat.change.startsWith("+") ? "text-green-500" : "text-red-500"}>
                                    {stat.change}
                                </span>
                                <span className="ml-1">{stat.description}</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Performans Trendi</CardTitle>
                        <CardDescription>
                            Son 6 ayın performans analizi
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Overview />
                    </CardContent>
                </Card>

                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Yaş Dağılımı</CardTitle>
                        <CardDescription>
                            Oyuncuların yaş gruplarına göre dağılımı
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <AgeDistribution />
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Pozisyon Dağılımı</CardTitle>
                        <CardDescription>
                            Oyuncuların pozisyonlara göre dağılımı
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <PositionDistribution />
                    </CardContent>
                </Card>

                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Takım Performansı</CardTitle>
                        <CardDescription>
                            Takımların son performans değerlendirmesi
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <TeamPerformance />
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Aktivite Zaman Çizelgesi</CardTitle>
                    <CardDescription>
                        Son aktivitelerin kronolojik görünümü
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ActivityTimeline />
                </CardContent>
            </Card>
        </div>
    )
} 