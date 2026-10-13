import { cssVar } from './cssVar';

export const buttonVariants = ['primary', 'secondary', 'tertiary'] as const;
export const buttonColors = ['primary', 'white', 'positive', 'negative'] as const;
export const buttonSizes = ['xsmall', 'small', 'medium', 'large'] as const;

export type ButtonVariant = (typeof buttonVariants)[number];
export type ButtonColor = (typeof buttonColors)[number];
export type ButtonSize = (typeof buttonSizes)[number];
export type ButtonState = 'default' | 'highlighted' | 'disabled';

type ShadowLayer = {
  y: number;
  blur: number;
  spread: number;
  color: string;
};

const borderShadow = (
  color: 'primary' | 'positive' | 'negative',
  state: ButtonState,
): ShadowLayer[] => {
  if (state === 'disabled') return [];
  const edge = state === 'highlighted' ? 'highlighted' : 'default';
  return [
    { y: -1.5, blur: 0, spread: 0, color: `interactive.border.${color}.highlighted` },
    { y: 0, blur: 0, spread: 0.5, color: `interactive.border.${color}.${edge}` },
    { y: 1.5, blur: 0, spread: 0, color: 'interactive.border.staticWhite.faded' },
    { y: -2, blur: 0, spread: 0, color: 'interactive.border.staticWhite.faded' },
  ];
};

const grayShadow = (state: ButtonState): ShadowLayer[] => {
  if (state === 'disabled') {
    return [{ y: 0, blur: 0, spread: 1, color: 'interactive.border.gray.disabled' }];
  }
  const edge = state === 'highlighted' ? 'highlighted' : 'default';
  return [
    { y: -1, blur: 0.5, spread: 0, color: 'interactive.border.staticBlack.fadedHighlighted' },
    { y: 0, blur: 0, spread: 1, color: `interactive.border.gray.${edge}` },
    { y: -1.5, blur: 0, spread: 0, color: 'interactive.border.gray.default' },
  ];
};

const whiteShadow = (variant: 'primary' | 'secondary' | 'tertiary', state: ButtonState): ShadowLayer[] => {
  if (state === 'disabled') {
    if (variant === 'primary') return [];
    return [{ y: 0, blur: 0, spread: 1, color: 'interactive.border.staticWhite.disabled' }];
  }
  if (variant === 'primary') {
    return [
      { y: -1.5, blur: 0, spread: 0, color: 'interactive.border.staticBlack.fadedHighlighted' },
      { y: 0, blur: 0, spread: 0.5, color: 'interactive.border.staticBlack.fadedHighlighted' },
    ];
  }
  return [
    { y: -1.5, blur: 0, spread: 0, color: 'interactive.border.staticBlack.fadedHighlighted' },
    { y: 0, blur: 0, spread: 1, color: 'interactive.border.staticWhite.highlighted' },
  ];
};

const shadowFor = (variant: ButtonVariant, color: ButtonColor, state: ButtonState): ShadowLayer[] => {
  if (color === 'white') return whiteShadow(variant, state);
  if (variant === 'primary' && (color === 'primary' || color === 'positive' || color === 'negative')) {
    return borderShadow(color, state);
  }
  return grayShadow(state);
};

const toShadow = (layers: ShadowLayer[]) =>
  layers.length === 0
    ? 'none'
    : layers
        .map((layer) => `inset 0 ${layer.y}px ${layer.blur}px ${layer.spread}px ${cssVar(layer.color)}`)
        .join(', ');

type Paint = {
  background: string;
  text: string;
  icon: string;
};

const paint = (variant: ButtonVariant, color: ButtonColor, state: ButtonState): Paint => {
  if (color === 'white') {
    if (variant === 'primary') {
      return {
        background:
          state === 'highlighted'
            ? 'interactive.background.staticWhite.highlighted'
            : state === 'disabled'
              ? 'interactive.background.staticWhite.disabled'
              : 'interactive.background.staticWhite.default',
        text: state === 'disabled' ? 'interactive.text.staticBlack.disabled' : 'interactive.text.staticBlack.muted',
        icon: state === 'disabled' ? 'interactive.icon.staticBlack.disabled' : 'interactive.icon.staticBlack.muted',
      };
    }
    return {
      background:
        state === 'highlighted'
          ? 'interactive.background.staticBlack.faded'
          : state === 'disabled'
            ? 'interactive.background.gray.disabled'
            : 'interactive.background.staticWhite.faded',
      text: state === 'disabled' ? 'interactive.text.staticWhite.disabled' : 'interactive.text.staticWhite.normal',
      icon: state === 'disabled' ? 'interactive.icon.staticWhite.disabled' : 'interactive.icon.staticWhite.normal',
    };
  }

  if (variant === 'primary' && (color === 'positive' || color === 'negative')) {
    return {
      background: `interactive.background.${color}.${state === 'default' ? 'default' : state}`,
      text: state === 'disabled' ? `interactive.text.${color}.disabled` : 'interactive.text.staticWhite.normal',
      icon: state === 'disabled' ? `interactive.icon.${color}.disabled` : 'interactive.icon.staticWhite.normal',
    };
  }

  if (variant === 'primary') {
    return {
      background: `interactive.background.primary.${state === 'default' ? 'default' : state}`,
      text: state === 'disabled' ? 'interactive.text.primary.disabled' : 'interactive.text.onPrimary.normal',
      icon: state === 'disabled' ? 'interactive.icon.primary.disabled' : 'interactive.icon.onPrimary.normal',
    };
  }

  if (color === 'positive' || color === 'negative') {
    return {
      background:
        state === 'disabled' ? 'interactive.background.staticWhite.ghost' : 'surface.background.gray.intense',
      text: state === 'disabled' ? `interactive.text.${color}.disabled` : `interactive.text.${color}.normal`,
      icon: state === 'disabled' ? `interactive.icon.${color}.disabled` : `interactive.icon.${color}.normal`,
    };
  }

  return {
    background: state === 'disabled' ? 'interactive.background.staticWhite.ghost' : 'surface.background.gray.intense',
    text: state === 'disabled' ? 'interactive.text.gray.disabled' : 'interactive.text.gray.normal',
    icon: state === 'disabled' ? 'interactive.icon.gray.disabled' : 'interactive.icon.gray.normal',
  };
};

/** Tertiary is only valid with primary or white. */
export const isAllowedButton = (variant: ButtonVariant, color: ButtonColor) =>
  variant !== 'tertiary' || color === 'primary' || color === 'white';

export const buttonSizeRules: Record<
  ButtonSize,
  {
    minHeight: number;
    paddingX: number;
    radius: number;
    iconSize: number;
    iconOnlySize: number;
    iconOnlyIcon: number;
    fontSize: number;
    lineHeight: number;
  }
> = {
  xsmall: { minHeight: 28, paddingX: 8, radius: 8, iconSize: 12, iconOnlySize: 28, iconOnlyIcon: 16, fontSize: 12, lineHeight: 18 },
  small: { minHeight: 32, paddingX: 8, radius: 8, iconSize: 12, iconOnlySize: 32, iconOnlyIcon: 16, fontSize: 12, lineHeight: 18 },
  medium: { minHeight: 36, paddingX: 12, radius: 8, iconSize: 16, iconOnlySize: 36, iconOnlyIcon: 16, fontSize: 14, lineHeight: 20 },
  large: { minHeight: 48, paddingX: 16, radius: 12, iconSize: 16, iconOnlySize: 48, iconOnlyIcon: 16, fontSize: 16, lineHeight: 24 },
};

export type ButtonStyle = {
  background: string;
  color: string;
  icon: string;
  boxShadow: string;
  minHeight: number;
  paddingInline: number;
  borderRadius: number;
  fontSize: number;
  lineHeight: number;
  iconSize: number;
};

export const buttonStyle = (
  variant: ButtonVariant,
  color: ButtonColor,
  size: ButtonSize,
  state: ButtonState = 'default',
): ButtonStyle => {
  const tone = paint(variant, color, state);
  const metrics = buttonSizeRules[size];
  return {
    background: cssVar(tone.background),
    color: cssVar(tone.text),
    icon: cssVar(tone.icon),
    boxShadow: toShadow(shadowFor(variant, color, state)),
    minHeight: metrics.minHeight,
    paddingInline: metrics.paddingX,
    borderRadius: metrics.radius,
    fontSize: metrics.fontSize,
    lineHeight: metrics.lineHeight,
    iconSize: metrics.iconSize,
  };
};

export const buttonRules = [
  'Use Button for actions. Use Link when the control navigates as a link.',
  'Primary is the main action, secondary supports it, tertiary is de-emphasized.',
  'Tertiary only pairs with color primary or white.',
  'Icon-only actions use IconButton, with an accessibility label.',
  'Icon size follows the button size: 12px on xsmall and small, 16px on medium and large.',
] as const;
