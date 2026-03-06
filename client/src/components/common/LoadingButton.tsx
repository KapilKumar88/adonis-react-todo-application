import { LoaderIcon, LucideIcon } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

type LoadingButtonProps = React.ComponentProps<typeof Button> & {
    label?: string;
    isLoading: boolean;
    icon?: LucideIcon;
};

export default function LoadingButton({
    label,
    className,
    isLoading,
    icon: Icon,
    ...props
}: LoadingButtonProps) {
    return (
        <Button disabled={isLoading} className={cn(className)} {...props}>
            {isLoading
                ? <LoaderIcon role="status" aria-label="Loading" className="size-4 animate-spin" />
                : Icon && <Icon className="size-4" />
            }
            {label}
        </Button>
    );
}