"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Camera, Mail, Phone, MapPin, Building2, Trophy, Calendar } from "lucide-react"
import Link from "next/link"

export default function ProfilePage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Profil</h2>
                <div className="flex items-center gap-4">
                    <Button asChild>
                        <Link href="/dashboard/profile/edit">Profili Düzenle</Link>
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-7">
                <Card className="md:col-span-3">
                    <CardHeader>
                        <CardTitle>Profil Bilgileri</CardTitle>
                        <CardDescription>
                            Kişisel ve iletişim bilgileriniz
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex flex-col items-center gap-4">
                            <div className="relative">
                                <Avatar className="h-24 w-24">
                                    <AvatarImage src="/avatars/01.png" alt="Profil" />
                                    <AvatarFallback>FT</AvatarFallback>
                                </Avatar>
                                <Button size="icon" variant="outline" className="absolute -right-2 -bottom-2 h-8 w-8 rounded-full">
                                    <Camera className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="text-center">
                                <h3 className="text-lg font-semibold">Fatih Terim</h3>
                                <p className="text-sm text-muted-foreground">Teknik Direktör</p>
                            </div>
                        </div>
                        <Separator />
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <div className="flex-1 space-y-1">
                                    <Label>E-posta</Label>
                                    <p className="text-sm">fatih@example.com</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                <div className="flex-1 space-y-1">
                                    <Label>Telefon</Label>
                                    <p className="text-sm">+90 555 123 4567</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                <div className="flex-1 space-y-1">
                                    <Label>Konum</Label>
                                    <p className="text-sm">İstanbul, Türkiye</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Building2 className="h-4 w-4 text-muted-foreground" />
                                <div className="flex-1 space-y-1">
                                    <Label>Departman</Label>
                                    <p className="text-sm">Teknik Ekip</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-6 md:col-span-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Hakkında</CardTitle>
                            <CardDescription>
                                Profesyonel deneyim ve başarılar
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-4">
                                <Label>Biyografi</Label>
                                <p className="text-sm text-muted-foreground">
                                    20 yılı aşkın teknik direktörlük deneyimiyle, genç yetenekleri keşfetme ve geliştirme konusunda uzman.
                                    Ulusal ve uluslararası düzeyde birçok başarıya imza atmış, futbol akademisinde yeni nesil futbolcuları yetiştirmeye odaklanmış bir teknik direktör.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Başarılar</CardTitle>
                            <CardDescription>
                                Önemli başarılar ve sertifikalar
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <Trophy className="h-8 w-8 text-primary" />
                                    <div>
                                        <h4 className="font-semibold">UEFA Pro Lisans</h4>
                                        <p className="text-sm text-muted-foreground">2010</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Trophy className="h-8 w-8 text-primary" />
                                    <div>
                                        <h4 className="font-semibold">Yılın Teknik Direktörü</h4>
                                        <p className="text-sm text-muted-foreground">2015, 2018, 2020</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Calendar className="h-8 w-8 text-primary" />
                                    <div>
                                        <h4 className="font-semibold">15+ Yıl Akademi Deneyimi</h4>
                                        <p className="text-sm text-muted-foreground">2005 - Günümüz</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
} 