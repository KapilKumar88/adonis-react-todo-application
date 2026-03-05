import appConfig from "@/config/app.config";
import { CheckSquare, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AppLogo({
    onlyLogo = false,
}: Readonly<{
    onlyLogo?: boolean;
}>) {
    const navigate = useNavigate();
    return (
        <div className="mb-10 flex flex-col items-center gap-4 text-center">
            <button onClick={() => navigate("/")} className="background-transparent border-none">
                <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary via-secondary to-accent shadow-2xl">
                    <CheckSquare className="h-10 w-10 text-white drop-shadow" strokeWidth={1.75} />
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent shadow">
                        <Sparkles className="h-3 w-3 text-white" />
                    </span>
                </div>
            </button>

            {
                !onlyLogo && (
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight text-foreground">
                            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                                {appConfig.APP_NAME}
                            </span>
                        </h1>
                        <p className="mt-1.5 text-sm text-muted-foreground">
                            {appConfig.APP_DESCRIPTION}
                        </p>
                    </div>
                )
            }
        </div>
    );
}