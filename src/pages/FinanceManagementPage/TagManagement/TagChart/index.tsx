import React, { useState, useEffect } from 'react'
import { Chart, ChartTitle } from "../../Chart";
import {
    LineChart,
    Line,
    XAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
  } from "recharts";

function TagChart(props: any) {
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
                <XAxis dataKey="month" stroke="#3B60E4" />
                <Line type="monotone" dataKey={props.dataKey} stroke="#3B60E4" />
                <Tooltip />
                {props.grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
            </LineChart>
            </ResponsiveContainer>
        </Chart>
    )
}

export default TagChart