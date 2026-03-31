import dynamic from "next/dynamic";
import React, { useMemo } from "react";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });

type Status = "optimal" | "normal" | "high" | "missing";

interface BiomarkerTrendChartProps {
    unit: string;
    status?: Status;
    data: { date: string; value: number | null }[];
    ranges: {
        min: number;
        optimalMin: number;
        optimalMax: number;
        normalMin: number;
        normalMax: number;
        max: number;
    };
}

const STATUS_COLORS: Record<Status, string> = {
    optimal: "#1CA34E",
    normal: "#D39D00",
    high: "#D12A2A",
    missing: "grey",
};

export default function BiomarkerChart({ unit, status: statusProp, data, ranges }: BiomarkerTrendChartProps) {
    const currentValue = data[data.length - 1]?.value ?? null;

    const status: Status = useMemo(() => {
        if (statusProp) return statusProp;
        if (currentValue === null || currentValue === undefined) return "missing";
        if (currentValue >= ranges.optimalMin && currentValue <= ranges.optimalMax) return "optimal";
        if (currentValue >= ranges.normalMin && currentValue <= ranges.normalMax) return "normal";
        return "high";
    }, [statusProp, currentValue, ranges]);

    const option = useMemo(() => ({
        animation: true,
        grid: { left: 50, right: 20, top: 10, bottom: 45 },
        tooltip: { trigger: "axis" },
        xAxis: {
            type: "category",
            data: data.map((d) => d.date),
            axisLine: { show: false },
            axisTick: { show: false },
            axisLabel: { color: "#252613", fontSize: 14 },
        },
        yAxis: {
            type: "value",
            min: ranges.min - (ranges.max - ranges.min) * 0.1,
            max: ranges.max,
            splitLine: { lineStyle: { type: "dashed", color: "#E5E7EB" } },
            axisLabel: { show: false },
            axisLine: { show: false },
            axisTick: { show: false },
        },
        series: [
            {
                type: "bar",
                barWidth: "50%",
                data: data.map((d) => d.value),
                itemStyle: {
                    borderRadius: [50, 50, 50, 50],
                    color: (params: { dataIndex: number }) => {
                        const i = params.dataIndex;
                        if (i === 0 || i === 1 || i === 3 || i === 5) return "#F7BEBE";
                        if (i === 2 || i === 4) return "#F8E6B0";
                        if (i === 6) return "#BAE7CB";
                        return "rgba(28, 163, 78, 0.15)";
                    },
                },
                z: 0,
            },
            {
                type: "line",
                smooth: true,
                connectNulls: false,
                data: data.map((d) => d.value ? d.value - (ranges.max - ranges.min) * 0.09 : null),
                symbol: "circle",
                symbolSize: 15,
                lineStyle: { width: 3, color: "#B15E43" },
                itemStyle: { color: "#FFFFFF", borderColor: "#B15E43", borderWidth: 3 },
                z: 1,
            },
        ],
    }), [data, ranges]);

    return (
        <div className="flex flex-col gap-6 bg-[#FFF]">
            <div className="flex items-baseline gap-1">
                {/* <span className="text-5xl/12 font-normal text-[#252613] font-serif">{currentValue ?? "--"}</span> */}
                <span className="text-xl/12 text-[#252613] font-serif">{unit}</span>
            </div>
            <div className="relative">
                <div className="absolute left-0 top-0 bottom-11 w-5 flex flex-col gap-1">
                    <div className="flex-1 w-1 rounded-[20px] relative" style={{ backgroundColor: "#D12A2A" }}>
                        <span className="absolute -top-1 left-2 text-sm/[25px] text-[#252613]">{ranges.max.toFixed(2)}</span>
                    </div>
                    <div className="flex-1 w-1 rounded-[20px] relative" style={{ backgroundColor: "#D39D00" }}>
                        <span className="absolute top-0 left-2 text-sm/[25px] text-[#252613]">{ranges.normalMax.toFixed(2)}</span>
                    </div>
                    <div className="flex-1 w-1 rounded-[20px] relative" style={{ backgroundColor: "#1CA34E" }}>
                        <span className="absolute top-0 left-2 text-sm/[25px] text-[#252613]">{ranges.optimalMin.toFixed(2)}</span>
                    </div>
                </div>
                <ReactECharts option={option} style={{ height: 226, width: "100%" }} opts={{ renderer: "svg" }} />
            </div>
        </div>
    );
}

export { STATUS_COLORS };
export type { Status };
