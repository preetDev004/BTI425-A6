import { useAtom } from "jotai";
import { favouriteAtom } from "@/store";
import { Row,Col, Card } from "react-bootstrap";
import ArtworkCard from "@/components/ArtworkCard";
const Favourites = () => {
  const [favouriteList] = useAtom(favouriteAtom);
  return (
    <Row className="gy-4">
      {favouriteList.length > 0 ? (
        favouriteList.map((favObjId) => (
          <Col lg={3} key={favObjId}>
            <ArtworkCard objectID={favObjId} />
          </Col>
        ))
      ) : (
        <Card>
          <Card.Body>
            <Card.Title>
              <h4>Nothing Here</h4>
            </Card.Title>
            <Card.Text>Try searching for something else.</Card.Text>
          </Card.Body>
        </Card>
      )}
    </Row>
  );
};

export default Favourites;
