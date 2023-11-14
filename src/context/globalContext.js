import Axios from "axios";
import React, { useContext, useState } from "react"


const BASE_URL = "https://inventory-mh3y.onrender.com/api/v1/";


const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) => {

    const [sales, setSales] = useState([])
    const [orders, setOrders] = useState([])
    const [error, setError] = useState(null)

    //calculate sales
    const addSales = async (sale) => {
        const response = await Axios.post(`${BASE_URL}add-sales`, sale)
        
            .catch((err) =>{
                setError(err.response.data.message)
            })
            console.log(response.data)
            getSales()
    }

    const getSales = async () => {
        const response = await Axios.get(`${BASE_URL}all-Salesinfo`)
        setSales(response.data)
        console.log(response.data)
        
    }

    const deleteSales = async (id) => {
        const res  = await Axios.delete(`${BASE_URL}delete-sales/${id}`)
        console.log(res.data)
        getSales()
    }

    const totalSales = () => {
        let totalSales = 0;
        sales.forEach((sale) =>{
            totalSales = totalSales + sale.amount
        })

        return totalSales;
    }


    //calculate orders
    const addOrders = async (sale) => {
        const response = await Axios.post(`${BASE_URL}add-orders`, sale)
            .catch((err) =>{
                setError(err.response.data.message)
            })
            console.log(response.data)
        getOrders()
    }

    const getOrders = async () => {
        const response = await Axios.get(`${BASE_URL}all-Ordersinfo`)
        setOrders(response.data)
        console.log(response.data)
    }

    const deleteOrders = async (id) => {
        const res  = await Axios.delete(`${BASE_URL}delete-orders/${id}`)
        console.log(res.data)
        getOrders()
    }

    const totalOrders = () => {
        let totalSales = 0;
        orders.forEach((sale) =>{
            totalSales = totalSales + sale.amount
        })

        return totalSales;
    }


    const totalProfit = () => {
        return totalSales() - totalOrders()
    }

    const transactionHistory = () => {
        const history = [...sales, ...orders]
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })

        return history.slice(0, 3)
    }


    return (
        <GlobalContext.Provider value={{
            addSales,
            getSales,
            sales,
            deleteSales,
            orders,
            totalSales,
            addOrders,
            getOrders,
            deleteOrders,
            totalOrders,
            totalProfit,
            transactionHistory,
            error,
            setError
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () =>{
    return useContext(GlobalContext)
}