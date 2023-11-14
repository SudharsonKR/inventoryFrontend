import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import History from '../../History/History';
import { rupees } from '../../utils/icons';
import Chart from '../Chart/Chart';
import { InnerLayout } from '../../styles/Layout';

function Dashboard() {
    const {totalOrders,sales, orders, totalSales,totalProfit, getSales, getOrders } = useGlobalContext()

    useEffect(() => {
        getSales()
        getOrders()
    }, [])

    return (
        <DashboardStyled>
            <InnerLayout>
                <h1>Inventory Details</h1>
                <div className="stats-con">
                    <div className="chart-con">
                        <Chart />
                        <div className="amount-con">
                            <div className="sales">
                                <h2>Total Sales</h2>
                                <p>
                                    {rupees} {totalSales()}
                                </p>
                            </div>
                            <div className="orders">
                                <h2>Total Orders</h2>
                                <p>
                                    {rupees} {totalOrders()}
                                </p>
                            </div>
                            <div className="profit">
                                <h2>Total Profit</h2>
                                <p>
                                    {rupees} {totalProfit()}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="history-con">
                        <History />
                        <h2 className="product-title">Min <span>product</span>Max</h2>
                        <div className="product-item">
                            <p>
                                ${Math.min(...sales.map(item => item.amount))}
                            </p>
                            <p>
                                ${Math.max(...sales.map(item => item.amount))}
                            </p>
                        </div>
                        <h2 className="product-title">Min <span>Orders</span>Max</h2>
                        <div className="product-item">
                            <p>
                                ${Math.min(...orders.map(item => item.amount))}
                            </p>
                            <p>
                                ${Math.max(...orders.map(item => item.amount))}
                            </p>
                        </div>
                    </div>
                </div>
            </InnerLayout>
        </DashboardStyled>
    )
}

const DashboardStyled = styled.div`
    .stats-con{
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 2rem;
        .chart-con{
            grid-column: 1 / 4;
            height: 400px;
            .amount-con{
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 2rem;
                margin-top: 2rem;
                .sales, .orders{
                    grid-column: span 2;
                }
                .sales, .orders, .profit{
                    background: #FCF6F9;
                    border: 2px solid #FFFFFF;
                    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                    border-radius: 20px;
                    padding: 1rem;
                    p{
                        font-size: 3.5rem;
                        font-weight: 700;
                    }
                }

                .profit{
                    grid-column: 2 / 6;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    p{
                        color: var(--color-green);
                        opacity: 0.6;
                        font-size: 4.5rem;
                    }
                }
            }
        }

        .history-con{
            grid-column: 4 / -1;
            h2{
                margin: 1rem 0;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            .product-title{
                font-size: 1.2rem;
                span{
                    font-size: 1.8rem;
                }
            }
            .product-item{
                background: #FCF6F9;
                border: 2px solid #FFFFFF;
                box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                padding: 1rem;
                border-radius: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                p{
                    font-weight: 600;
                    font-size: 1.6rem;
                }
            }
        }
    }
`;

export default Dashboard