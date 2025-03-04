import React, { useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import { RadialChartProps } from "@/types/charts";

export const RadialChart: React.FC<RadialChartProps> = ({
    series,
    colors,
    strokeWidth = 10,
    title,
    subtitle,
    unit,
    legend,
    centerText,
    barsView = "parallel", // Default view
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [size, setSize] = useState(0);

    useEffect(() => {
        const updateSize = () => {
            if (containerRef.current) {
                const { offsetWidth, offsetHeight } = containerRef.current;
                const minDimension = Math.min(offsetWidth, offsetHeight);
                setSize(minDimension);
            }
        };

        const resizeObserver = new ResizeObserver(() => updateSize());
        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        updateSize();

        return () => {
            if (containerRef.current) {
                resizeObserver.unobserve(containerRef.current);
            }
        };
    }, []);

    const renderCircles = () => {
        const center = size / 2;
        const radius = (size - strokeWidth) / 2;
        const gapPercent = 0.01; // Define the gap size as a percentage of the total circumference.
        const total = series.reduce((acc, curr) => { return curr + acc }, 0);
        if (barsView === "parallel") {
            return series.map((value, index) => {
                const individualRadius = radius - index * (strokeWidth + 5);
                const circumference = 2 * Math.PI * individualRadius;
                const dashArray = `${(value / total) * circumference} ${circumference}`;

                return (
                    <circle
                        key={index}
                        cx={center}
                        cy={center}
                        r={individualRadius}
                        stroke={colors[index % colors.length]}
                        strokeWidth={strokeWidth}
                        fill="none"
                        strokeDasharray={dashArray}
                        strokeDashoffset={0}
                        style={{
                            transformOrigin: `${center}px ${center}px`,
                            transform: "rotate(-90deg)",
                        }}
                    />
                );
            });
        } else if (barsView === "sequential") {
            const total = series.reduce((acc, val) => acc + val, 0);
            const circumference = 2 * Math.PI * radius;
            let cumulativeValue = 0;

            return series.map((value, index) => {
                const startPercent = cumulativeValue / total;
                const sweepPercent = value / total - gapPercent; // Reduce arc length for gaps.
                cumulativeValue += value;

                const dashArray = `${sweepPercent * circumference} ${circumference - sweepPercent * circumference
                    }`;

                return (
                    <circle
                        key={index}
                        cx={center}
                        cy={center}
                        r={radius}
                        stroke={colors[index % colors.length]}
                        strokeWidth={strokeWidth}
                        fill="none"
                        strokeDasharray={dashArray}
                        strokeDashoffset={-startPercent * circumference}
                        style={{
                            transformOrigin: `${center}px ${center}px`,
                            transform: "rotate(-90deg)",
                        }}
                    />
                );
            });
        }
    };


    const renderLegend = () => {
        if (!series || !legend || !legend.labels || legend.labels.length === 0 ||
            series.every(count => count === 0)) return <></>;

        return (
            <Box
                sx={{
                    display: "flex",
                    flexDirection: legend.position === "top" || legend.position === "bottom" ? "row" : "column",
                    flexWrap: "wrap",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    gap: "8px",
                    minWidth: legend.position === "right" || legend.position === "left" ? "80px" : "auto",
                    minHeight: legend.position === "top" || legend.position === "bottom" ? "40px" : "auto",
                }}
            >
                {series.length && legend.labels.length === series.length
                    && Array.from({ length: legend.labels.length }).map((_, index) => (
                        <Box key={index} display="flex" flexDirection='column' alignItems="flex-start">
                            <Box key={index} display="flex" alignItems="center">
                                <Box
                                    sx={{
                                        width: 12,
                                        height: 12,
                                        backgroundColor: colors[index % colors.length],
                                        marginRight: "8px",
                                        borderRadius: "50%",
                                    }}
                                />
                                <Typography fontSize="14px">{legend.labels[index]}</Typography>
                            </Box>
                            <Typography pl={1} fontSize="12px" color={"grey"}>{series[index] + (unit ?? '')}</Typography>
                        </Box>
                    ))}
            </Box>
        );
    };

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: 'space-between',
            width: "100%",
            height: "100%",
            cursor: 'pointer'
        }}>
            {(title || subtitle) && (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: 'center',
                        alignItems: "flex-start",
                        minHeight: '28px',
                    }}
                >
                    <Typography fontWeight={700} fontSize={18}>
                        {title}
                    </Typography>
                    <Typography color={"grey"} fontSize={12}>
                        {subtitle}
                    </Typography>
                </Box>)}
            <Box
                ref={containerRef}
                sx={{
                    width: "100%",
                    height: title || subtitle ? "74%" : '100%',
                    display: "flex",
                    flexDirection: legend?.position === "left" || legend?.position === "right" ? "row" : "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "16px",
                }}
            >
                {legend?.position === "top" && renderLegend()}
                <Box
                    sx={{
                        flexGrow: 1,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        minWidth: 0,
                        minHeight: 0,
                        position: "relative",
                    }}
                >
                    {size > 0 && (
                        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                            {renderCircles()}
                        </svg>
                    )}
                    <Box sx={{
                        position: "absolute",
                        textAlign: "center",
                    }}>
                        <Typography
                            sx={{
                                fontSize: 16,
                                fontWeight: 500,
                                whiteSpace: "nowrap",
                                p: 0, m: 0
                            }}
                        >
                            {series.reduce((acc, curr) => { return curr + acc }, 0)}
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: 12,
                                color: "gray",
                                whiteSpace: "nowrap",
                                p: 0, m: 0
                            }}
                        >
                            {centerText ?? '--'}
                        </Typography>
                    </Box>
                </Box>
                {legend?.position === "bottom" && renderLegend()}
                {legend?.position === "left" && renderLegend()}
                {legend?.position === "right" && renderLegend()}
            </Box>
        </Box>
    );
};
