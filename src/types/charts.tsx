import { Dayjs } from "dayjs";
import { SX } from "./shared";

export type BarChartProps = {
    labels?: string[];
    xLabels?: (string | string[])[];
    series: ApexAxisChartSeries | ApexNonAxisChartSeries;
    showToolbar?: boolean;
    height?: number | string;
    width?: number | string;
    paperPaddng?: number;
    colors?: string[];
    max?: number;
    columnWidth?: string | number;
    yLabel?: string;
    paperSx?: SX;
    labelDateSx?: SX;
    dateSx?: SX;
    legend?: ApexLegend;
    tooltip?: ApexTooltip;
    labelRotate?: number;
    filterDate?: "date" | "dateRange";
    horizontal?: boolean;
    fileName?: string;
    barOptions?: NonNullable<ApexPlotOptions["bar"]>;
    tickAmount?: number;
    onClickLegend?: (idx: number, date?: Dayjs) => void;
    customComponent?: React.ReactNode;
    titleContainerJustifyContent?: "start" | "space-between";
    stacked?: boolean;
    dataLabels?: boolean;
    xAxisLabels?: boolean;
    yAxisLabelOffsetY?: number;
    yAxisLabelOffsetX?: number;
    yStepSize?: number;
    yTitleOffsetY?: number;
    yTitleOffsetX?: number;
    yAxisLabelAlign?: "left" | "right" | "center";
    scrollable?: boolean;
    labelsInsideBar?: boolean;
    hasViewPermission?: boolean;
    xAxisFontSize?: string;
    titleAlign?: string;
    yAxisFontSize?: string;
    unit?: string;
    tooltipXlabels?: boolean;
    chartStyle?: React.CSSProperties;
    xAxisLabelClick?: (e: any, chart?: any, options?: any) => void;
    csvConfig?:
    | {
        filename?: undefined | string;
        columnDelimiter?: string;
        headerCategory?: string;
        headerValue?: string;
        dateFormatter?(timestamp?: number): any;
    }
    | undefined;
}

export type RadialChartProps = {
    series: number[];
    colors: string[];
    strokeWidth?: number;
    centerText?: string;
    title?: string;
    unit?: string;
    subtitle?: string;
    barsView?: "sequential" | "parallel";
    legend?: {
        position: "top" | "right" | "bottom" | "left";
        labels: string[];
    };
}
