import { Card, Form, Button, Alert } from "react-bootstrap";
import { useState } from "react";
import { authenticateUser, readToken } from "@/lib/authenticate";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { favouriteAtom, searchHistoryAtom, tokenAtom } from "@/store";

import { getFavourites, getHistory } from "@/lib/userData";

export default function Login(props) {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [warning, setWarning] = useState("");
  const [password, setPassword] = useState("");
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const [favouritesList, setFavouritesList] = useAtom(favouriteAtom);
  const [token, setToken] = useAtom(tokenAtom);

  async function updateAtoms() {
    setSearchHistory(await getHistory());
    setFavouritesList(await getFavourites());
    setToken(readToken());
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await authenticateUser(user, password);
      await updateAtoms();

      router.push("/");
    } catch (err) {
      setWarning(err.message);
    }
  }
  return (
    <>
      <Card bg="light">
        <Card.Body>
          <h2>Login</h2>Enter your login information below:
        </Card.Body>
      </Card>
      <br />
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>User:</Form.Label>
          <Form.Control
            type="text"
            value={user}
            id="userName"
            name="userName"
            onChange={(e) => setUser(e.target.value)}
          />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <br />
        <Button variant="primary" className="pull-right" type="submit">
          Login
        </Button>
      </Form>
      {warning && (
        <>
          <br />
          <Alert variant="danger">{warning}</Alert>
        </>
      )}
    </>
  );
}
