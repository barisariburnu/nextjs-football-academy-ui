"use client"

import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import { tr } from "date-fns/locale"

interface Event {
    id: string
    title: string
    start: string
    end: string
    type: "training" | "tournament" | "event"
    color?: string
}

const events: Event[] = [
    {
        id: "1",
        title: "U15 Antrenmanı",
        start: "2024-02-20T10:00:00",
        end: "2024-02-20T12:00:00",
        type: "training",
        color: "#0ea5e9"
    },
    {
        id: "2",
        title: "U16 Turnuvası",
        start: "2024-02-21",
        end: "2024-02-23",
        type: "tournament",
        color: "#10b981"
    },
    {
        id: "3",
        title: "Veli Toplantısı",
        start: "2024-02-22T15:00:00",
        end: "2024-02-22T16:30:00",
        type: "event",
        color: "#f59e0b"
    }
]

export function Calendar() {
    return (
        <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay"
            }}
            events={events}
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={true}
            locale={tr}
            buttonText={{
                today: "Bugün",
                month: "Ay",
                week: "Hafta",
                day: "Gün",
                list: "Liste"
            }}
            allDayText="Tüm Gün"
            moreLinkText="daha fazla"
            noEventsText="Gösterilecek etkinlik yok"
        />
    )
} 