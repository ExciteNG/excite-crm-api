export enum UserStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  DEACTIVATED = 'deactivated',
}

export enum UserSource {
  ONLINEEVENT = 'online-event',
  PHYSICALEVENT = 'physical-event',
  FACEBOOK = 'facebook',
  INSTAGRAM = 'instagram',
  TWITTER = 'twitter',
  LINKEDIN = 'linkedin',
  REFERRAL = 'referral',
  EXCITEAPP = 'excite-app',
  EXCITEWEBSITE = 'excite-website',
  OTHER = 'other',
}

export enum AccountType {
  LEADS = 'leads',
  MERCHANT = 'merchant',
  SALESAGENT = 'sales-agent',
}

export enum ManagerStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  DEACTIVATED = 'deactivated',
}

export enum ManagerRole {
  ADMIN = 'admin',
  MANAGER = 'manager',
}

export type SendEmail = {
  to: string;
  cc?: string | string[];
  bcc?: string | string[];
  body: string;
  subject: string;
  socketId?: string;
  from: {
    user: string;
    pass: string;
  };
};

export type SendBulkEmail = {
  emails: string[];
  cc?: string | string[];
  bcc?: string | string[];
  body: string;
  subject: string;
  socketId?: string;
  from: {
    user: string;
    pass: string;
    username: string;
  };
};

export type SectionType = {
  image?: string;
  content?: string;
};

export type TemplateProps = {
  id?: string;
  subject: string;
  message: string;
  image?: string;
  content?: string;
  link?: string;
  template?: string;
  banner?: string;
  description?: string;
  hotPicks?: HotPicks[];
  stockData?: StockData;
  sections?: SectionType[];
  economicReport?: EconomicReport[];
  podcastVlog?: PodcastVlogs[];
  masthead?: string;
  attachemntUrl?: string;
  // masthead?: "chevron" | "promasidor" | "shoreline" | "nestlé";
};

export type StockData = {
  stock_market: {
    all_share_index?: string;
    percentage?: string;
    volume?: string;
    value_traded?: string;
    transaction?: string;
  };
  crude_oil: { wti_oil?: string; brent_oil?: string };
  commodity: {
    gold?: string;
    platinum?: string;
    silver?: string;
    coal?: string;
    uranium?: string;
    lead?: string;
    iron_ore?: string;
  };
};

export type HotPicks = {
  title?: string;
  description?: string;
  image?: string;
  link?: string;
};

export type Attendee = {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  organization?: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
  eventType: string;
  __v: number;
};

export type EconomicReport = {
  description?: string;
  issueType?: string;
  duration?: string;
  geography?: string;
  coverage?: string;
};

export type PodcastVlogs = {
  title?: string;
  description?: string;
  banner?: string;
  link?: string;
};
