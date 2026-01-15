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
import { TemplateProps } from '../interfaces/type';
import React from 'react';
import { CLIENT_URL } from '../config';

const baseUrl = CLIENT_URL ? `https://${CLIENT_URL}` : 'http://localhost:3000';

export const BlankTemplate = ({
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

            {image ||
              (content && (
                <Section>
                  {image && (
                    <Img
                      src={image}
                      alt="content-image"
                      className="w-1/2 h-[10rem] object-cover object-center"
                    />
                  )}
                  {content && (
                    <Text className="text-base text-[#333] w-full">
                      {content}
                    </Text>
                  )}
                </Section>
              ))}
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default BlankTemplate;
