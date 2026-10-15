export const cssVar = (token: string) => `var(--${token.replaceAll('.', '-')})`;
