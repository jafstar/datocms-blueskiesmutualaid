import React from "react"
import { Col } from "react-bootstrap"
import { Image } from "react-datocms"

export default function About({ record }) {
  console.log("record: ", record)
  return (
    <Col md={10} className="mb-5" key={record.id}>
      <div className="row">
        <div className="col-md-4">
          {
            record && record.image && (
              <Image data={record.image.responsiveImage} className="img-fluid d-block mx-auto" alt={record.image.alt} />

            )
          }
        </div>
        <div className="col-md-8">
          <h2 className="font-weight-normal text-dark">{record.title}</h2>
          <p className="text-muted font-weight-light">{record.text}</p>
        </div>


      </div>
    </Col>
  )
}
