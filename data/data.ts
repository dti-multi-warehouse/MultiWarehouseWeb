export const links = [
    { label: 'Home', url: '/' },
    { label: 'Shop', url: '/product' },
]

export const orderlist = [
    {
        id: 1,
        name: "Amalia",
        Address: "Jl 123445456",
        date: "04-09-2019",
        warehouse: "Warehouse 1",
        status: "Waiting Payment"
    },
    {
        id: 2,
        name: "Amalia",
        Address: "Jl 123445456",
        date: "04-09-2019",
        warehouse: "Warehouse 1",
        status: "In Process"
    },
    {
        id: 3,
        name: "Amalia",
        Address: "Jl 123445456",
        date: "04-09-2019",
        warehouse: "Warehouse 1",
        status: "Order Confirm"
    },
    {
        id: 4,
        name: "Amalia",
        Address: "Jl 123445456",
        date: "04-09-2019",
        warehouse: "Warehouse 1",
        status: "Order Cancelled"
    },
    {
        id: 5,
        name: "Amalia",
        Address: "Jl 123445456",
        date: "04-09-2019",
        warehouse: "Warehouse 1",
        status: "Order Completed"
    },
]

export const midtransPayment = [
    {value: "BCA", id: "bca"},
    {value: "BRI", id: "bri"},
    {value: "BNI", id: "bni"},
    {value: "CIMB", id: "cimb"},
]

export const shippingMethodList = [
    {value: "jne", text: "JNE Regular"},
    {value: "tiki", text: "Tiki Express"},
    {value: "pos", text: "POS Kilat"},
]

export const selectPaymentMethod = [
    {value: "MIDTRANS", id: "midtrans", text: "Midtrans (Virtual Account)"},
    {value: "MANUAL", id: "manual", text: "Manual Transfer"},
]