"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Overview } from "@/components/dashboard/overview"
import { Users, UserPlus, Trophy, Calendar } from "lucide-react"
import { AgeDistribution } from "@/components/analytics/age-distribution"
import { PositionDistribution } from "@/components/analytics/position-distribution"
import { TeamPerformance } from "@/components/analytics/team-performance"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

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

const recentActivities = [
    {
        date: "2024-02-20",
        activity: "U15 Antrenmanı",
        duration: "2 saat",
        attendance: "18/20",
        performance: "8.5/10"
    },
    {
        date: "2024-02-19",
        activity: "U17 Turnuvası",
        duration: "4 saat",
        attendance: "22/22",
        performance: "9/10"
    },
    {
        date: "2024-02-18",
        activity: "U19 Taktik Çalışması",
        duration: "1.5 saat",
        attendance: "19/20",
        performance: "8/10"
    }
]

export function Analytics() {
    return (
        <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-[400px] grid-cols-2">
                <TabsTrigger value="overview">Genel Bakış</TabsTrigger>
                <TabsTrigger value="details">Detaylar</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
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
            </TabsContent>

            <TabsContent value="details" className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
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

                    <Card>
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
                        <CardTitle>Son Aktiviteler</CardTitle>
                        <CardDescription>
                            Son antrenman ve turnuvaların detaylı raporu
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Tarih</TableHead>
                                    <TableHead>Aktivite</TableHead>
                                    <TableHead>Süre</TableHead>
                                    <TableHead>Katılım</TableHead>
                                    <TableHead>Performans</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recentActivities.map((activity, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{activity.date}</TableCell>
                                        <TableCell>{activity.activity}</TableCell>
                                        <TableCell>{activity.duration}</TableCell>
                                        <TableCell>{activity.attendance}</TableCell>
                                        <TableCell>{activity.performance}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    )
} 