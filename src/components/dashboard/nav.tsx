"use client"

import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, Menu, Search, Settings, PanelLeft, Sun, Moon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Shortcuts } from "@/components/dashboard/shortcuts"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { UserNav } from "@/components/dashboard/user-nav"

interface DashboardNavProps {
    isCollapsed: boolean;
    onCollapsedChange: (collapsed: boolean) => void;
}

export function DashboardNav({ isCollapsed, onCollapsedChange }: DashboardNavProps) {
    const [shortcutsOpen, setShortcutsOpen] = useState(false)
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setShortcutsOpen((open) => !open)
            }
        }
        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background">
            <div className="flex h-14 items-center justify-between px-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" className="lg:hidden">
                        <Menu className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="hidden h-8 w-8 lg:flex"
                        onClick={() => onCollapsedChange(!isCollapsed)}
                    >
                        <PanelLeft className={cn("h-4 w-4 transition-transform", isCollapsed && "rotate-180")} />
                    </Button>
                </div>

                <div className="flex items-center gap-3">
                    <div className="w-full md:w-auto md:flex-none">
                        <div className="relative">
                            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                            <Input
                                placeholder="Ara"
                                className="h-9 w-[180px] pl-9 md:w-[240px] lg:w-[280px] bg-muted/50 border-none"
                                onClick={() => setShortcutsOpen(true)}
                            />
                            <kbd className="pointer-events-none absolute right-3 top-2.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                                <span className="text-xs">⌘</span>K
                            </kbd>
                        </div>
                    </div>

                    {mounted && (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                        >
                            <Sun className="h-4 w-4 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
                            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
                        </Button>
                    )}

                    <Button
                        variant="ghost"
                        size="icon"
                        className="relative h-8 w-8"
                        aria-label="Notifications"
                    >
                        <Bell className="h-3.5 w-3.5" />
                        <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
                    </Button>

                    <UserNav />
                </div>
            </div>
            <Shortcuts open={shortcutsOpen} onOpenChange={setShortcutsOpen} />
        </header>
    )
}