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
import { useState } from "react";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { seatcHistoryAtom } from "@/store";

function MainNav() {
  const [searchField, setSearchField] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchHistory, setSearchHistory] = useAtom(seatcHistoryAtom);
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsExpanded(false);
    if (searchField) {
      const queryString = `title=true&q=${searchField}`;
      setSearchHistory((current) => [...current, queryString ]);
      router.push(`/artwork?${queryString}`);
    }
  };
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
                <Nav.Link active={router.pathname === "/"} onClick={() => setIsExpanded(false)}>Home</Nav.Link>
              </Link>
              <Link href="/search" passHref legacyBehavior>
                <Nav.Link active={router.pathname === "/search"} onClick={() => setIsExpanded(false)}>
                  Advance Search
                </Nav.Link>
              </Link>
            </Nav>
            <Nav>
              <NavDropdown menuVariant="dark" title="User Name" id="basic-nav-dropdown">
              <Link href="/favourites" passHref legacyBehavior>
              <NavDropdown.Item active={router.pathname === "/favourites"}>Favourites</NavDropdown.Item>
              </Link>
              <Link href="/history" passHref legacyBehavior>
              <NavDropdown.Item active={router.pathname === "/history"}>
                  Search History
                </NavDropdown.Item>
              </Link>
                
                
                
            
                
        
              </NavDropdown>
            </Nav>
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
