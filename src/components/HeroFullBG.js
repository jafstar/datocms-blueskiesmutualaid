import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import Link from "next/link"
import { Image } from "react-datocms"

export default function HeroFullBG({ record: { heroTitle, heroSubtitle, heroImage } }) {
  return (
    <section className="hero-full-bg-shell">

      <div className="hero-full-bg-text">
        <h1 className="">{heroTitle}</h1>
        <p className="">{heroSubtitle}</p>
        <Link href="#services">
          <a className="btn btn-warning">
            Find Out More <span className="ml-2">&darr;</span>
          </a>
        </Link>
      </div>


      <div className="hero-full-bg-img">
        {
          heroImage && heroImage.responsiveImage && (
            <Image
              data={heroImage && heroImage.responsiveImage}
              className=""
              alt={heroImage?.alt}
            />
          )
        }
        <div className="hero-full-bg-pattern"></div>
      </div>
    </section>
  )
}
