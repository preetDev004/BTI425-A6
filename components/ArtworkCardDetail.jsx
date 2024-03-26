import useSWR from "swr";
import Card from "react-bootstrap/Card";
import Error from "next/error";
import { useAtom } from "jotai";
import { favouriteAtom } from "@/store";
import { useState } from "react";
import { Button } from "react-bootstrap";

const ArtworkCardDetail = ({ objectID }) => {
  const { data, error } = useSWR(
    objectID
      ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
      : null
  );
  const [favouriteList, setFavouriteList] = useAtom(favouriteAtom);
  const [showAdded, setShowAdded] = useState(favouriteList.includes(objectID));

  const favouriteClicked = () => {
    if (showAdded) {
      setFavouriteList((current) => current.filter((fav) => fav != objectID));
      setShowAdded(false);
    } else {
      setFavouriteList((current) => [...current, objectID]);
      setShowAdded(true);
    }
    console.log(favouriteList)
  
  };
  return (
    <>
      {error ? (
        <Error statusCode={404} />
      ) : data ? (
        <>
          <Card>
            {data.primaryImage && (
              <Card.Img variant="top" src={data.primaryImage} />
            )}
            <Card.Body>
              <Card.Title>
                <strong>{data.title || "N/A"}</strong>
              </Card.Title>
              <Card.Text>
                <strong>Date: </strong>
                {data.objectDate || "N/A"}
                <br />

                <strong>Classification: </strong>
                {data.classification || "N/A"}
                <br />
                <strong>Medium: </strong>
                {data.medium || "N/A"}

                <br />
                <br />

                <strong>Artist: </strong>
                {data.artistDisplayName ? (
                  <span>
                    {data.artistDisplayName}
                    <a
                      href={data.artistWikidata_URL}
                      target="_blank"
                      rel="noreferrer"
                    >
                      wiki
                    </a>
                  </span>
                ) : (
                  "N/A"
                )}
                <br />
                <strong>Credit Line: </strong>
                {data.creditLine || "N/A"}
                <br />
                <strong>Dimensions: </strong>
                {data.dimensions || "N/A"}
                <br />
              </Card.Text>
              <Button
                variant={`${showAdded ? "dark" : "outline-dark"}`}
                onClick={favouriteClicked}
              >
                + Favourite {showAdded ? " (added)" : ""}
              </Button>
            </Card.Body>
          </Card>
        </>
      ) : null}
    </>
  );
};

export default ArtworkCardDetail;
