"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"

const activities = [
    {
        id: 1,
        user: {
            name: "Ahmet Yılmaz",
            image: "/avatars/01.png",
            initials: "AY",
        },
        type: "training",
        description: "U15 antrenmanını tamamladı",
        time: "2 saat önce",
        details: "Performans skoru: 8.5/10",
    },
    {
        id: 2,
        user: {
            name: "Mehmet Demir",
            image: "/avatars/02.png",
            initials: "MD",
        },
        type: "match",
        description: "U17 maçında 2 gol attı",
        time: "5 saat önce",
        details: "Maç skoru: 3-1",
    },
    {
        id: 3,
        user: {
            name: "Ayşe Kaya",
            image: "/avatars/03.png",
            initials: "AK",
        },
        type: "assessment",
        description: "Performans değerlendirmesi yapıldı",
        time: "1 gün önce",
        details: "Genel değerlendirme: Çok iyi",
    },
    {
        id: 4,
        user: {
            name: "Can Özdemir",
            image: "/avatars/04.png",
            initials: "CÖ",
        },
        type: "tournament",
        description: "U19 turnuvasında finale yükseldi",
        time: "2 gün önce",
        details: "Yarı final skoru: 2-0",
    },
]

export function ActivityTimeline() {
    return (
        <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-8">
                {activities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-4">
                        <Avatar className="h-9 w-9 border border-muted">
                            <AvatarImage src={activity.user.image} alt={activity.user.name} />
                            <AvatarFallback>{activity.user.initials}</AvatarFallback>
                        </Avatar>
                        <div className="grid gap-1">
                            <div className="grid gap-1">
                                <div className="font-semibold">{activity.user.name}</div>
                                <div className="text-sm text-muted-foreground">
                                    {activity.description}
                                </div>
                            </div>
                            <div className="text-sm text-muted-foreground">
                                {activity.details}
                            </div>
                            <div className="text-xs text-muted-foreground">
                                {activity.time}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </ScrollArea>
    )
} 