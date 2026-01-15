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

export const NewsletterTemplate = ({
  id,
  // subject,
  message,
  // sections,
  // image,
  // content,
  // link,
  banner,
  attachemntUrl,
}: // description,
TemplateProps) => (
  <Html>
    <Tailwind>
      <Head />
      <Body className="bg-[#ffffff] font-sans text-[#333]">
        <Container className="bg-white my-0 mx-auto mb-16 px-0 pt-5 pb-12">
          <Section className="w-full relative">
            {banner && (
              <Img
                src={banner}
                alt="banner-image"
                className="w-full h-fit pb-2 object-contain"
              />
            )}

            <Section className="w-full">
              <div
                style={{ whiteSpace: 'pre-line' }}
                className="text-base text-[#333] text-justify"
                dangerouslySetInnerHTML={{ __html: message }}
              />
            </Section>

            {attachemntUrl && (
              <Section className="w-full flex justify-center">
                <Link
                  className="px-5 py-2 rounded-full bg-[#102138] text-white"
                  href={attachemntUrl}
                  download
                >
                  Download Article
                </Link>
              </Section>
            )}

            {/* <Section>
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
            </Section> */}

            {/* <Text className="font-semibold text-lg my-0">
              About TeonEngine | Turn on the Market
            </Text> */}

            {/* <Text className="font-semibold text-lg">
              Let’s keep the conversation going! Follow us for more updates:
            </Text>
            <Text className="text-base my-0">
              📌 LinkedIn: https://www.linkedin.com/company/teonengine
            </Text>
            <Text className="text-base my-0">
              📌 Twitter/X: https://www.twitter.com/teonengine
            </Text>
            <Text className="text-base my-0">
              📌 Instagram: https://www.instagram.com/teonengine
            </Text>
            <Text className="text-base my-0">
              📌 Facebook: https://www.facebook.com/TeonEngine
            </Text>
            <Text className="text-base mt-0">
              📌 YouTube: https://www.youtube.com/@TeonEngine
            </Text> */}

            <Section className="w-full p-1 text-black text-base flex flex-col items-center font-medium">
              <div className="w-full flex justify-center">
                <Img
                  src={`${baseUrl}/static/teon-logo.png`}
                  width="102"
                  alt="Teon-engine"
                  className="my-8"
                />
              </div>

              <Text className="my-1 text-center text-black">
                You are receiving this email because you’re an industry leader
              </Text>
              <Text className="my-1 text-center text-black">
                &copy;TeonEngine
              </Text>
              <Text className="my-0 text-center text-black">
                3, Dapo Bode Street, Yaba, Phase 2, Lagos, Nigeria
              </Text>
              <Text className="my-0 text-center text-black">
                Company Contact Number: +234 809 991 2629 || +234 816 975 8179
              </Text>
              <Text className="my-0 text-center text-black">
                Company Contact Email: bolaji.okusaga@teonengine.com ||
                funke.ogunsina@teonengine.com || info@teonengine.com
              </Text>

              <Text className="text-center my-4 text-black">
                <Link
                  className="underline text-black"
                  href="https://www.teonengine.com/contact"
                >
                  Contact us
                </Link>{' '}
                | TeonEngine{' '}
                <Link
                  className="underline text-black"
                  href="https://www.teonengine.com/"
                >
                  Privacy
                </Link>
              </Text>
            </Section>

            <Section>
              <Text className="w-full flex items-center justify-center my-0 text-center text-black space-x--1">
                <Link
                  className="text-black bg-white rounded-full p-1"
                  href="https://www.facebook.com/TeonEngine"
                >
                  <Img
                    src={`data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWZhY2Vib29rIj48cGF0aCBkPSJNMTggMmgtM2E1IDUgMCAwIDAtNSA1djNIN3Y0aDN2OGg0di04aDNsMS00aC00VjdhMSAxIDAgMCAxIDEtMWgzeiIvPjwvc3ZnPg==`}
                    width="12"
                    alt="facebook"
                    className="w-3 h-3 text-black object-cover object-center"
                  />
                </Link>
                <Link
                  className="text-black bg-white rounded-full p-1"
                  href="https://www.instagram.com/teonengine"
                >
                  <Img
                    src={`data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWluc3RhZ3JhbSI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB4PSIyIiB5PSIyIiByeD0iNSIgcnk9IjUiLz48cGF0aCBkPSJNMTYgMTEuMzdBNCA0IDAgMSAxIDEyLjYzIDggNCA0IDAgMCAxIDE2IDExLjM3eiIvPjxsaW5lIHgxPSIxNy41IiB4Mj0iMTcuNTEiIHkxPSI2LjUiIHkyPSI2LjUiLz48L3N2Zz4=`}
                    width="12"
                    alt="instagram"
                    className="w-3 h-3 text-black object-cover object-center"
                  />
                </Link>
                <Link
                  className="text-black bg-white rounded-full p-1"
                  href="https://www.youtube.com/@TeonEngine"
                >
                  <Img
                    src={`data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXlvdXR1YmUiPjxwYXRoIGQ9Ik0yLjUgMTdhMjQuMTIgMjQuMTIgMCAwIDEgMC0xMCAyIDIgMCAwIDEgMS40LTEuNCA0OS41NiA0OS41NiAwIDAgMSAxNi4yIDBBMiAyIDAgMCAxIDIxLjUgN2EyNC4xMiAyNC4xMiAwIDAgMSAwIDEwIDIgMiAwIDAgMS0xLjQgMS40IDQ5LjU1IDQ5LjU1IDAgMCAxLTE2LjIgMEEyIDIgMCAwIDEgMi41IDE3Ii8+PHBhdGggZD0ibTEwIDE1IDUtMy01LTN6Ii8+PC9zdmc+`}
                    width="12"
                    alt="youtube"
                    className="w-3 h-3 text-black object-cover object-center"
                  />
                </Link>
                <Link
                  className="text-black bg-white rounded-full p-1"
                  href="https://www.twitter.com/teonengine"
                >
                  <Img
                    src={`data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXR3aXR0ZXIiPjxwYXRoIGQ9Ik0yMiA0cy0uNyAyLjEtMiAzLjRjMS42IDEwLTkuNCAxNy4zLTE4IDExLjYgMi4yLjEgNC40LS42IDYtMkMzIDE1LjUuNSA5LjYgMyA1YzIuMiAyLjYgNS42IDQuMSA5IDQtLjktNC4yIDQtNi42IDctMy44IDEuMSAwIDMtMS4yIDMtMS4yeiIvPjwvc3ZnPg==`}
                    width="12"
                    alt="twitter"
                    className="w-3 h-3 text-black object-cover object-center"
                  />
                </Link>
                TeonEngine
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

export default NewsletterTemplate;
