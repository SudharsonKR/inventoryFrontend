import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import SalesItem from '../SalesItem/SalesItem';
import OrdersForm from './OrdersForm';
import { InnerLayout } from '../../styles/Layout';

function Orders() {
    const {orders, getOrders, deleteOrders, totalOrders} = useGlobalContext()

    useEffect(() =>{
        getOrders()
    })
    return (
        <OrdersStyled>
            <InnerLayout>
                <h1>Orders</h1>
                <h2 className="total-orders">Total Orders: <span>${totalOrders()}</span></h2>
                <div className="orders-content">
                    <div className="form-container">
                        <OrdersForm />
                    </div>
                    <div className="orders">
                        {orders.map((order) => {
                            const {_id, title, amount, date, category, description, type} = order;
                            console.log(order)
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
                                deleteItem={deleteOrders}
                            />
                        })}
                    </div>
                </div>
            </InnerLayout>
        </OrdersStyled>
    )
}

const OrdersStyled = styled.div`
    display: flex;
    overflow: auto;
    .total-orders{
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
    .orders-content{
        display: flex;
        gap: 2rem;
        .orders{
            flex: 1;
        }
    }
`;

export default Orders