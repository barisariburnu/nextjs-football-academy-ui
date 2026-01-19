import { ForgotPasswordForm } from "@/components/auth/forgot-password-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ForgotPasswordPage() {
    return (
        <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
                <div className="absolute inset-0 bg-zinc-900" />
                <div className="relative z-20 flex items-center text-lg font-medium">
                    <span className="text-xl mr-2">⚽</span>
                    Football Academy
                </div>
                <div className="relative z-20 mt-auto">
                    <blockquote className="space-y-2">
                        <p className="text-lg">
                            &quot;Güvenli ve kullanıcı dostu bir platform.&quot;
                        </p>
                        <footer className="text-sm">Ali Kaya - Sistem Yöneticisi</footer>
                    </blockquote>
                </div>
            </div>
            <div className="lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <Card className="border-0 shadow-none">
                        <CardHeader className="space-y-1">
                            <CardTitle className="text-2xl text-center">Şifremi Unuttum</CardTitle>
                            <CardDescription className="text-center">
                                Şifrenizi sıfırlamak için e-posta adresinizi girin
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ForgotPasswordForm />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
} 