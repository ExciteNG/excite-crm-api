import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Link,
  Section,
  Row,
  Column,
  Text,
} from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';
import * as React from 'react';
import { TemplateProps } from '../interfaces/type';
import { CLIENT_URL } from '../config';

const baseUrl = CLIENT_URL ? `https://${CLIENT_URL}` : 'http://localhost:3000';

export const CheveronTemplate = ({
  id,
  subject,
  message,
  economicReport,
  podcastVlog,
  masthead,
}: TemplateProps) => (
  <Html>
    <Tailwind>
      <Head />
      <Body className="bg-[#ffffff] font-sans text-[#333]">
        <Container className="bg-white my-0 mx-auto mb-16 px-0 pt-5 pb-12">
          <Section className="w-full relative">
            <Img
              src={`${baseUrl}/static/${masthead}-masthead.png`}
              alt="masthead-banner"
              className="w-full h-fit pb-2 object-contain"
            />

            <Section className="w-full">
              <Text className="font-semibold rounded-br-[24px] bg-[#FF9326] text-white text-center px-3 py-2 inline-block">
                PrecisePoint Reports
              </Text>

              <Section className="w-full">
                {/* <Text className="font-bold capitalize text-base">
                  {subject}
                </Text> */}
                <div
                  style={{ whiteSpace: 'pre-line' }}
                  className="text-base text-[#333]"
                  dangerouslySetInnerHTML={{ __html: message }}
                />
              </Section>
            </Section>

            {economicReport && (
              <>
                <Text className="font-bold bg-[#FF9326] text-white w-full rounded py-2 text-center text-lg my-2">
                  Socio-Economic and Political Reports
                </Text>

                <div className="flex justify-center items-cent">
                  <table className="table-auto border-collapse border border-gray-300 w-full max-w-2xl">
                    <thead className="bg-gray-200">
                      <tr>
                        <th
                          className="border border-gray-300 p-2 font-semibold text-left"
                          style={{ border: '1px solid #000000' }}
                        >
                          Description
                        </th>
                        <th
                          className="border border-gray-300 p-2 font-semibold text-left"
                          style={{ border: '1px solid #000000' }}
                        >
                          Issue type
                        </th>
                        <th
                          className="border border-gray-300 p-2 font-semibold text-left"
                          style={{ border: '1px solid #000000' }}
                        >
                          Duration
                        </th>
                        <th
                          className="border border-gray-300 p-2 font-semibold text-left"
                          style={{ border: '1px solid #000000' }}
                        >
                          Geography
                        </th>
                        <th
                          className="border border-gray-300 p-2 font-semibold text-left"
                          style={{ border: '1px solid #000000' }}
                        >
                          Coverage
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {economicReport.map((report, key) => (
                        <tr key={key}>
                          <td
                            className="border border-gray-300 p-2 align-top"
                            style={{ border: '1px solid #000000' }}
                            dangerouslySetInnerHTML={{
                              __html: report.description || '',
                            }}
                          />
                          <td
                            className="border border-gray-300 p-2 align-top"
                            style={{ border: '1px solid #000000' }}
                            dangerouslySetInnerHTML={{
                              __html: report.issueType || '',
                            }}
                          />
                          <td
                            className="border border-gray-300 p-2 align-top"
                            style={{ border: '1px solid #000000' }}
                            dangerouslySetInnerHTML={{
                              __html: report.duration || '',
                            }}
                          />
                          <td
                            className="border border-gray-300 p-2 align-top"
                            style={{ border: '1px solid #000000' }}
                            dangerouslySetInnerHTML={{
                              __html: report.geography || '',
                            }}
                          />
                          <td
                            className="border border-gray-300 p-2 align-top"
                            style={{ border: '1px solid #000000' }}
                            dangerouslySetInnerHTML={{
                              __html: report.coverage || '',
                            }}
                          />
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {podcastVlog && (
              <>
                <Text className="font-bold bg-[#FF9326] text-white w-full rounded py-2 text-center text-lg my-2">
                  Podcast and Vlogs
                </Text>

                {podcastVlog.map((podcast, key) => (
                  <Section key={key} className="w-full p-5">
                    <Row className="w-full p-3 rounded-md shadow">
                      <Column className="w-1/2 pr-1">
                        <Img
                          src={podcast.banner}
                          alt="podacst-image"
                          className="w-full h-fit object-contain object-center rounded-md"
                        />
                      </Column>

                      <Column className="w-full pl-1 flex flex-col right-0">
                        <Text className="my-1 text-lg font-semibold">
                          {podcast.title}
                        </Text>
                        <Text className="my-1 line-clamp-3">
                          {podcast.description &&
                          podcast.description.length > 50
                            ? podcast.description.slice(0, 50) + '...'
                            : podcast.description}
                        </Text>
                        <Link
                          href={podcast.link}
                          className="text-[#FF9326] underline"
                        >
                          Click here to Watch or Listen
                        </Link>
                      </Column>
                    </Row>
                  </Section>
                ))}
              </>
            )}

            <div className="w-full flex justify-center">
              <Img
                src={`${baseUrl}/static/precise-logo.png`}
                width="72"
                alt="content-image"
                className="object-contain"
              />
            </div>

            <Text className="w-full flex justify-center font-bold text-base my-4">
              About PrecisePoint | A Policy Analysis Platform
            </Text>
            <Text className="">
              Precise Point, powered by Precise Platforms, a reputation
              management firm, provides sector-specific, outcome-driven
              information and strategic business policy advisory for effective
              planning.
            </Text>

            <Section className="w-full">
              <Section className="w-full p-2 bg-[#FF9326] text-white text-base flex flex-col items-center font-medium rounded-md">
                <Text className="my-1 text-center text-white">
                  &copy;Precise Platforms.
                </Text>
                <Text className="my-0 text-center text-white">
                  3, Dapo Bode Street, Yaba, Phase 2, Lagos, Nigeria
                </Text>
                <Text className="my-0 text-center text-white">
                  Company Contact Number: +234 809 991 2629 || +234 816 975 8179
                </Text>
                <Text className="my-0 text-center text-white">
                  Company Contact Email:{' '}
                  <Link
                    className="underline text-white"
                    href="mailto:bolaji.okusaga@precise.com.ng"
                  >
                    bolaji.okusaga@precise.com.ng{' '}
                  </Link>{' '}
                  || gabe.ntoka@precise.com.ng
                </Text>
                <Text className="text-center my-4">
                  <Link
                    className="underline text-white"
                    href="https://www.precise.com.ng/contact-us"
                  >
                    Contact us
                  </Link>{' '}
                  | Precise{' '}
                  <Link
                    className="underline text-white"
                    href="https://www.precise.com.ng/privacy-policy"
                  >
                    Privacy Policy
                  </Link>
                </Text>
              </Section>
            </Section>

            {id && (
              <Section>
                <Text className="my-2 text-center text-base w-full">
                  <Link
                    className="underline"
                    href={`https://www.teonengine.com/emails/unsubscribe/${id}`}
                  >
                    Unsubscribe from this email
                  </Link>
                </Text>
              </Section>
            )}
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default CheveronTemplate;
