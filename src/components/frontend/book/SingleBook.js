import { Button, Card } from "react-bootstrap";

const SingleBook = ({ book }) => {
  return (
    <Card style={{ width: "18rem", margin: "5px 10px 5px 10px " }}>
      <Card.Img
        variant="top"
        src="https://tse3.mm.bing.net/th?id=OIP.ErEvm0ZhfKGItuRrJahuEgHaE7&pid=Api&P=0"
        width="100px"
        height="180px"
      />
      <Card.Body>
        <Card.Title>{book.name}</Card.Title>
        <Card.Text>{book.description}</Card.Text>
        <Card.Text>Giá: {book.price} VNĐ</Card.Text>

        <Button variant="primary">Mua ngay</Button>
      </Card.Body>
    </Card>
  );
};

export default SingleBook;
