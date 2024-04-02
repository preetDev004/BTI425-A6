import useSWR from "swr";
import Card from "react-bootstrap/Card";
import Error from "next/error";
import { useAtom } from "jotai";
import { favouriteAtom } from "@/store";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

import { addToFavourites, removeFromFavourites } from "@/lib/userData";

const ArtworkCardDetail = ({ objectID }) => {
  const { data, error } = useSWR(
    objectID
      ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
      : null
  );
  const [favouritesList, setfavouritesList] = useAtom(favouriteAtom);
  const [showAdded, setShowAdded] = useState(false);

  useEffect(() => {

    // TODO: Remove the creation of the list variable and use the favouritesList directly.     

    let list = Array.isArray(favouritesList) ? favouritesList : [];
    setShowAdded(list && list?.includes(objectID));
  }, [favouritesList]);

  const favouriteClicked = async () => {
    if (showAdded) {
      setfavouritesList(await removeFromFavourites(objectID));
      setShowAdded(false);
    } else {
      setfavouritesList(await addToFavourites(objectID));
      setShowAdded(true);
    }
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
