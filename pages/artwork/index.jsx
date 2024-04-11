import validObjectIDList from "@/data/validObjectIDList";
import ArtworkCard from "@/components/ArtworkCard";
import Error from "next/error";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Row, Col, Pagination, Card } from "react-bootstrap";
import useSWR from "swr";

const PER_PAGE = 12;

const index = () => {
  const [artworkList, setArtworkList] = useState();
  const [page, setPage] = useState(1);
  const router = useRouter();
  const finalQuery = router.asPath.split("?")[1];
  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`
  );

  const previousPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const nextPage = () => {
    if (page < artworkList.length) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (data) {
      // validObjectIDList contains all the valid ObjectIDs so we check that the IDs we are getting in
      // the data are valid and included in the List.
      let filteredResults = validObjectIDList.objectIDs.filter(x => data.objectIDs?.includes(x));
      let results = [];
      for (let i = 0; i < filteredResults?.length; i += PER_PAGE) {
        const chunk = filteredResults?.slice(i, i + PER_PAGE);
        results.push(chunk);
      }
      setArtworkList(results);
      setPage(1);
    }
  }, [data]);

  return (
    <>
      {error ? (
        <Error statusCode={404} />
      ) : artworkList ? (
        <>
          <Row className="gy-4">
            {artworkList.length > 0 ? (
              artworkList[page - 1].map((currentObjectID) => (
                <Col lg={3} key={currentObjectID}>
                  <ArtworkCard objectID={currentObjectID} />
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
          {artworkList.length > 0 && (
            <Row>
              <Col>
                <Pagination className="d-flex align-items-center justify-content-center ">
                  <Pagination.Prev onClick={previousPage}/>
                  <Pagination.Item>{page}</Pagination.Item>
                  <Pagination.Next onClick={nextPage} />
                </Pagination>
              </Col>
            </Row>
          )}
        </>
      ) : null}
    </>
  );
};

export default index;
