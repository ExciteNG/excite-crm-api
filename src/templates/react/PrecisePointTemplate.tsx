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
  Hr,
} from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';
import * as React from 'react';
import { format } from 'date-fns';
import { TemplateProps } from '../interfaces/type';
import { CLIENT_URL } from '../config';

const baseUrl = CLIENT_URL ? `https://${CLIENT_URL}` : 'http://localhost:3000';

export const PrecisePointTemplate = ({
  id,
  subject,
  message,
  hotPicks,
  stockData,
}: TemplateProps) => (
  <Html>
    <Tailwind>
      <Head />
      <Body className="bg-[#ffffff] font-sans text-[#333]">
        <Container className="bg-white my-0 mx-auto mb-16 px-0 pt-5 pb-12">
          <Section className="w-full relative">
            <Section
              className="relative w-full h-[15rem] rounded p-6 bg-center bg-cover bg-no-repeat"
              style={{
                backgroundImage: `url('${baseUrl}/img/precisepoint-bg.png')`,
              }}
            >
              <Row className="w-[11rem] h-[3rem] absolute left-6 top-2">
                <Column className="w-[5rem] m-0">
                  <Section className="p-2 bg-white rounded w-[5rem] h-[3rem] flex justify-center items-center mx-0">
                    <Img
                      src={`${baseUrl}/static/precise-logo-b.png`}
                      width="72"
                      alt="Precisepoint"
                      className="w-full h-full object-cover object-center"
                    />
                  </Section>
                </Column>
                <Column className="w-[5rem] m-0">
                  <Section className="p-2 bg-white rounded w-[5rem] h-[3rem] flex justify-center items-center mx-0">
                    <Img
                      src={`${baseUrl}/static/precise-logo.png`}
                      width="72"
                      alt="Precisepoint"
                      className="w-full h-full object-cover object-center"
                    />
                  </Section>
                </Column>
              </Row>
              <Section>
                <Text className="text-3xl font-bold text-center text-white uppercase leading-[30px] mt-10">
                  Doing business in nigeria
                </Text>
                <Text className="text-center text-white font-normal text-lg">
                  A PrecisePoint Newsletter
                </Text>
              </Section>
            </Section>

            <Section className="w-full">
              <Text className="font-semibold rounded-br-[24px] uppercase bg-[#FF9326] text-white text-center px-3 py-2 inline-block">
                Today&apos;s Trend
              </Text>

              <Section className="w-full">
                <Text className="font-bold capitalize text-base">
                  {/* Nigeria: A Competitive Market Beckons Investors with Growth
                  and Opportunity */}
                  {subject}
                </Text>
                {/* <Text className="">
                  Nigeria, Africa&apos;s largest economy by GDP, is actively
                  courting foreign investors with a blend of economic and
                  government reforms. The Bola Tinubu administration has been
                  actively wooing investors to invest in Nigeria.
                </Text>
                <Text className="">
                  However, the country is currently grappling with a multitude
                  of economic challenges. such as inflation and a weakened
                  currency. But the Naira is slowly recovering at the moment,
                  with the current currency rate at N1,000/$1 as of early April
                  2024.
                </Text>

                <Text>
                  Click{" "}
                  <Link href="/" className="underline">
                    Here{" "}
                  </Link>
                   to read the report.
                </Text> */}
                <div
                  style={{ whiteSpace: 'pre-line' }}
                  className="text-base text-[#333]"
                  dangerouslySetInnerHTML={{ __html: message }}
                />
              </Section>
            </Section>

            <Text className="uppercase font-bold bg-[#FF9326] text-white w-full rounded py-2 text-center text-lg my-2">
              Hot Picks
            </Text>

            {hotPicks &&
              hotPicks.map((hotPick, key) => (
                <Section key={key} className="w-full h-full flex flex-col">
                  <Section className="w-full mb-2">
                    <Text className="font-bold text-base mt-2 mb-1">
                      {hotPick.title}
                    </Text>
                    {hotPick.description && (
                      <Text className="my-1">
                        {hotPick.description.length > 150
                          ? hotPick.description?.slice(0, 150)
                          : hotPick.description}
                        ...
                        <Link className="underline" href={hotPick.link}>
                          Read more
                        </Link>
                      </Text>
                    )}
                  </Section>
                  <Section className="rounded w-full flex justify-center items-center mx-0">
                    <Img
                      src={hotPick.image}
                      alt="image"
                      className="w-full h-fit object-contain object-center"
                    />
                  </Section>
                </Section>
              ))}

            <Section className="w-full my-8">
              <Hr
                className="mb-2"
                style={{ borderTop: '1.5px solid #000000B2' }}
              />
              <Section className="">
                <Text className="font-bold text-center m-0">Stock Market</Text>
                <Text className="text-[#000000B2] text-center m-0">
                  as of {format(new Date(), 'dd/MM/yyyy')}
                </Text>
                <Row>
                  <Column className="w-1/3">
                    <Text className="font-bold text-center m-0">
                      All share index
                    </Text>
                    <Text className="text-center m-0">
                      {stockData?.stock_market.all_share_index}
                    </Text>
                  </Column>
                  <Column className="w-1/3">
                    <Text className="font-bold text-center m-0">Volume</Text>
                    <Text className="text-center m-0">
                      {stockData?.stock_market.volume}
                    </Text>
                  </Column>
                </Row>
                <Row>
                  <Column className="w-1/3">
                    <Text className="font-bold text-center m-0">
                      Value traded (min NGN)
                    </Text>
                    <Text className="text-center m-0">
                      {stockData?.stock_market.value_traded}
                    </Text>
                  </Column>
                  <Column className="w-1/3">
                    <Text className="font-bold text-center m-0">
                      Transaction
                    </Text>
                    <Text className="text-center m-0">
                      {stockData?.stock_market.transaction}
                    </Text>
                  </Column>
                </Row>
              </Section>
              <Hr
                className="my-2"
                style={{ borderTop: '1.5px solid #000000B2' }}
              />
              <Section className="">
                <Text className="font-bold text-center m-0">
                  Crude Oil Price
                </Text>
                <Text className="text-[#000000B2] text-center m-0">
                  as of {format(new Date(), 'dd/MM/yyyy')}
                </Text>
                <Row>
                  <Column className="w-1/3">
                    <Text className="font-bold text-center m-0">
                      WTI Crude Oil
                    </Text>
                    <Text className="text-center m-0">
                      ${stockData?.crude_oil.wti_oil}
                    </Text>
                  </Column>
                  <Column className="w-1/3">
                    <Text className="font-bold text-center m-0">
                      Brent Crude Oil
                    </Text>
                    <Text className="text-center m-0">
                      ${stockData?.crude_oil.brent_oil}
                    </Text>
                  </Column>
                </Row>
              </Section>
              <Hr
                className="my-2"
                style={{ borderTop: '1.5px solid #000000B2' }}
              />
              <Section className="">
                <Text className="font-bold text-center m-0">Diesel Prices</Text>
                <Text className="text-[#000000B2] text-center m-0">
                  as of {format(new Date(), 'MMMM')} 2024
                </Text>
              </Section>
              <Section className="">
                <Text className="font-bold text-center m-0">Average Price</Text>
                <Text className="text-center m-0">NGN 1,250</Text>
              </Section>
              <Hr
                className="my-2"
                style={{ borderTop: '1.5px solid #000000B2' }}
              />
              <Section>
                <Text className="font-bold text-center m-0">Commodity</Text>
                <Row>
                  <Column
                    style={{
                      borderRight: '1.5px solid #000000B2',
                    }}
                    className="w-1/5"
                  >
                    <Text className="text-center font-bold m-0">Gold</Text>
                    <Text className="text-center m-0">
                      ${stockData?.commodity.gold}
                    </Text>
                  </Column>
                  <Column
                    style={{
                      borderRight: '1.5px solid #000000B2',
                    }}
                    className="w-1/5"
                  >
                    <Text className="text-center font-bold m-0">Platinum</Text>
                    <Text className="text-center m-0">
                      ${stockData?.commodity.platinum}
                    </Text>
                  </Column>
                  <Column
                    style={{
                      borderRight: '1.5px solid #000000B2',
                    }}
                    className="w-1/5"
                  >
                    <Text className="text-center font-bold m-0">Silver</Text>
                    <Text className="text-center m-0">
                      ${stockData?.commodity.silver}
                    </Text>
                  </Column>
                  <Column className="w-1/5">
                    <Text className="text-center font-bold m-0">Coal</Text>
                    <Text className="text-center m-0">
                      ${stockData?.commodity.coal}
                    </Text>
                  </Column>
                </Row>
                <Row>
                  <Column
                    style={{
                      borderRight: '1.5px solid #000000B2',
                    }}
                    className="w-1/5"
                  >
                    <Text className="text-center font-bold m-0">Uranium</Text>
                    <Text className="text-center m-0">
                      ${stockData?.commodity.uranium}
                    </Text>
                  </Column>
                  <Column
                    style={{
                      borderRight: '1.5px solid #000000B2',
                    }}
                    className="w-1/5"
                  >
                    <Text className="text-center font-bold m-0">Lead</Text>
                    <Text className="text-center m-0">
                      ${stockData?.commodity.lead}
                    </Text>
                  </Column>
                  <Column className="w-1/5">
                    <Text className="text-center font-bold m-0">Iron Ore</Text>
                    <Text className="text-center m-0">
                      ${stockData?.commodity.iron_ore}
                    </Text>
                  </Column>
                </Row>
              </Section>
              <Hr
                className="mt-2"
                style={{ borderTop: '1.5px solid #000000B2' }}
              />
            </Section>

            <div className="flex justify-center">
              <Img
                src={`${baseUrl}/static/precise-logo.png`}
                width="72"
                alt="content-image"
                className="object-contain"
              />
            </div>

            <Text className="font-bold text-base my-4">
              About PrecisePoint | A Policy Analysis Platform
            </Text>
            <Text className="">
              PrecisePoint delivers custom intelligence solutions, merging
              information and insights to illuminate market dynamics. Our
              research, backed by Precise Platforms, a reputation management
              firm, provides sector-specific, outcome-driven information and
              strategic business policy advisory for effective planning.
            </Text>

            <Section className="w-full p-2 bg-[#FF9326] text-white text-base flex flex-col items-center font-medium">
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
                  href="https://www.precise.com.ng/contact-us"
                >
                  bolaji.okusaga@precise.com.ng{' '}
                </Link>{' '}
                || gabriel.ntoka@precise.com.ng
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

export default PrecisePointTemplate;
