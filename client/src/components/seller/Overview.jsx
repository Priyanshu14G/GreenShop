import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Small summary card for total-revenue trend (you can replace with a chart later).
 * @param {Object} props - Component props
 * @param {number} props.totalRevenue - The total revenue value to display
 */
export function Overview({ totalRevenue }) {
  return (
    <Card className="col-span-4 lg:col-span-5">
      <CardHeader>
        <CardTitle>Total Revenue Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-40 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold">${totalRevenue.toLocaleString()}</span>
          <p className="text-muted-foreground text-sm">30-day rolling total</p>
        </div>
        {/* Replace the block above with a chart library such as recharts or nivo */}
      </CardContent>
    </Card>
  );
}