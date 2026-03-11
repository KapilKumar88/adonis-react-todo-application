import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { UserDetails } from '@/types/user.types';
import { formatDate } from '@/utils/helpers';

export default function AccountStats({
    userInfo,
}: Readonly<{
    userInfo: UserDetails;
}>) {
    return (
        <Card>
            <CardHeader><CardTitle>Account Stats</CardTitle></CardHeader>
            <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Member since</span>
                    <span>{formatDate(userInfo?.createdAt)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Role</span>
                    <span className="capitalize">{userInfo?.role ?? '—'}</span>
                </div>
            </CardContent>
        </Card>
    );
}