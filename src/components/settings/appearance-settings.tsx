"use client"

import { useTheme } from "next-themes"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Monitor } from "lucide-react"
import { useFontSize } from "@/components/providers/font-size-provider"

type Theme = "light" | "dark" | "system"

export function AppearanceSettings() {
    const { theme, setTheme } = useTheme()
    const { fontSize, setFontSize } = useFontSize()

    return (
        <div className="space-y-6">
            <Card>
                <CardContent className="p-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label>Tema</Label>
                            <RadioGroup
                                defaultValue={theme}
                                onValueChange={(value: Theme) => setTheme(value)}
                                className="grid grid-cols-3 gap-4"
                            >
                                <Label
                                    htmlFor="light"
                                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary cursor-pointer"
                                >
                                    <RadioGroupItem value="light" id="light" className="sr-only" />
                                    <Sun className="h-6 w-6 mb-2" />
                                    <span>Açık</span>
                                </Label>
                                <Label
                                    htmlFor="dark"
                                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary cursor-pointer"
                                >
                                    <RadioGroupItem value="dark" id="dark" className="sr-only" />
                                    <Moon className="h-6 w-6 mb-2" />
                                    <span>Koyu</span>
                                </Label>
                                <Label
                                    htmlFor="system"
                                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary cursor-pointer"
                                >
                                    <RadioGroupItem value="system" id="system" className="sr-only" />
                                    <Monitor className="h-6 w-6 mb-2" />
                                    <span>Sistem</span>
                                </Label>
                            </RadioGroup>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="p-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label>Yazı Tipi Boyutu</Label>
                            <RadioGroup
                                defaultValue={fontSize}
                                onValueChange={setFontSize}
                                className="grid grid-cols-3 gap-4"
                            >
                                <Label
                                    htmlFor="small"
                                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary cursor-pointer"
                                >
                                    <RadioGroupItem value="small" id="small" className="sr-only" />
                                    <span className="text-sm">Küçük</span>
                                </Label>
                                <Label
                                    htmlFor="normal"
                                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary cursor-pointer"
                                >
                                    <RadioGroupItem value="normal" id="normal" className="sr-only" />
                                    <span>Normal</span>
                                </Label>
                                <Label
                                    htmlFor="large"
                                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary cursor-pointer"
                                >
                                    <RadioGroupItem value="large" id="large" className="sr-only" />
                                    <span className="text-lg">Büyük</span>
                                </Label>
                            </RadioGroup>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Button>Değişiklikleri Kaydet</Button>
            </div>
        </div>
    )
} 