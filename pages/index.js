import Layout from "../src/components/Layout"
import { request } from "../lib/datocms"
import Link from "next/link"
import Image from "next/image"
import { Container, Row, Col } from "react-bootstrap"
import { StructuredText, useQuerySubscription, renderMetaTags, renderNodeRule } from "react-datocms"
import { isHeading } from "datocms-structured-text-utils"
import { snakeCase } from "change-case"
import { metaTagsFragment, responsiveImageFragment } from "../lib/fragments"
import About from "../src/components/About"

import Hero from "../src/components/Hero"
import HeroFullBG from "../src/components/HeroFullBG"

import Service from "../src/components/Service"
import ServiceGrid from "../src/components/ServiceGrid"

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
                content {
                  ...on AboutBlockRecord {
                    __typename
                    title
                    text
                    image {
                      responsiveImage(imgixParams: {fm: jpg, fit: crop}) {
                        ...responsiveImageFragment
                      }
                    }
                  }
                  ...on BannerRecord {
                    __typename
                    title
                  }
                  ...on StatementRecord {
                    __typename
                    message
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
                        icon {
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

  // console.log("landings: ", landings)

  return (
    <Layout pageTitle="Blue Skies Mutual Aid - Gaines County, TX">
      <HeroFullBG record={landings[0]} />

      <StructuredText
        data={landings[0].content}
        renderBlock={({ record }) => {
          switch (record.__typename) {
            case "SectionRecord":
              const blocks = record.content.map((rec) => {
                switch (rec.__typename) {
                  // case "StatementRecord":
                  //  return (
                  //  <div className="statement-block row">
                  //   <div className="col-md-10 mx-auto">
                  //   <p className="line-height-1_8">
                  //    {rec.message}
                  //   </p>
                  //   </div>
                  //  </div>
                  // )
                  case "BannerRecord":
                    return (
                      <div id="homepage-banner" className="col-md-10 text-center">
                        <div className="banner-triangle triangle-left-top"></div>
                        <div className="banner-triangle triangle-left-bottom"></div>
                        <div className="banner-title">{rec.title}</div>
                        <div className="banner-triangle triangle-right-top"></div>
                        <div className="banner-triangle triangle-right-bottom"></div>
                      </div>
                    )
                  case "AboutBlockRecord":
                    return <About record={rec} />
                  case "TitleBlockRecord":
                    return (
                      <Col md={10} key={rec.id}>
                        <p className="font-weight-light line-height-1_6 text-dark mb-4">{rec.title}</p>
                      </Col>
                    )
                  case "LinksToModelRecord":
                    return (
                      <div className="row">
                        {rec.links.map((link) => {
                          if (link.__typename === "ServiceRecord") {
                            return (
                              <div id={`grid-item-${snakeCase(link.title)}`} className="col-md-4 col-sm-6 col-xs-6">
                                <ServiceGrid service={link} />
                              </div>
                            )
                          }
                        })}
                      </div>
                    )
                }
              })

              return (
                <section className="section bg-grey-light">
                  <Container>
                    {/* <h2 className="text-lg text-dark text-center mb-4" key={record.id} id={slugify(record.title)}>
                      {record.title}
                    </h2>
                    <p className="text-muted text-center mb-5">{record.text}</p> */}
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

            return (
              <HeadingTag key={key} id={anchor} className="font-weight-normal text-warning mb-3">
                <a href={`#${anchor}`}>{children}</a>
              </HeadingTag>
            )
          }),
        ]}
      />

      {/* <div className="bg-white pad-50 row">
        <div className="col-md-10 mx-auto">
          <p className="line-height-1_8">{landings[0]?.content?.blocks[1].content[1]?.message}</p>
        </div>
      </div> */}

      <div id="social-links-shell">
        <div id="social-links" className="flex-row">
          <a href="#">
            <Image src="/images/social-fb.png" width={100} height={100} alt="Facebook" />
          </a>

          <a href="#">
            <Image src="/images/social-insta.png" width={100} height={100} alt="Instagram" />
          </a>

          <a href="#">
            <Image src="/images/social-linkedin.png" width={100} height={100} alt="LinkedIn" />
          </a>

          <a href="#">
            <Image src="/images/social-youtube.png" width={100} height={100} alt="YouTube" />
          </a>
        </div>
        <div id="social-text">Connect with us online</div>
        <div className="social-bg bg-1"></div>
        <div className="social-bg bg-2"></div>
      </div>

      <div id="town-people">
        <div id="town-people-message">
          <h2>
            Blue Skies does not discriminate in any way for the aid we give, not on the basis of religion, age, sex,
            native language, gender, income, immigration status, disability, race, or any other protected status.
          </h2>
        </div>

        <div id="people-helping">
          <Image src="/images/people-helping.png" width={1125} height={425} alt="People helping others" />
        </div>
        <div id="candid-box" className="flex-row">
          <div id="candid-box-img">
            <Image src="/images/candid.png" width={300} height={300} alt="Candid Platinum Transparency 2023" />
          </div>

          <div id="candid-box-msg">
            <h3>We’ve just earned our 2023 Platinum Seal with Candid.org</h3>
            <p>We are excited to share the work our nonprofit does through our profile.</p>
            <a href="#">Learn how you can support us and make a difference.</a>
          </div>
        </div>
      </div>

      {/* <section className="section" id="services">
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
      </section> */}
    </Layout>
  )
}
