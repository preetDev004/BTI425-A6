import { seatcHistoryAtom } from "@/store";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { Row, Card, ListGroup, Button } from "react-bootstrap";
import styles from "@/styles/History.module.css";
import { getHistory, removeFromHistory} from "@/lib/userData";

const history = () => {
  const [searchHistory, setSearchHistory] = useAtom(seatcHistoryAtom);
  const router = useRouter();
  getHistory().then((data) => { setSearchHistory(data); });

  const historyClicked = (e, index) => {
    router.push(`/artwork?${searchHistory[index]}`);
  };
  const removeHistoryClicked =async (e, index) => {
    e.stopPropagation(); // stop the event from trigging other events
    setSearchHistory(await removeFromHistory(searchHistory[index]));
  };
  if(!searchHistory) return null;
  let parsedHistory = [];
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
            <ListGroup.Item
              className={styles.historyListItem}
              onClick={(e) => historyClicked(e, index)}
            >
              {Object.keys(historyItem).map((key) => (
                <>
                  {key}: <strong>{historyItem[key]}</strong>&nbsp;
                </>
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
