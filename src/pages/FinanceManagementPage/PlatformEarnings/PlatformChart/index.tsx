import React, { useState, useEffect } from 'react'
import { NestedMonthEarning } from '../../../../entities/Transaction'
import { Chart, ChartTitle } from "../../Chart";
import {
    LineChart,
    Line,
    XAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
  } from "recharts";

function PlatformEarningsChart(props: any) {
    const [monthYearEarnings, setMonthYearEarnings] = useState<any>({...props.monthYear});

    useEffect(() => {
        setMonthYearEarnings(props.monthYear)
    }, [props.monthYear])

    console.log(monthYearEarnings);

    return (
        <Chart>
            <ChartTitle>Monthly Revenue</ChartTitle>
            <ResponsiveContainer width="100%" aspect={4 / 1}>
            <LineChart data={monthYearEarnings}>
                <XAxis dataKey="month" stroke="#5550bd" />
                <Line type="monotone" dataKey={props.dataKey} stroke="#5550bd" />
                <Tooltip />
                {props.grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
            </LineChart>
            </ResponsiveContainer>
        </Chart>
    )
}

export default PlatformEarningsChart
