"use client"

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"
import {
    GraduationCap,
    LayoutDashboard,
    Settings,
    Trophy,
    Users,
    UserPlus,
    Heart,
    Shield,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { DialogTitle } from "@/components/ui/dialog"

interface ShortcutsProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function Shortcuts({ open, onOpenChange }: ShortcutsProps) {
    const router = useRouter()

    const runCommand = (command: () => void) => {
        onOpenChange(false)
        command()
    }

    return (
        <CommandDialog open={open} onOpenChange={onOpenChange}>
            <DialogTitle className="sr-only">Kısayollar</DialogTitle>
            <CommandInput placeholder="Bir komut yazın veya arama yapın..." />
            <CommandList>
                <CommandEmpty>Sonuç bulunamadı.</CommandEmpty>
                <CommandGroup heading="Sayfalar" className="px-2">
                    <CommandItem
                        onSelect={() => runCommand(() => router.push("/dashboard"))}
                        className="cursor-pointer aria-selected:bg-muted aria-selected:text-foreground"
                    >
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        Dashboard
                    </CommandItem>
                    <CommandItem
                        onSelect={() => runCommand(() => router.push("/dashboard/players"))}
                        className="cursor-pointer aria-selected:bg-muted aria-selected:text-foreground"
                    >
                        <Users className="mr-2 h-4 w-4" />
                        Oyuncular
                    </CommandItem>
                    <CommandItem
                        onSelect={() => runCommand(() => router.push("/dashboard/coaches"))}
                        className="cursor-pointer aria-selected:bg-muted aria-selected:text-foreground"
                    >
                        <GraduationCap className="mr-2 h-4 w-4" />
                        Antrenörler
                    </CommandItem>
                    <CommandItem
                        onSelect={() => runCommand(() => router.push("/dashboard/parents"))}
                        className="cursor-pointer aria-selected:bg-muted aria-selected:text-foreground"
                    >
                        <Heart className="mr-2 h-4 w-4" />
                        Veliler
                    </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Takım" className="px-2">
                    <CommandItem
                        onSelect={() => runCommand(() => router.push("/dashboard/teams"))}
                        className="cursor-pointer aria-selected:bg-muted aria-selected:text-foreground"
                    >
                        <UserPlus className="mr-2 h-4 w-4" />
                        Takımlar
                    </CommandItem>
                    <CommandItem
                        onSelect={() => runCommand(() => router.push("/dashboard/tournaments"))}
                        className="cursor-pointer aria-selected:bg-muted aria-selected:text-foreground"
                    >
                        <Trophy className="mr-2 h-4 w-4" />
                        Turnuvalar
                    </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Ayarlar" className="px-2">
                    <CommandItem
                        onSelect={() => runCommand(() => router.push("/dashboard/settings"))}
                        className="cursor-pointer aria-selected:bg-muted aria-selected:text-foreground"
                    >
                        <Settings className="mr-2 h-4 w-4" />
                        Ayarlar
                        <CommandShortcut>⌃⇧S</CommandShortcut>
                    </CommandItem>
                    <CommandItem
                        onSelect={() => runCommand(() => router.push("/dashboard/security"))}
                        className="cursor-pointer aria-selected:bg-muted aria-selected:text-foreground"
                    >
                        <Shield className="mr-2 h-4 w-4" />
                        Güvenlik
                        <CommandShortcut>⇧S</CommandShortcut>
                    </CommandItem>
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    )
} 