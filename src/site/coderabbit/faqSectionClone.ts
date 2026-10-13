import { KLEAR_FAQ_ITEMS } from './klearFaqCopy';
import { applyKlearNowBranding } from './klearNowBranding';

const FAQ_PLUS_PATH =
  'M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z';

const FAQ_MINUS_PATH =
  'M3.75 12a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Z';

const FAQ_BUTTON_CLASS =
  'outline-hidden enabled:cursor-pointer aria-disabled:cursor-default focus-visible:ring-2 focus-visible:ring-cui-focus focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group flex w-full cursor-pointer items-start justify-between gap-5 py-5 text-left text-cui-primary hover:text-orange-400 md:py-6';

const FAQ_PLUS_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon" class="size-4"><path fill-rule="evenodd" d="${FAQ_PLUS_PATH}" clip-rule="evenodd"></path></svg>`;

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const buildFaqAnswerHtml = (answer: string, editorialNote?: string) => {
  const parts: string[] = [];
  if (answer) {
    parts.push(`<span>${escapeHtml(answer)}</span>`);
  }
  if (editorialNote) {
    const prefix = answer ? ' ' : '';
    parts.push(
      `<span class="cr-faq-editorial-note">${prefix}[${escapeHtml(editorialNote)}]</span>`,
    );
  }
  return parts.join('');
};

const buildFaqListHtml = () =>
  KLEAR_FAQ_ITEMS.map((item, index) => {
    const triggerId = `faq-trigger-klear-${index}`;
    const answerId = `faq-answer-klear-${index}`;
    return `<li class="border-t-[0.0625rem] border-cui-neutral/40 last:border-b-[0.0625rem]"><h3><button type="button" class="${FAQ_BUTTON_CLASS}" id="${triggerId}" aria-controls="${answerId}" aria-expanded="false"><span class="pr-2 font-heading text-body-lg font-medium text-pretty md:text-heading-2xs">${escapeHtml(item.question)}</span><span aria-hidden="true" class="mt-1 flex size-5 shrink-0 items-center justify-center text-cui-tertiary group-hover:text-orange-500">${FAQ_PLUS_ICON}</span></button></h3><div id="${answerId}" role="region" aria-labelledby="${triggerId}" hidden class="pb-6 pr-12 md:pb-7 md:pr-16"><div class="prose dark:prose-invert max-w-2xl font-body text-pretty text-cui-secondary [&amp;_a]:text-cui-primary [&amp;_p]:my-0">${buildFaqAnswerHtml(item.answer, item.editorialNote)}</div></div></li>`;
  }).join('');

export const applyKlearFaqContent = (host: HTMLElement) => {
  const list = host.querySelector('ul');
  if (!list) return;
  list.innerHTML = buildFaqListHtml();
};

const setFaqItemOpen = (button: HTMLButtonElement, root: HTMLElement, open: boolean) => {
  const answerId = button.getAttribute('aria-controls');
  const answer = answerId ? root.querySelector<HTMLElement>(`#${CSS.escape(answerId)}`) : null;

  button.setAttribute('aria-expanded', open ? 'true' : 'false');
  if (answer) {
    if (open) answer.removeAttribute('hidden');
    else answer.setAttribute('hidden', '');
  }

  const path = button.querySelector('svg path');
  if (path) {
    path.setAttribute('d', open ? FAQ_MINUS_PATH : FAQ_PLUS_PATH);
    path.setAttribute('clip-rule', 'evenodd');
  }
};

export const wireFaqAccordion = (root: HTMLElement) => {
  if (root.dataset.faqWired === 'true') return;

  root.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const button = target.closest<HTMLButtonElement>('button[aria-controls^="faq-answer-"]');
    if (!button || !root.contains(button)) return;

    const isOpen = button.getAttribute('aria-expanded') === 'true';
    setFaqItemOpen(button, root, !isOpen);
  });

  root.dataset.faqWired = 'true';
};

export const mountFaqSectionClone = (host: HTMLElement) => {
  const container = host.querySelector<HTMLElement>('.container');
  container?.setAttribute('id', 'faq');

  const heading = host.querySelector<HTMLElement>('h2');
  if (heading && !heading.id) {
    heading.id = 'faq-heading';
  }

  const section = host.querySelector('section');
  if (section && heading?.id) {
    section.setAttribute('aria-labelledby', heading.id);
  }

  applyKlearFaqContent(host);
  wireFaqAccordion(host);
  applyKlearNowBranding(host);
};
