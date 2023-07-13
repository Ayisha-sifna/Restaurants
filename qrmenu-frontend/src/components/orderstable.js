import "./order.css"
const data = [
    { menu: "biriyani", customer: "abi", price: 100, status: "cook", time: "4:00" }
]

function OrderTable() {
    return (

        <div className="order">
            <h4>Orders</h4>
            <div className="order-container">
                <nav className="heading">
                    <p>Orders</p>
                </nav>
                <table>
                    <tr>
                        <th>Table No</th>
                        <th>Menu</th>
                        <th>Customer</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Time</th>
                    </tr>
                    {data.map((val, key) => {
                        return (
                            <tr key={key}>
                                <td>0</td>
                                <td>{val.menu}</td>
                                <td>{val.customer}</td>
                                <td>{val.price}</td>
                                <td>{val.status}</td>
                                <td>{val.time}</td>
                            </tr>
                        )
                    })}
                </table>
            </div>
        </div>

    );
}

export default OrderTable;