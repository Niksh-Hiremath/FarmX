"use client";

import {
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
  Line,
  ComposedChart,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Mock data - would be replaced with API data in production
const supplyDemandData = [
  {
    crop: "Wheat",
    production: 780,
    consumption: 750,
    stocks: 260,
    priceIndex: 105,
  },
  {
    crop: "Corn",
    production: 1420,
    consumption: 1380,
    stocks: 310,
    priceIndex: 112,
  },
  {
    crop: "Soybeans",
    production: 360,
    consumption: 370,
    stocks: 90,
    priceIndex: 125,
  },
  {
    crop: "Rice",
    production: 510,
    consumption: 500,
    stocks: 180,
    priceIndex: 95,
  },
  {
    crop: "Cotton",
    production: 120,
    consumption: 125,
    stocks: 40,
    priceIndex: 85,
  },
];

export default function SupplyDemandChart() {
  return (
    <ChartContainer
      config={{
        production: {
          label: "Production (million tons)",
          color: "hsl(var(--chart-1))",
        },
        consumption: {
          label: "Consumption (million tons)",
          color: "hsl(var(--chart-2))",
        },
        stocks: {
          label: "Ending Stocks (million tons)",
          color: "hsl(var(--chart-3))",
        },
        priceIndex: {
          label: "Price Index (base 100)",
          color: "hsl(var(--chart-4))",
        },
      }}
      className="h-full w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={supplyDemandData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="crop" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Bar
            yAxisId="left"
            dataKey="production"
            fill="var(--color-production)"
          />
          <Bar
            yAxisId="left"
            dataKey="consumption"
            fill="var(--color-consumption)"
          />
          <Bar yAxisId="left" dataKey="stocks" fill="var(--color-stocks)" />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="priceIndex"
            stroke="var(--color-priceIndex)"
            strokeWidth={3}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
