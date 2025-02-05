"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
    { name: "Ocak", "U15": 75, "U17": 82, "U19": 88 },
    { name: "Şubat", "U15": 78, "U17": 85, "U19": 85 },
    { name: "Mart", "U15": 82, "U17": 83, "U19": 87 },
    { name: "Nisan", "U15": 85, "U17": 87, "U19": 89 },
    { name: "Mayıs", "U15": 87, "U17": 89, "U19": 90 },
    { name: "Haziran", "U15": 89, "U17": 90, "U19": 92 },
]

export function TeamPerformance() {
    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[60, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="U15" stroke="#8884d8" />
                    <Line type="monotone" dataKey="U17" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="U19" stroke="#ffc658" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
} 