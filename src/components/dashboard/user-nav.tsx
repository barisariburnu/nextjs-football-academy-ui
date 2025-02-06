"use client"

import { LogOut, Settings, User, Shield } from "lucide-react"
import { useRouter } from "next/navigation"
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
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useEffect } from "react"

export function UserNav() {
    const router = useRouter()

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.shiftKey && e.key === "P") {
                e.preventDefault()
                router.push("/dashboard/profile")
            }
            if (e.shiftKey && e.key === "S") {
                e.preventDefault()
                if (e.ctrlKey) {
                    router.push("/dashboard/settings")
                } else {
                    router.push("/dashboard/security")
                }
            }
            if (e.ctrlKey && e.shiftKey && e.key === "Q") {
                e.preventDefault()
                router.push("/")
            }
        }

        document.addEventListener("keydown", handleKeyDown)
        return () => document.removeEventListener("keydown", handleKeyDown)
    }, [router])

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src="/avatars/01.png" alt="@example" />
                        <AvatarFallback>BA</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">John Doe</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            john@example.com
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem
                        onClick={() => router.push("/dashboard/profile")}
                        className="cursor-pointer"
                    >
                        <div className="flex items-center flex-1">
                            <User className="mr-2 h-4 w-4" />
                            <span>Profil</span>
                        </div>
                        <DropdownMenuShortcut>⇧P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => router.push("/dashboard/settings")}
                        className="cursor-pointer"
                    >
                        <div className="flex items-center flex-1">
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Ayarlar</span>
                        </div>
                        <DropdownMenuShortcut>⌘⇧S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => router.push("/dashboard/security")}
                        className="cursor-pointer"
                    >
                        <div className="flex items-center flex-1">
                            <Shield className="mr-2 h-4 w-4" />
                            <span>Güvenlik</span>
                        </div>
                        <DropdownMenuShortcut>⇧S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                    <div className="flex items-center flex-1">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Çıkış Yap</span>
                    </div>
                    <DropdownMenuShortcut>⌘⇧Q</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
} 