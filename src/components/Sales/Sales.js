import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layout';
import Form from '../Form/Form';
import SalesItem from '../SalesItem/SalesItem';

function Sales() {
    const {sales, getSales, deleteSales, totalSales} = useGlobalContext()

    useEffect(() =>{
        getSales()
    })
    return (
        <SalesStyled>
            <InnerLayout>
                <h1>Sales</h1>
                <h2 className="total-sales">Total Sales: <span>${totalSales()}</span></h2>
                <div className="sales-content">
                    <div className="form-container">
                        <Form />
                    </div>
                    <div className="sales">
                        {sales.map((sale) => {
                            const {_id, title, amount, date, category, description, type} = sale;
                            return <SalesItem
                                key={_id}
                                id={_id} 
                                title={title} 
                                description={description} 
                                amount={amount} 
                                date={date} 
                                type={type}
                                category={category} 
                                indicatorColor="var(--color-green)"
                                deleteItem={deleteSales}
                            />
                        })}
                    </div>
                </div>
            </InnerLayout>
        </SalesStyled>
    )
}

const SalesStyled = styled.div`
    display: flex;
    overflow: auto;
    .total-sales{
        display: flex;
        justify-content: center;
        align-items: center;
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: 1rem;
        margin: 1rem 0;
        font-size: 2rem;
        gap: .5rem;
        span{
            font-size: 2.5rem;
            font-weight: 800;
            color: var(--color-green);
        }
    }
    .sales-content{
        display: flex;
        gap: 2rem;
        .sales{
            flex: 1;
        }
    }
`;

export default Sales