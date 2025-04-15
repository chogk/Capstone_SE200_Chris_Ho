"use client";

import { redirect } from "next/navigation";
import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Calendar } from '@/components/ui/calendar' 
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { CalendarCog, Download } from 'lucide-react';
import { format, parseISO, isWithinInterval } from 'date-fns'
import { DateRange } from 'react-day-picker'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, LabelList } from 'recharts'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

type Stats = {
  customers: number
  policies: number
  sales: { name: string; month_order: string; total: number }[];
};

type Props = {
  userEmail: string;
  userName: string;
};

// export default function DashboardContent({ userEmail }: { userEmail: string }) {
  export default function DashboardContent({ userEmail, userName }: Props) {
    
  const exportCSV = () => {
      const csvContent = "data:text/csv;charset=utf-8,Name,Email\n" +
                         `${userName},${userEmail}`};
  
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 0, 1),
    to: new Date(),
  });

  const [stats, setStats] = useState<Stats>({
    customers: 0,
    policies: 0,
    sales: [],
  });

  const handleDownload = () => {
    if (!stats.sales.length) return;  

    const csvContent = [
      ['Month', 'Total Sales (SGD)'],
      ...stats.sales.map(sale => [sale.name, sale.total.toString()])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    

    link.setAttribute('href', url);
    link.setAttribute('download', `monthly_sales_${format(new Date(), 'yyyy-MM-dd')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

 const filteredSales = stats.sales.filter((sale) => {
    if (!date?.from || !date?.to) return true;
    
    const saleDate = parseISO(sale.month_order); // Assumes name = full ISO date

  return isWithinInterval(saleDate, {
    start: date.from,
    end: date.to,
  });
});
    
  // Custom label formatter
  const renderLabel = (props: any) => {
  const { x, y, width, value } = props
  const formattedValue = `$${value.toLocaleString()}`

  return (
    <text
      x={x + width / 2}
      y={y - 8} // spacing above the bar
      fill="#000"
      textAnchor="middle"
      fontSize={12}
      fontWeight="bold"
    >
      {formattedValue}
    </text>
  )
}

  useEffect(() => {
    const fetchStats = async () => {
      const res = await fetch('/api/dashboard')
      const data = await res.json()
      setStats(data)
    }

    fetchStats()
  }, [])

  return (
    <div className="pt-1 p-4 space-y-6">
      {/* <h1 className="text-4xl font-bold mt-0 mb-5">Hi, {userName} 👋</h1> */}
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <div className="flex items-center space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "justify-start text-left font-normal w-[280px]",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarCog className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} -{" "}
                      {format(date.to, "LLL dd, y")}
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

          <Button 
            variant="default" 
            onClick={handleDownload}
            disabled={!stats.sales.length}
          >
            <Download className="mr-2 h-4 w-4" />
            Download CSV
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
      
      <Card>
        <CardContent className="p-6">
          <div className="text-2xl font-semibold text-center mb-4">Total Sales by Month</div>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={filteredSales} margin={{ top: 30, right: 20, bottom: 5, left: 0 }}>
              <XAxis dataKey="name" stroke="#888888" fontSize={12} />
              <YAxis stroke="#888888" fontSize={12} tickFormatter={(value) => `$${value.toLocaleString()}`}/>
              <Bar dataKey="total" fill="#000" radius={[4, 4, 0, 0]}>
                  {/* <LabelList dataKey="total" content={renderLabel} /> */}
                  <LabelList
                      dataKey="total"
                      content={({ x, y, width, value }) => {
                      if (value === 0 || y < 20) return null; // Hide label if too high
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
                      )
                    }}
                  />

              </Bar>
            </BarChart>
          </ResponsiveContainer>
        
        </CardContent>
      </Card>
    </div>
  );
}

