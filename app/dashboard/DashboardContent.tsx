"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CalendarCog, Download } from "lucide-react";
import { format, parseISO, isWithinInterval } from "date-fns";
import { DateRange } from "react-day-picker";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  LabelList,
} from "recharts";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type Stats = {
  customers: number;
  policies: number;
  sales: { name: string; month_order: string; total: number }[];
};

type Props = {
  userEmail: string;
  userName: string;
};

export default function DashboardContent({ userEmail, userName }: Props) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 0, 1),
    to: new Date(),
  });

  const [stats, setStats] = useState<Stats>({
    customers: 0,
    policies: 0,
    sales: [],
  });

  useEffect(() => {
    const fetchStats = async () => {
      const res = await fetch("/api/dashboard");
      const data = await res.json();
      setStats(data);
    };

    fetchStats();
  }, []);

  const handleDownload = () => {
    if (!stats.sales.length) return;

    const csvContent = [
      ["Month", "Total Sales (SGD)"],
      ...stats.sales.map((sale) => [sale.name, sale.total.toString()]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.setAttribute("download", `monthly_sales_${format(new Date(), "yyyy-MM-dd")}.csv`);
    link.setAttribute("href", url);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredSales = stats.sales.filter((sale) => {
    if (!date?.from || !date?.to) return true;

    const saleDate = parseISO(sale.month_order);
    return isWithinInterval(saleDate, {
      start: date.from,
      end: date.to,
    });
  });

  function renderDatePicker() {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "justify-start text-left font-normal w-full sm:w-[280px]",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarCog className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    );
  }

  function renderDownloadCSV() {
    return (
      <Button
        variant="default"
        onClick={handleDownload}
        disabled={!stats.sales.length}
        className="w-full sm:w-auto"
      >
        <Download className="mr-2 h-4 w-4" />
        Download CSV
      </Button>
    );
  }

  return (
    <div className="space-y-6">
      {/* Dashboard Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
        <h1 className="text-4xl font-bold">Dashboard</h1>
      </div>

      {/* Controls Above Summary Cards */}
      <div className="flex flex-col sm:flex-row justify-start sm:justify-end items-start sm:items-center gap-4 mb-4">
        {renderDatePicker()}

        {/* Desktop: show Download CSV beside Date Picker */}
        <div className="hidden sm:flex">
          {renderDownloadCSV()}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <Card>
          <CardContent className="p-6">
            <Label className="text-gray-500">Total Customers</Label>
            <div className="text-3xl font-bold mt-2">{stats.customers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <Label className="text-gray-500">Total Policies</Label>
            <div className="text-3xl font-bold mt-2">{stats.policies}</div>
          </CardContent>
        </Card>
      </div>

      {/* Sales Chart */}
      <Card>
        <CardContent className="p-6 flex flex-col gap-6">
          {/* Chart */}
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={filteredSales}
              margin={{ top: 30, right: 20, bottom: 5, left: 0 }}
            >
              <XAxis dataKey="name" stroke="#888888" fontSize={12} />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
              />
              <Bar dataKey="total" fill="#000" radius={[4, 4, 0, 0]}>
                <LabelList
                  dataKey="total"
                  content={({ x, y, width, value }) => {
                    if (value === 0 || y < 20) return null;
                    return (
                      <text
                        x={x + width / 2}
                        y={y - 12}
                        fill="#000"
                        textAnchor="middle"
                        fontSize={12}
                        fontWeight="bold"
                      >
                        {`$${value.toLocaleString()}`}
                      </text>
                    );
                  }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          {/* Mobile: Download CSV below Chart */}
          <div className="flex sm:hidden mt-4">
            {renderDownloadCSV()}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

