import React from 'react'
import {Chart as ChartJs, 
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js'

import {Bar, Line} from 'react-chartjs-2'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext'
import { dateFormat } from '../../utils/dateFormat'

ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
)

function Chart() {
    const {sales, orders} = useGlobalContext()

    const data = {
        labels: sales.map((inc) =>{
            const {date} = inc
            return dateFormat(date)
        }),
        datasets: [
            {
                label: 'Sales',
                data: [
                    ...sales.map((sale) => {
                        const {amount} = sale
                        return amount
                    })
                ],
                backgroundColor: 'Yellow',
                tension: .2
            },
            {
                label: 'Orders',
                data: [
                    ...orders.map((order) => {
                        const {amount} = order
                        return amount
                    })
                ],
                backgroundColor: 'blue',
                tension: .2
            }
        ]
    }


    return (
       <div>
        <ChartStyled >
            <Line data={data} />                       
        </ChartStyled>
        <ChartStyled >
            <Bar data={data} />                       
        </ChartStyled>
        </div>
    )
}

const ChartStyled = styled.div`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    height: 100%;
    diplay: flex;
    flex-direction: column;
    gap: 1rem;
`;

export default Chart