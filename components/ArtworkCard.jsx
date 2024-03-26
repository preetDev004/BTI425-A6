import useSWR from "swr";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Error from "next/error";
import Link from "next/link";

const ArtworkCard = ({objectID}) => {
  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
  );

  return (
    <>
      {error ? (
        <Error statusCode={404} />
      ) : data ? (
        <>
          <Card>
            <Card.Img
              variant="top"
              src={
                data.primaryImageSmall ||
                "https://via.placeholder.com/375x375.png?text=[+Not+Available+]"
              }
            />
            <Card.Body>
              <Card.Title>{data.title || "N/A"}</Card.Title>
              <Card.Text>
              
                  <strong>Date:</strong>
                  {data.objectDate || "N/A"}
                  <br />
                
                
                  <strong>Classification:</strong>
                  {data.classification || "N/A"}
                  <br />
               
                  <strong>Medium:</strong>
                  {data.medium || "N/A"}
                  <br />
              
              </Card.Text>
              <Link passHref href={`/artwork/${objectID}`}>
                <Button variant="dark">
                  <strong>ID:</strong> {objectID}
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </>
      ) : null}
    </>
  );
};

export default ArtworkCard;
