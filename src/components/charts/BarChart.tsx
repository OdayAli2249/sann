import { BarChartProps } from "@/types/charts";
import { Box, useTheme } from "@mui/material";
import dayjs from "dayjs";
import ReactApexChart from "react-apexcharts";

const BarChart = ({
    labels = [],
    xLabels,
    series,
    colors = [],
    max,
    columnWidth = "70%",
    showToolbar = true,
    yLabel = "",
    legend = {},
    tooltip = {},
    labelRotate = 0,
    fileName,
    horizontal = false,
    barOptions,
    tickAmount = 30,
    onClickLegend,
    stacked = true,
    dataLabels = false,
    xAxisLabels = true,
    yAxisLabelOffsetY,
    yAxisLabelOffsetX,
    yStepSize,
    yTitleOffsetY,
    yTitleOffsetX,
    yAxisLabelAlign,
    scrollable = false,
    labelsInsideBar = false,
    xAxisFontSize,
    yAxisFontSize,
    unit = "",
    tooltipXlabels = false,
    xAxisLabelClick,
    csvConfig,
    chartStyle,
}: BarChartProps) => {
    const theme = useTheme();
    return (

        <Box
            sx={{ height: "100%" }}
            minWidth={400}
        >
            <Box
                sx={{ height: "100%", marginLeft: labelsInsideBar ? -20 : 0 }}
                className={scrollable ? "chart-container" : ""}
            >
                <ReactApexChart
                    className="custom-chart"
                    type={"bar"}
                    options={{
                        labels,
                        colors: colors,
                        plotOptions: {
                            bar: {
                                columnWidth,
                                horizontal,
                                ...barOptions,
                            },
                        },
                        dataLabels: {
                            enabled: dataLabels,
                        },
                        chart: {
                            background: theme.palette.background.paper,

                            foreColor: theme.palette.text.primary,
                            events: {
                                dataPointSelection: (_, __, config) => {
                                    const date = dayjs(config.w.config.xaxis.categories[config.dataPointIndex]);
                                    onClickLegend && onClickLegend(config.seriesIndex, date);
                                },
                                legendClick: (_, idx: number) => {
                                    const date = dayjs(document.getElementById("dateId")?.innerText);
                                    onClickLegend && onClickLegend(idx, date);
                                },
                                xAxisLabelClick: xAxisLabelClick,
                            },
                            type: "bar",
                            stacked,
                            toolbar: {
                                show: showToolbar,
                                export: {
                                    csv: {
                                        filename: fileName ?? Math.random().toString(36).substring(7),
                                        ...csvConfig,
                                    },
                                    svg: {
                                        filename: fileName ?? Math.random().toString(36).substring(7),
                                    },
                                    png: {
                                        filename: fileName ?? Math.random().toString(36).substring(7),
                                    },
                                },
                                offsetY: 0,
                            },
                            zoom: {
                                enabled: true,
                            },
                        },
                        legend,
                        grid: { borderColor: theme.palette.action.disabled },
                        yaxis: {
                            axisTicks: {},
                            stepSize: yStepSize,
                            max,
                            title: {
                                text: `${yLabel}`,
                                offsetY: yTitleOffsetY || -190,
                                offsetX: yTitleOffsetX || 20,

                                rotate: 0,
                                style: { color: theme.palette.text.primary },
                            },
                            labels: {
                                offsetX: yAxisLabelOffsetX || 0,
                                offsetY: yAxisLabelOffsetY || 0,
                                align: yAxisLabelAlign,
                                style: {
                                    fontSize: yAxisFontSize || "10px",
                                    fontFamily: "Poppins !important",
                                },
                                formatter: (val: string | number): string => `${val} ${unit}`,
                            },
                        },
                        tooltip: {
                            ...tooltip,
                            followCursor: true,
                            y: {
                                formatter: (value) => `${value} ${yLabel} ${unit}`,
                                title: {
                                    formatter: (seriesName) => seriesName,
                                },
                            },
                        },
                        xaxis: {
                            tickAmount,
                            categories: xLabels,
                            labels: {
                                rotate: labelRotate,
                                show: xAxisLabels,
                                style: {
                                    fontFamily: "Poppins !important",
                                    fontSize: xAxisFontSize || "10px",
                                },
                                trim: tooltipXlabels,
                            },

                            crosshairs: {
                                show: true,
                                opacity: 0.9,
                                stroke: {
                                    color: theme.palette.action.disabled,
                                },
                                fill: {
                                    type: "solid",
                                    color: theme.palette.action.disabled,
                                    gradient: {

                                        colorFrom: theme.palette.action.disabled,
                                        colorTo: theme.palette.action.disabled,
                                        stops: [0, 100],
                                        opacityFrom: 0.4,
                                        opacityTo: 0.5,
                                    },
                                },
                            },
                        },
                    }}
                    series={series}
                    height={"95%"}
                    style={{ ...chartStyle }}
                />
            </Box>
        </Box>
    );
};

export default BarChart;
