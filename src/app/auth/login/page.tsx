import { LoginForm } from "@/components/auth/login-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginPage() {
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
                            &quot;Bu platform sayesinde akademimizdeki tüm süreçleri çok daha etkili bir şekilde yönetebiliyoruz.&quot;
                        </p>
                        <footer className="text-sm">Mehmet Yılmaz - Akademi Direktörü</footer>
                    </blockquote>
                </div>
            </div>
            <div className="lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <Card className="border-0 shadow-none">
                        <CardHeader className="space-y-1">
                            <CardTitle className="text-2xl text-center">Hoş Geldiniz</CardTitle>
                            <CardDescription className="text-center">
                                Hesabınıza giriş yapmak için e-posta ve şifrenizi kullanın
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <LoginForm />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
} 