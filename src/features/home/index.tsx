import { Grid, Stack } from "@mui/material";
import { CustomCard } from "./components/CustomCard";
import { TablePlus } from "@/components/TablePlus";
import { User } from "@/types/auth";
import { useSchema } from "@/hooks/useSchema";
import { users } from "./dummyData";
import AppButton from "@/components/inputs/AppButton";
import { Box } from "@mui/material";
import BarChart from "@/components/charts/BarChart";
import { useTheme } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { RadialChart } from "@/components/charts/RadialChart";
import { UsersList } from "./components/UsersList";

export const Home = () => {
    const schema = useSchema();
    const theme = useTheme();
    const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Stack
            width="100%"
            height="auto"
            sx={{
                backgroundPosition: "center",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                overflow: 'auto'
            }}
        >
            <Stack
                sx={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "16px",
                    justifyContent: "center",
                    alignItems: "center",

                }}
            >
                <Grid
                    container
                    spacing={2}
                    sx={{
                        width: "100%",
                        margin: 0,
                    }}
                >
                    <Grid item xs={12} md={8} container spacing={2}>
                        <Grid item xs={12} container spacing={2}>
                            <Grid item xs={6}>
                                <CustomCard>
                                    <RadialChart
                                        title={'Task Statistics'}
                                        series={[51, 86]}
                                        colors={[theme.palette.error.main, theme.palette.primary.main]}
                                        strokeWidth={10}
                                        legend={{
                                            position: "right",
                                            labels: ['Completed', 'In Progress']
                                        }}
                                        centerText="Tasks"
                                        barsView='parallel'
                                    />
                                </CustomCard>
                            </Grid>
                            <Grid item xs={6}>
                                <CustomCard>
                                    <RadialChart
                                        title={'Other Statistics'}
                                        series={[91, 37]}
                                        colors={[theme.palette.success.main, theme.palette.primary.main]}
                                        strokeWidth={10}
                                        legend={{
                                            position: 'right',
                                            labels: ['Term 1', 'Term 2']
                                        }}
                                        centerText="Terms"
                                        barsView='sequential'
                                    />
                                </CustomCard>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <CustomCard>
                                <BarChart
                                    xLabels={['X1', 'X2', 'X3', 'X4', 'X5', 'X6', 'X7']}
                                    labelRotate={-45}
                                    columnWidth={smallScreen ? 7 : 10}
                                    tooltip={{
                                        shared: false,
                                        y: {
                                            formatter: function (val: number): string {
                                                return val + " Devices";
                                            },
                                        },
                                    }}
                                    series={[
                                        {
                                            name: 'Stat 1',
                                            data: [8, 5, 3, 6, 8, 12, 4],
                                            color: theme.palette.error.main,
                                        },
                                        {
                                            name: 'Stat 2',
                                            data: [12, 1, 7, 9, 2, 3, 6],
                                            color: theme.palette.primary.main,
                                        },
                                        {
                                            name: 'Stat 3',
                                            data: [10, 1, 5, 8, 4, 3, 9],
                                            color: theme.palette.success.main,
                                        },
                                    ]}
                                    stacked={false}
                                    colors={[theme.palette.success.main, theme.palette.primary.main]}
                                    legend={{ position: "bottom" }}
                                    showToolbar={false}
                                    barOptions={{
                                        borderRadius: 0,
                                    }}
                                />
                            </CustomCard>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <CustomCard height={576}>
                            <UsersList />
                        </CustomCard>
                    </Grid>
                    <Grid item xs={12}>
                        <CustomCard height={416}
                            sx={{
                                flex: '1 1 auto',
                                position: 'relative',
                                display: 'flex',
                                flexDirection: 'column',
                            }}>
                            <>
                                <Box display="flex" gap={2}
                                    sx={{ mb: 1, alignSelf: 'flex-end' }}>
                                    <AppButton variant="outlined" width="fit-content" type="submit"
                                    >
                                        Export
                                    </AppButton>
                                    <AppButton width="fit-content" type="submit" >
                                        Print
                                    </AppButton>
                                </Box>
                                <TablePlus<User>
                                    data={users}
                                    schema={schema}
                                    total={50}
                                    hide={false}
                                    showPages={true}
                                />
                            </>
                        </CustomCard>
                    </Grid>
                </Grid>
            </Stack>
        </Stack>
    );
};
