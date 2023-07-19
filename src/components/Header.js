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
            <Nav className="">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="#services">Services</Nav.Link>
              <Nav.Link href="#downloads">Downloads</Nav.Link>
              <Nav.Link href="#about">About Us</Nav.Link>
              <Nav.Link href="#reports">Reports</Nav.Link>
              <Nav.Link href="#contact">Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>

          <Link href="/donate">
          <a className="btn btn-primary btn-lg">
              Donate
            </a>
          </Link>
        </Container>
      </Navbar>
    </div>
  )
}
