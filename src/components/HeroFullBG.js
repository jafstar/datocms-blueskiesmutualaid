import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import Link from "next/link"
import { Image } from "react-datocms"

export default function HeroFullBG({ record: { heroTitle, heroSubtitle, heroImage } }) {
  return (
    <section className="hero-full-bg-shell">

      <div className="hero-full-bg-text">

        <div>
          <h1 className="">{heroTitle}</h1>
          <p className="">{heroSubtitle}</p>
          <div class="flex-row">
          <Link href="#services">
            <a className="btn btn-primary btn-lg">
              Take Action
            </a>
          </Link>
          <span>&nbsp;&nbsp;&nbsp;</span>
          <Link href="#services">
            <a className="btn btn-outline-secondary btn-lg">
              Ask for Help
            </a>
          </Link>
          </div>
        </div>
      </div>


      <div className="hero-full-bg-img">
        {
          // heroImage && heroImage.responsiveImage && (
          //   <Image
          //     data={heroImage && heroImage.responsiveImage}
          //     className=""
          //     alt={heroImage?.alt}
          //   />
          // )
        }
        <div className="hero-full-bg-hills"></div>
        <div className="hero-full-bg-pattern"></div>
      </div>
    </section>
  )
}
