import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import Image from "next/image"

export default function Footer({ links }) {
  return (
    <section className="footer">
      <div></div>

      <div id="footer-nav-shell">
        <Container className="footer-nav">
          <Row>
            <Col lg={12}>
              <Row>
                {links.map((link, key) => (
                  <Col key={key} md={3}>
                    {/* <h6 className="text-dark mb-3">{link.title}</h6> */}
                    <ul className="list-unstyled company-sub-menu">
                      {link.child.map((fLink, key) => (
                        <li key={key}>
                          <a href={fLink.link}>{fLink.title}</a>
                        </li>
                      ))}
                    </ul>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Container>
      </div>

      <div id="footer-extra-shell">
        <div id="footer-extra" className="flex-row space-between">
          <div className="text-left">
            <Image src="/images/accepted-payments.png" width={400} height={65} alt="Accepted forms of payment" />
          </div>
          <div id="payment-message">
            Please donate whatever you can through <a href="#">PayPal</a> or <a href="#">Stripe</a> (including Google
            Pay, Apple Pay, or direct debit).
          </div>
        </div>
      </div>
      <div id="footer-info-shell" className="bg-grey-dark ">
        <div id="footer-info" className="flex-row space-between">
          <div className="text-left text-muted">
            <p className="mb-0 f-15 text-white">{`©${new Date().getFullYear()} - Blue Skies Mutual Aid, Inc is a 501(c)3 nonprofit`}</p>
          </div>
          <div className="text-right text-muted">
            <p className="mb-0 f-15 text-white">
              <a href="mailto:info@blueskiesma.com">info@blueskiesma.com</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
