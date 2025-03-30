"use client";

import {
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Mock data - would be replaced with API data in production
const marketPriceData = [
  {
    month: "Nov",
    wheat: 7.2,
    corn: 5.8,
    soybeans: 13.2,
    rice: 14.5,
    cotton: 0.85,
  },
  {
    month: "Dec",
    wheat: 7.4,
    corn: 5.9,
    soybeans: 13.5,
    rice: 14.3,
    cotton: 0.82,
  },
  {
    month: "Jan",
    wheat: 7.3,
    corn: 6.1,
    soybeans: 13.8,
    rice: 14.0,
    cotton: 0.8,
  },
  {
    month: "Feb",
    wheat: 7.5,
    corn: 6.3,
    soybeans: 14.2,
    rice: 13.8,
    cotton: 0.78,
  },
  {
    month: "Mar",
    wheat: 7.8,
    corn: 6.5,
    soybeans: 14.6,
    rice: 13.5,
    cotton: 0.75,
  },
  {
    month: "Apr",
    wheat: 7.6,
    corn: 6.7,
    soybeans: 15.2,
    rice: 13.2,
    cotton: 0.72,
  },
  {
    month: "May",
    wheat: 7.9,
    corn: 6.9,
    soybeans: 15.8,
    rice: 13.0,
    cotton: 0.7,
  },
];

export default function MarketPriceChart() {
  return (
    <ChartContainer
      config={{
        wheat: {
          label: "Wheat ($/bushel)",
          color: "hsl(var(--chart-1))",
        },
        corn: {
          label: "Corn ($/bushel)",
          color: "hsl(var(--chart-2))",
        },
        soybeans: {
          label: "Soybeans ($/bushel)",
          color: "hsl(var(--chart-3))",
        },
        rice: {
          label: "Rice ($/cwt)",
          color: "hsl(var(--chart-4))",
        },
        cotton: {
          label: "Cotton ($/lb)",
          color: "hsl(var(--chart-5))",
        },
      }}
      className="h-full w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={marketPriceData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="wheat"
            stroke="var(--color-wheat)"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="corn"
            stroke="var(--color-corn)"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="soybeans"
            stroke="var(--color-soybeans)"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="rice"
            stroke="var(--color-rice)"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="cotton"
            stroke="var(--color-cotton)"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
