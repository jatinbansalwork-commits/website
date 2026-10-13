export const iconSizes = {
  xsmall: 8,
  small: 12,
  medium: 16,
  large: 20,
  xlarge: 24,
  '2xlarge': 32,
} as const;

export type IconSize = keyof typeof iconSizes;

export const iconColorTokens = [
  'surface.icon.gray.normal',
  'surface.icon.gray.subtle',
  'surface.icon.primary.normal',
  'feedback.icon.positive.intense',
  'feedback.icon.negative.intense',
  'feedback.icon.notice.intense',
  'feedback.icon.information.intense',
  'surface.icon.staticWhite.normal',
] as const;

export const iconButtonSizeRules = {
  small: { hitSize: 24, icon: iconSizes.small },
  medium: { hitSize: 32, icon: iconSizes.medium },
} as const;

export type IconButtonSize = keyof typeof iconButtonSizeRules;
export type IconButtonEmphasis = 'intense' | 'subtle';

export const iconButtonEmphasisTokens: Record<IconButtonEmphasis, { rest: string; hover: string }> = {
  intense: {
    rest: 'transparent',
    hover: 'interactive.background.gray.fadedHighlighted',
  },
  subtle: {
    rest: 'transparent',
    hover: 'interactive.background.staticWhite.faded',
  },
};

export const iconRules = [
  'Icons are communicative. Pass the icon component into Button, IconButton, Badge, or an input.',
  'A clickable icon is an IconButton with an accessibilityLabel that names the action.',
  'Default size is medium (16px). Match the icon size to the control around it.',
  'Color comes from surface.icon, feedback.icon, or interactive.icon tokens.',
  'Stroked icons are the default. Filled icons mark a selected or active state.',
  'Small and medium IconButtons need a real hit target: 24px at small, 32px at medium. Large does not use that highlighted treatment.',
] as const;
