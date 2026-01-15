/* eslint-disable react/no-unescaped-entities */
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

export const PreciseTemplate = ({
  id,
  subject,
  message,
  link,
  description,
}: TemplateProps) => (
  <Html>
    <Tailwind>
      <Head />
      <Body className="bg-[#f6f9fc] font-sans text-[#333]">
        <Container className="bg-white my-0 mx-auto mb-16 px-0 pt-5 pb-12">
          <Section className="px-4">
            <Section className="w-full h-[15rem] rounded-2xl overflow-hidden">
              <Section
                className="relative w-full h-full p-6 bg-center bg-cover bg-no-repeat"
                style={{
                  backgroundImage: `url('${baseUrl}/static/preciseTemplateBg.png')`,
                }}
              >
                <Section>
                  <Row>
                    <Column className="w-[7rem]">
                      <Section className="p-2 bg-white rounded-xl w-[7rem] flex justify-center items-center mx-0">
                        <Img
                          src={`${baseUrl}/static/precise-logo.png`}
                          width="72"
                          alt="Precisepoint"
                          className="w-full h-fit object-cover object-center"
                        />
                      </Section>
                    </Column>
                    <Column className="pl-2">
                      <Text className="text-lg text-white font-semibold">
                        A Policy Analysis Platform
                      </Text>
                    </Column>
                  </Row>
                  <p className="m-0 text-sm text-white">
                    Powered by Precise Platforms
                  </p>
                </Section>
                <Section className="text-white">
                  <Text className="text-xl font-semibold text-center italic">
                    {subject}
                  </Text>
                  <Text className="text-center">
                    {description
                      ? description
                      : 'This report analyses the identified challenges and presents strategic guidance for navigating them, thereby fostering long-term business resilience.'}
                  </Text>
                </Section>
              </Section>
            </Section>
            <div
              style={{ whiteSpace: 'pre-line' }}
              className="text-base text-[#333]"
              dangerouslySetInnerHTML={{ __html: message }}
            />

            {link && (
              // <Text className="text-base">
              //   Click{" "}
              //   <Link className="underline" href={link}>
              //     here
              //   </Link>{" "}
              //   to read the report.
              // </Text>
              <Text className="text-base">
                Kindly click{' '}
                <Link className="underline" href={link}>
                  here
                </Link>{' '}
                to fill out the form.
              </Text>
            )}

            <div className="flex justify-center">
              <Img
                src={`${baseUrl}/static/precise-logo.png`}
                width="72"
                alt="content-image"
                className="object-contain"
              />
            </div>

            <Text className="font-semibold text-lg mt-8 mb-4">
              About PrecisePoint | A Policy Analysis Platform
            </Text>
            <Text className="text-base">
              PrecisePoint delivers custom intelligence solutions, merging
              information and insights to illuminate market dynamics. Our
              research, backed by Precise Platforms, a reputation management
              firm, provides sector-specific, outcome-driven information and
              strategic business policy advisory for effective planning.
            </Text>

            <Section className="w-full p-2 bg-[#FF9326] text-white text-base flex flex-col items-center font-medium">
              <Text className="my-1 text-center text-white">
                You are receiving this email because you’re an industy leader
              </Text>
              <Text className="my-1 text-center text-white">
                &copy;Precise Platforms.
              </Text>
              <Text className="my-0 text-center text-white">
                3, Dapo Bode Street, Yaba, Phase 2, Lagos, Nigeria
              </Text>
              <Text className="my-0 text-center text-white">
                Company Contact Number: +234 809 991 2629 || +234 703 842 6547
              </Text>
              <Text className="my-0 text-center text-white">
                Company Contact Email: bolaji.okusaga@precise.com.ng ||
                gabe.ntoka@precise.com.ng
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

export default PreciseTemplate;
