import Layout from "../src/components/Layout"
import { request } from "../lib/datocms"
import Link from "next/link"
import { Container, Row, Col } from "react-bootstrap"
import { StructuredText, useQuerySubscription, renderMetaTags, renderNodeRule } from "react-datocms"
import { isHeading } from "datocms-structured-text-utils"

import { metaTagsFragment, responsiveImageFragment } from "../lib/fragments"
import About from "../src/components/About"

import Hero from "../src/components/Hero"
import HeroFullBG from "../src/components/HeroFullBG"

import Service from "../src/components/Service"


const slugify = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")

export async function getStaticProps({ params, preview = false }) {
  // const graphqlRequest = {
  //   query: `
  //     {
  //       landings: allLandingPages {
  //         heroTitle
  //         slug
  //       }
  //     }
  //         `,
  //   preview,
  // }
  const graphqlRequest = {
    query: `
      {
        landings: allLandingPages(filter: {id: {eq: "10753817"} }) {
          heroTitle
          slug
          heroSubtitle
          heroImage {
            responsiveImage(imgixParams: {fm: jpg, fit: crop }) {
              ...responsiveImageFragment
            }
          }
          content {
            value
            blocks {
              __typename
              ... on SectionRecord {
                id
                title
                text
                content {
                  ...on AboutBlockRecord {
                    __typename
                    title
                    text
                  }
                  ...on TitleBlockRecord {
                    id
                    __typename
                    title
                  }
                  ... on LinksToModelRecord {
                    __typename
                    id
                    links {
                      ... on ServiceRecord {
                        __typename
                        id
                        title
                        ctaLink
                        text
                        image {
                          responsiveImage(imgixParams: {fm: jpg, fit: crop}) {
                            ...responsiveImageFragment
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      ${responsiveImageFragment}
    `,
    preview,
  }
  return {
    props: {
      subscription: preview
        ? {
          ...graphqlRequest,
          initialData: await request(graphqlRequest),
          token: process.env.DATOCMS_API_READONLY_TOKEN,
          environment: process.env.NEXT_DATOCMS_ENVIRONMENT || null,
        }
        : {
          enabled: false,
          initialData: await request(graphqlRequest),
        },
    },
  }
}

export default function LandingPage({ subscription }) {
  const {
    data: { landings },
  } = useQuerySubscription(subscription)

  console.log("landings: ", landings)

  return (
    <Layout pageTitle="Landing Page Template in Next.js">
      <HeroFullBG record={landings[0]} />
      <StructuredText
        data={landings[0].content}
        renderBlock={({ record }) => {
          switch (record.__typename) {
            case "SectionRecord":
              const blocks = record.content.map((rec) => {
                switch (rec.__typename) {
                  case "AboutBlockRecord":
                    return <About record={rec} />
                  case "TitleBlockRecord":
                    return (
                      <Col md={4} key={rec.id}>
                        <h3 className="font-weight-light line-height-1_6 text-dark mb-4">{rec.title}</h3>
                      </Col>
                    )
                  case "LinksToModelRecord":
                    return rec.links.map((link) => {
                      if (link.__typename === "ServiceRecord") {
                        return <Service service={link} />
                      }
                    })
                }
              })

              return (
                <section className="section">
                  <Container>
                    <h2 className="text-lg text-dark text-center mb-4" key={record.id} id={slugify(record.title)}>
                      {record.title}
                    </h2>
                    <p className="text-muted text-center mb-5">{record.text}</p>
                    {blocks.length > 0 && (
                      <Row className="justify-content-center" key={record.id + "-block"}>
                        {blocks}
                      </Row>
                    )}
                  </Container>
                </section>
              )
            default:
              return null
          }
        }}
        customNodeRules={[
          renderNodeRule(isHeading, ({ node, children, key }) => {
            const HeadingTag = `h${node.level}`
            const anchor = toPlainText(node)
              .toLowerCase()
              .replace(/ /g, "-")
              .replace(/[^\w-]+/g, "")

            console.log("foo", anchor)

            return (
              <HeadingTag key={key} id={anchor} className="font-weight-normal text-warning mb-3">
                <a href={`#${anchor}`}>{children}</a>
              </HeadingTag>
            )
          }),
        ]}
      />
      <section className="section" id="services">
        <Container>
          <Row className="justify-content-center">
            <Col lg={6} md={8}>
              <div className="title text-center mb-5 mt-5">
                <h1 className="font-weight-bold text-dark mb-5">
                  <span className="text-warning">All landing pages</span>
                </h1>
                {landings &&
                  landings.map(({ slug, heroTitle }) => {
                    return (
                      <div key={slug} className="text-center mb-2">
                        <Link href={`/landings/${slug}`}>
                          <a>{heroTitle}</a>
                        </Link>
                      </div>
                    )
                  })}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Layout>
  )
}
