import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import swal from "sweetalert";

const OrderDetail = () => {
  let { id } = useParams();
  const history = useHistory();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  if (!localStorage.getItem("auth_token")) {
    history.push("/");
    swal("Warning", "Login to goto Cart Page", "error");
  }
  useEffect(() => {
    async function getOrderDetail() {
      try {
        const response = await axios.get("api/user/order/" + id);
        setOrder(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    getOrderDetail();
  }, []);
  let body;
  if (loading) {
    body = <h4>Loading Product Detail...</h4>;
  } else
    body = (
      <div>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Image</th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {order.orderDetails.map((item, idx) => {
                return (
                  <tr key={idx}>
                    <td width="10%">
                      <img
                        src={`https://image.freepik.com/free-photo/books_87394-845.jpg`}
                        alt={item.book.name}
                        width="50px"
                        height="50px"
                      />
                    </td>
                    <td>{item.book.name}</td>
                    <td width="15%">{item.book.price}</td>
                    <td>{item.quantity}</td>
                    <td>{item.book.price * item.quantity}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );

  return (
    <div>
      <div className="py-4">
        <div className="container text-center">
          <h3>Order details</h3>
          <div className="row">
            <div className="col-md-12">{body}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
