"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
    { name: "Kaleci", value: 8 },
    { name: "Defans", value: 35 },
    { name: "Orta Saha", value: 42 },
    { name: "Forvet", value: 25 },
]

export function PositionDistribution() {
    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" name="Oyuncu Sayısı" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
} 