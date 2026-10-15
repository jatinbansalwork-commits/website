import { useState } from 'react';
import {
  buttonColors,
  buttonRules,
  buttonSizes,
  buttonStyle,
  buttonVariants,
  isAllowedButton,
  type ButtonColor,
  type ButtonSize,
  type ButtonVariant,
} from './rules/button';
import { cssVar } from './rules/cssVar';
import {
  iconButtonEmphasisTokens,
  iconButtonSizeRules,
  iconColorTokens,
  iconRules,
  iconSizes,
  type IconButtonEmphasis,
  type IconButtonSize,
  type IconSize,
} from './rules/icon';

const ArrowIcon = ({ size, color }: { size: number; color?: string }) => (
  <svg className="kn-icon" width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M5 12h14M13 6l6 6-6 6"
      stroke={color ?? 'currentColor'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const KnButton = ({
  variant,
  color,
  size = 'medium',
  children,
  iconPosition = 'left',
  disabled = false,
}: {
  variant: ButtonVariant;
  color: ButtonColor;
  size?: ButtonSize;
  children?: string;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
}) => {
  const [hovered, setHovered] = useState(false);
  const state = disabled ? 'disabled' : hovered ? 'highlighted' : 'default';
  const style = buttonStyle(variant, color, size, state);
  const icon = <ArrowIcon size={style.iconSize} color={style.icon} />;

  return (
    <button
      type="button"
      className="kn-button"
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: style.background,
        color: style.color,
        boxShadow: style.boxShadow,
        minHeight: style.minHeight,
        paddingInline: style.paddingInline,
        borderRadius: style.borderRadius,
        fontSize: style.fontSize,
        lineHeight: `${style.lineHeight}px`,
      }}
    >
      {iconPosition === 'left' ? icon : null}
      {children}
      {iconPosition === 'right' ? icon : null}
    </button>
  );
};

const IconButton = ({
  size,
  emphasis,
  label,
}: {
  size: IconButtonSize;
  emphasis: IconButtonEmphasis;
  label: string;
}) => {
  const [hovered, setHovered] = useState(false);
  const metrics = iconButtonSizeRules[size];
  const tone = iconButtonEmphasisTokens[emphasis];
  const background = hovered ? cssVar(tone.hover) : tone.rest === 'transparent' ? 'transparent' : cssVar(tone.rest);
  return (
    <button
      type="button"
      className="kn-icon-button"
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: metrics.hitSize,
        height: metrics.hitSize,
        background,
      }}
    >
      <ArrowIcon size={metrics.icon} />
    </button>
  );
};

const RuleSet = () => (
  <div className="rules">
    <section aria-labelledby="button-rules-heading">
      <h2 id="button-rules-heading">Button rules</h2>
      <ul className="rule-list">
        {buttonRules.map((rule) => (
          <li key={rule}>{rule}</li>
        ))}
      </ul>

      <p className="rule-label">Sizes</p>
      <div className="rule-row">
        {buttonSizes.map((size) => (
          <KnButton key={size} variant="primary" color="primary" size={size}>
            {size}
          </KnButton>
        ))}
      </div>

      <p className="rule-label">Variant and color</p>
      <div className="rule-row">
        {buttonVariants.flatMap((variant) =>
          buttonColors
            .filter((color) => color !== 'white' && isAllowedButton(variant, color))
            .map((color) => (
              <KnButton key={`${variant}-${color}`} variant={variant} color={color}>
                {`${variant} ${color}`}
              </KnButton>
            )),
        )}
        <KnButton variant="primary" color="primary" disabled>
          Disabled
        </KnButton>
      </div>

      <p className="rule-label">White, on an intense surface</p>
      <div className="kn-stage">
        {buttonVariants.map((variant) => (
          <KnButton key={variant} variant={variant} color="white">
            {`${variant} white`}
          </KnButton>
        ))}
      </div>
    </section>

    <section aria-labelledby="icon-rules-heading">
      <h2 id="icon-rules-heading">Icon rules</h2>
      <ul className="rule-list">
        {iconRules.map((rule) => (
          <li key={rule}>{rule}</li>
        ))}
      </ul>

      <p className="rule-label">Sizes</p>
      <div className="icon-scale">
        {(Object.keys(iconSizes) as IconSize[]).map((size) => (
          <figure key={size}>
            <ArrowIcon size={iconSizes[size]} />
            <figcaption>
              {size} · {iconSizes[size]}px
            </figcaption>
          </figure>
        ))}
      </div>

      <p className="rule-label">Color tokens</p>
      <div className="icon-colors">
        {iconColorTokens.map((token) => {
          const icon = <ArrowIcon size={iconSizes.large} color={cssVar(token)} />;
          return (
            <figure key={token}>
              {token.includes('staticWhite') ? <span className="icon-contrast">{icon}</span> : icon}
              <figcaption>{token}</figcaption>
            </figure>
          );
        })}
      </div>

      <p className="rule-label">Icon buttons</p>
      <div className="rule-row">
        {(Object.keys(iconButtonSizeRules) as IconButtonSize[]).map((size) => (
          <IconButton key={size} size={size} emphasis="intense" label={`Go forward, ${size}`} />
        ))}
        <IconButton size="medium" emphasis="subtle" label="Go forward, subtle" />
      </div>
    </section>
  </div>
);

export default RuleSet;
