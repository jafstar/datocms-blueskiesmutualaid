import React from "react"
import { Row, Col } from "react-bootstrap"
import { Image } from "react-datocms"
import Link from "next/link"

export default function ServiceGrid({ service }) {
  return (

    <div className="">
      <Link href={service.ctaLink}>
        <a className="">
          <Image data={service.icon.responsiveImage} className="img-fluid d-block mx-auto" alt={service.icon.alt} />
          <h5 className="text-dark font-weight-normal text-center mb-5 pt-3">{service.title}</h5>
        </a>
      </Link>
    </div>


  )
}
