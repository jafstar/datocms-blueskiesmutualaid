import React from "react"
import { Container, Navbar, Nav } from "react-bootstrap"
import Image from 'next/image'
import Link from "next/link"


export default function Header() {
  return (
    <div className={"header"}>
      <Navbar bf={"light"} expand="md">
        <Container>
          <Link href="/">
            <a className='header-logo-link'>
              <Image
                className='header-logo-img'
                src="/images/blueskies-logo.png"
                width={249}
                height={240}
                alt="Blue Skies Mutal Aid"
              />
            </a>
          </Link>

          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="m-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="#services">Services</Nav.Link>
              <Nav.Link href="#about-us">About</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}
