"use client"

import { createContext, useContext, useEffect, useState } from "react"

type FontSize = "small" | "normal" | "large"

interface FontSizeContextType {
    fontSize: FontSize
    setFontSize: (size: FontSize) => void
}

const FontSizeContext = createContext<FontSizeContextType | undefined>(undefined)

export function FontSizeProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const [fontSize, setFontSize] = useState<FontSize>("normal")

    useEffect(() => {
        const savedSize = localStorage.getItem("font-size") as FontSize
        if (savedSize) {
            setFontSize(savedSize)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("font-size", fontSize)
        document.documentElement.style.fontSize = {
            small: "14px",
            normal: "16px",
            large: "18px"
        }[fontSize]
    }, [fontSize])

    return (
        <FontSizeContext.Provider value={{ fontSize, setFontSize }}>
            {children}
        </FontSizeContext.Provider>
    )
}

export function useFontSize() {
    const context = useContext(FontSizeContext)
    if (context === undefined) {
        throw new Error("useFontSize must be used within a FontSizeProvider")
    }
    return context
} 