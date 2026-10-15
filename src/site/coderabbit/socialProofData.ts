export type SocialProofLogo = {
  id: string;
  label: string;
  asset: string;
  caseStudyHref?: string;
  /** When false, logo keeps brand colors (default: monochrome on light panel). */
  monochrome?: boolean;
};

export const socialProofLogos: SocialProofLogo[] = [
  {
    id: 'dhl',
    label: 'DHL',
    asset:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ac/DHL_Logo.svg/3840px-DHL_Logo.svg.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail',
    monochrome: false,
  },
  {
    id: 'target',
    label: 'Target',
    asset:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6e/Target_Logo_%282%29.svg/960px-Target_Logo_%282%29.svg.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail',
    monochrome: false,
  },
  {
    id: 'basf',
    label: 'BASF',
    asset:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9c/BASF-Logo_bw.svg/3840px-BASF-Logo_bw.svg.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail',
    monochrome: false,
  },
  {
    id: 'subaru',
    label: 'Subaru',
    asset:
      'https://upload.wikimedia.org/wikipedia/commons/c/ca/Subaru_logo_%28transparent%29.svg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original',
    monochrome: false,
  },
  {
    id: 'wayfair',
    label: 'Wayfair',
    asset:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/75/Wayfair_logo.svg/3840px-Wayfair_logo.svg.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail',
    monochrome: false,
  },
  {
    id: 'hershey',
    label: 'Hershey',
    asset:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e5/Hershey_logo.svg/3840px-Hershey_logo.svg.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail',
    monochrome: false,
  },
  {
    id: 'panasonic',
    label: 'Panasonic',
    asset:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Panasonic_logo_%28Blue%29.svg/3840px-Panasonic_logo_%28Blue%29.svg.png',
    monochrome: false,
  },
  {
    id: 'thyssenkrupp',
    label: 'Thyssenkrupp',
    asset:
      'https://upload.wikimedia.org/wikipedia/commons/e/ec/ThyssenKrupp_former_logo.svg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original',
    monochrome: false,
  },
];

export const featuredCustomerQuote = {
  quote: "We're using KlearNow all over Ford",
  name: 'Jim Farley, President and CEO',
  brand: 'Ford',
  logo: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Ford_logo_flat.svg',
  storyHref: 'https://www.klearnow.ai/case-studies',
};
