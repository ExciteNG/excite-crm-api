import { render } from '@react-email/render';
import { reportTemplates } from './util';

import PollteonTemplate from '@/emails/PollteonTemplate';
import { BlankTemplate } from '@/emails/BlankTemplate';
import { PreciseTemplate } from '@/emails/PreciseTemplate';
import { CheveronTemplate } from '@/emails/CheveronTemplate';
import { EsgForoumTemplate } from '@/emails/EsgForoumTempate';
import { NewsletterTemplate } from '@/emails/NewsletterTemplate';
import { PrecisePointTemplate } from '@/emails/PrecisePointTemplate';
import { TeonEngineTemplate } from '@/emails/TeonTemplate';
// import { TeonEngineTemplate } from '../emails/TeonTemplate';
import { TemplateProps } from '@/interfaces/type';
import { getStocksData } from './stock.utils';
type Params = {
  id?: string;
  provider: 'teonengine' | 'precise';
  props: TemplateProps;
};

export const renderTemplate = async ({ id, provider, props }: Params) => {
  const {
    image,
    subject,
    message,
    content,
    link,
    banner,
    hotPicks,
    template,
    description,
    podcastVlog,
    economicReport,
    attachemntUrl,
  } = props;

  if (provider === 'teonengine') {
    if (template === 'pollteon') {
      return render(
        PollteonTemplate({
          id,
          link,
          banner,
          message,
        })
      );
    } else if (template === 'newsletter') {
      return render(
        NewsletterTemplate({
          id,
          image,
          subject,
          message,
          content,
          link,
          banner,
          description,
          attachemntUrl,
        })
      );
    } else if (template === 'teonengine') {
      return render(
        TeonEngineTemplate({
          id,
          image,
          subject,
          message,
          content,
          link,
          banner,
          description,
        })
      );
    } else {
      return render(
        BlankTemplate({
          id,
          image,
          subject,
          message,
          content,
          link,
          banner,
          description,
        })
      );
    }
  } else {
    if (template === 'precise') {
      return render(
        PreciseTemplate({
          id,
          subject,
          message,
          link,
          description,
        })
      );
    } else if (template === 'newbusiness') {
      const response = await getStocksData();

      return render(
        PrecisePointTemplate({
          id,
          subject,
          message,
          link,
          description,
          hotPicks,
          stockData: response.result,
        })
      );
    } else if (template === 'esgforum') {
      return render(
        EsgForoumTemplate({
          id,
          subject,
          message,
          banner,
          link,
          image,
          description,
        })
      );
    } else if (template && reportTemplates.includes(template)) {
      return render(
        CheveronTemplate({
          id,
          subject,
          message,
          podcastVlog,
          economicReport,
          masthead: template,
        })
      );
    } else {
      return render(
        BlankTemplate({
          id,
          image,
          subject,
          message,
          content,
          link,
          banner,
          description,
        })
      );
    }
  }
};
