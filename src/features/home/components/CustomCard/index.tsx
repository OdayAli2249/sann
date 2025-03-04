import { Card, CardContent } from "@mui/material";
import { CSSProperties, FC, PropsWithChildren } from "react";

export const CustomCard: FC<PropsWithChildren<{ height?: number, sx?: CSSProperties }>> =
    ({ children, sx, height = 280 }) => {

        return (
            <Card elevation={0} sx={{
                height, display: "flex", width: '100%',
                border: `1px solid #eeeeee`,
                borderRadius: 2,
            }}>
                <CardContent sx={{ width: '100%', ...sx }}>
                    {children}
                </CardContent>
            </Card>
        );
    };