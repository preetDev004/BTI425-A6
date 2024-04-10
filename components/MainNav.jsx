"use client";
import {
  NavDropdown,
  Button,
  Container,
  Form,
  Nav,
  Navbar,
} from "react-bootstrap";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { searchHistoryAtom, tokenAtom } from "@/store";

import { addToHistory } from "@/lib/userData";
import { getToken, readToken, removeToken } from "@/lib/authenticate"; // Ensure removeToken is imported

function MainNav() {
  // const [token, setToken] = useState(null);
  const [searchField, setSearchField] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);  

  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const [token, setToken] = useAtom(tokenAtom);

  const router = useRouter();
  useEffect(() => {
    const auth = getToken();
    setToken(auth? readToken() : null); 
  },[])

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsExpanded(false);
    if (searchField) {
      const queryString = `title=true&q=${searchField}`;
      setSearchHistory(await addToHistory(`title=true&q=${searchField}`));
      router.push(`/artwork?${queryString}`);
    }
  };
  function logout() {
    removeToken();
    setIsExpanded(false);
    setToken(readToken());
    router.push("/login");
  }
  return (
    <>
      <Navbar
        expand="lg"
        expanded={isExpanded}
        className="bg-body-tertiary fixed-top navbar-dark bg-dark"
        data-bs-theme="dark"
      >
        <Container fluid>
          <Navbar.Brand>Preet Patel</Navbar.Brand>
          <Navbar.Toggle
            onClick={() => setIsExpanded((current) => !current)}
            aria-controls="navbarScroll"
          />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Link href="/" passHref legacyBehavior>
                <Nav.Link
                  active={router.pathname === "/"}
                  onClick={() => setIsExpanded(false)}
                >
                  Home
                </Nav.Link>
              </Link>
              {token && (
                <Link href="/search" passHref legacyBehavior>
                  <Nav.Link
                    active={router.pathname === "/search"}
                    onClick={() => setIsExpanded(false)}
                  >
                    Advance Search
                  </Nav.Link>
                </Link>
              )}
            </Nav>
            {token ? (
              <Nav>
                <NavDropdown
                  menuVariant="dark"
                  title={token.userName || "User"}
                  id="basic-nav-dropdown"
                >
                  <Link
                    href="/favourites"
                    passHref
                    legacyBehavior
                   
                  >
                    <NavDropdown.Item  onClick={() => setIsExpanded(false)}>Favourites</NavDropdown.Item>
                  </Link>
                  <Link
                    href="/history"
                    passHref
                    legacyBehavior
                    
                  >
                    <NavDropdown.Item onClick={() => setIsExpanded(false)}>Search History</NavDropdown.Item>
                  </Link>
                  
                  <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                  
                </NavDropdown>
                &nbsp;
                <Form className="d-flex" onSubmit={handleSubmit}>
                  <Form.Control
                    type="search"
                    onChange={(e) => setSearchField(e.target.value)}
                    value={searchField}
                    placeholder="Search"
                    className="me-2 rounded-3"
                    aria-label="Search"
                  />
                  <Button
                    type="submit"
                    variant="outline-success"
                    className="rounded-3"
                  >
                    Search
                  </Button>
                </Form>
              </Nav>
            ) : (
              <Nav>
                <Link href="/register" passHref legacyBehavior>
                  <Nav.Link
                    active={router.pathname === "/register"}
                    onClick={() => setIsExpanded(false)}
                  >
                    Register
                  </Nav.Link>
                </Link>
                <Link href="/login" passHref legacyBehavior>
                  <Nav.Link
                    active={router.pathname === "/login"}
                    onClick={() => setIsExpanded(false)}
                  >
                    Login
                  </Nav.Link>
                </Link>
              </Nav>
            )}
            &nbsp;
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
      <br />
      <br />
    </>
  );
}

export default MainNav;
