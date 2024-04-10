
import { searchHistoryAtom } from "@/store";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { Row, Card, ListGroup, Button } from "react-bootstrap";
import styles from "@/styles/History.module.css";
import { getHistory, removeFromHistory} from "@/lib/userData";
import { useEffect } from "react";

const history = () => {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const router = useRouter();
  useEffect(() => {
    getHistory().then((data) => { setSearchHistory(data); });
  }, []); // Empty dependency array ensures this runs once after the component mounts


  const historyClicked = (e, index) => {
    router.push(`/artwork?${searchHistory[index]}`);
  };
  const removeHistoryClicked =async (e, index) => {
    e.stopPropagation(); // stop the event from trigging other events
    await removeFromHistory(searchHistory[index]);
    getHistory().then((data) => { setSearchHistory(data); });
  };
  if(!searchHistory) return null;
  let parsedHistory = [];

  // TODO: Refactor below line to not use Array.from

  Array.from(searchHistory).forEach((h) => {
    let params = new URLSearchParams(h);
    let entries = params.entries();
    parsedHistory.push(Object.fromEntries(entries));
  });
  return (
    <> 
      {parsedHistory.length > 0 ? (
        <ListGroup>
          {parsedHistory.map((historyItem, index) => (
            <ListGroup.Item key={index}
              className={styles.historyListItem}
              onClick={(e) => historyClicked(e, index)}
            >
              {Object.keys(historyItem).map((key) => (
                <span key={key}>
                  {key}: <strong>{historyItem[key]}</strong>&nbsp;
                </span>
              ))}
              <Button
                className="float-end"
                variant="danger"
                size="sm"
                onClick={(e) => removeHistoryClicked(e, index)}
              >
                &times;
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <Row className="gy-4">
          <Card>
            <Card.Body>
              <Card.Title>
                <h4>Nothing Here</h4>
              </Card.Title>
              <Card.Text>Try searching for something else.</Card.Text>
            </Card.Body>
          </Card>
        </Row>
      )}
     </> 
  );
};

export default history;
