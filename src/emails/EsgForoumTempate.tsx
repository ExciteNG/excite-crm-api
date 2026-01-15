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
// import { FaFacebook, FaInstagram } from "react-icons/fa";
// import { FaXTwitter } from "react-icons/fa6";

const baseUrl = CLIENT_URL ? `https://${CLIENT_URL}` : 'http://localhost:3001';

export const EsgForoumTemplate = ({
  id,
  subject,
  message,
  link,
  image,
  banner,
  description,
}: TemplateProps) => (
  <Html>
    <Tailwind>
      <Head />
      <Body className="bg-[#FAF9F6] font-sans text-[#333]">
        <Container className="bg-[	#FAF9F6] my-0 mx-auto mb-16 px-0 pt-5 pb-12">
          <Section className="px-4">
            <Img
              // src={banner}
              src={`${baseUrl}/static/carbon.jpg`}
              alt="esgforum-banner"
              className="w-full h-fit pb-2 object-contain"
            />

            <div
              style={{ whiteSpace: 'pre-line' }}
              className="text-base text-[#333] text-justify"
              dangerouslySetInnerHTML={{ __html: message }}
            />

            {image && (
              <Img
                src={image}
                alt="esgforum-banner"
                className="w-full h-fit object-contain"
              />
            )}

            <Section className="w-full p-2 bg-[#0e2b63] text-white text-base font-medium">
              <Text className="w-full my-0 text-center text-white">
                For more information, visit our website and social media
                platforms
              </Text>
              <Text className="w-full flex items-center justify-center my-0 text-center text-white space-x--1">
                <Link
                  className="text-white"
                  href="https://www.esgforumafrica.com"
                >
                  www.esgforumafrica.com
                </Link>{' '}
                |{' '}
                <Link
                  className="text-white px-1"
                  href="https://www.facebook.com/esg.forum.africa/"
                >
                  <Img
                    src={`${baseUrl}/img/socials/facebook.png`}
                    width="12"
                    alt="facebook"
                    className="w-3 h-3 object-cover object-center"
                  />
                </Link>
                <Link
                  className="text-white px-1"
                  href="https://www.instagram.com/esgforum.africa/"
                >
                  <Img
                    src={`${baseUrl}/img/socials/instagram.png`}
                    width="12"
                    alt="instagram"
                    className="w-3 h-3 object-cover object-center"
                  />
                </Link>
                <Link
                  className="text-white px-1"
                  href="https://x.com/esgforumafrica/"
                >
                  <Img
                    src={`${baseUrl}/img/socials/twitter.png`}
                    width="12"
                    alt="twitter"
                    className="w-[10px] h-[10px] object-cover object-center"
                  />
                </Link>
                esgforum.africa
              </Text>
            </Section>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default EsgForoumTemplate;
