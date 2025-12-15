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

export const TeonEngineTemplate = ({
  id,
  subject,
  message,
  sections,
  image,
  content,
  link,
  banner,
  description,
}: TemplateProps) => (
  <Html>
    <Tailwind>
      <Head />
      <Body className="bg-[#ffffff] font-sans text-[#333] w-full">
        <Container className="bg-white my-0 mx-auto mb-16 px-0 pt-5 pb-12 w-full">
          <Section className="px-4 w-full space-y-2">
            {banner ? (
              <Img
                src={banner}
                alt="banner-image"
                className="w-full h-fit object-contain object-center"
              />
            ) : (
              <Section className="w-full h-[15rem] overflow-hidden">
                <Section
                  className="w-full h-full p-6 rounded-2xl bg-center bg-cover bg-no-repeat"
                  style={{
                    backgroundImage: `url('${baseUrl}/static/teonTemplateBg.png')`,
                  }}
                >
                  <Section className="p-2 bg-white rounded-xl w-[7rem] flex justify-center items-center mx-0">
                    <Img
                      src={`${baseUrl}/static/teon-logo.png`}
                      width="72"
                      alt="Teon-engine"
                      className="w-full h-fit object-cover object-center"
                    />
                  </Section>
                  <Section className="text-white">
                    <Text className="text-xl font-semibold text-center italic">
                      &quot;{subject}&quot;
                    </Text>
                    <Text className="text-center">
                      {description
                        ? description
                        : 'This report analyses the identified challenges and presents strategic guidance for navigating them, thereby fostering long-term business resilience.'}
                    </Text>
                  </Section>
                </Section>
              </Section>
            )}

            <div
              style={{ whiteSpace: 'pre-line' }}
              className="text-base text-[#333]"
              dangerouslySetInnerHTML={{ __html: message }}
            />

            {sections &&
              sections.map((section, key) => (
                <Section key={key}>
                  {section.image && (
                    <Img
                      src={section.image}
                      alt="content-image"
                      className="w-1/2 h-[10rem] object-cover object-center"
                    />
                  )}
                  {section.content && (
                    <Text className="text-base text-[#333] w-full">
                      {section.content}
                    </Text>
                  )}
                </Section>
              ))}

            <Section>
              {image && (
                <Img
                  src={image}
                  alt="content-image"
                  className="w-1/2 h-[10rem] object-cover object-center"
                />
              )}
              {content && (
                <Text className="text-base text-[#333] w-full">{content}</Text>
              )}
            </Section>

            {link && (
              <Text className="text-base font-bold">
                Click{' '}
                <Link className="underline" href={link}>
                  here
                </Link>{' '}
                to learn more and unlock your writing potential with NewsTeon!
              </Text>
            )}

            <Img
              src={`${baseUrl}/static/teon-logo.png`}
              width="102"
              alt="Teon-engine"
              className="my-8"
            />

            <Text className="font-semibold text-lg my-0">
              About TeonEngine | Turn on the Market
            </Text>
            <Text className="text-base">
              Teon Engine is a subsidiary of Precise Platform Limited. We are
              incorporated as a full-service market technology communications
              firm. Our team has deep insight and knowledge of the consumer
              market, media consumption patterns, influencer and behavior. We
              have a dedicated and widely read Tech team solely to create and
              develop innovative marketing and support solutions.
            </Text>

            <Section className="w-full p-2 bg-[#102138] text-white text-base flex flex-col items-center font-medium">
              <Text className="my-1 text-center text-white">
                You are receiving this email because you’re an industy leader
              </Text>
              <Text className="my-1 text-center text-white">
                &copy;TeonEngine
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
                  className="text-white"
                  href="mailto:bolaji.okusaga@teonengine.com"
                >
                  bolaji.okusaga@teonengine.com
                </Link>{' '}
                ||{' '}
                <Link
                  className="text-white"
                  href="mailto:funkeogunsina@teonengine.com"
                >
                  funkeogunsina@teonengine.com
                </Link>{' '}
                ||{' '}
                <Link
                  className="text-white"
                  href="mailto:newsletter@teonengine.com"
                >
                  newsletter@teonengine.com
                </Link>
              </Text>
              <Text className="text-center my-4 text-white">
                <Link
                  className="underline text-white"
                  href="https://www.teonengine.com/contact"
                >
                  Contact us
                </Link>{' '}
                | TeonEngine{' '}
                <Link
                  className="underline text-white"
                  href="https://www.teonengine.com/"
                >
                  Privacy
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

export default TeonEngineTemplate;
