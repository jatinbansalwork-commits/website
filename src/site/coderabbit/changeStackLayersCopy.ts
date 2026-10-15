/** Copy for Change Stack layers walkthrough (trade / customs). */

const replaceTextInTree = (root: ParentNode, replacements: [string, string][]) => {
  const ordered = [...replacements].sort((a, b) => b[0].length - a[0].length);
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node: Text | null;
  while ((node = walker.nextNode() as Text | null)) {
    let value = node.nodeValue ?? '';
    let changed = false;
    for (const [from, to] of ordered) {
      if (value.includes(from)) {
        value = value.split(from).join(to);
        changed = true;
      }
    }
    if (changed) node.nodeValue = value;
  }
};

export const CHANGE_STACK_LAYERS_COPY: [string, string][] = [
  ['Visualize the impact across layers.', "You'll only hear about the exceptions."],
  [
    'Change Stack gives you the walkthrough a senior engineer would give.',
    'One system connecting trade data, customs clearance, and the licensed brokers who run both. From the first emailed document to a filed entry you can audit.',
  ],
  ['Change cohorts', 'Every document in. One complete shipment out.'],
  ['Document cohorts', 'Every document in. One complete shipment out.'],
  [
    'Group related work so reviewers can move through the change by intent instead of file order.',
    'Email, SFTP, EDI, API or upload. KlearData classifies each document, extracts the fields with agents that cross-check each other, and builds one shipment record. Anything missing or low-confidence is flagged before anything is filed.',
  ],
  [
    'Group related documents so your team moves through the shipment by intent instead of file order.',
    'Email, SFTP, EDI, API or upload. KlearData classifies each document, extracts the fields with agents that cross-check each other, and builds one shipment record. Anything missing or low-confidence is flagged before anything is filed.',
  ],
  ['Ordered layers', 'Checked before it files. Audited again after it clears.'],
  ['Ordered filing layers', 'Checked before it files. Audited again after it clears.'],
  [
    'Break cohorts into a sequence anchored to specific line ranges.',
    'Brokers need entries validated before they file. Importers need entries audited after they clear. KlearNow runs both on the same rules layer, so what you file and what you audit are held to the same standard.',
  ],
  [
    'Break cohorts into a sequence anchored to invoice lines, HTS rows, and PGA holds.',
    'Brokers need entries validated before they file. Importers need entries audited after they clear. KlearNow runs both on the same rules layer, so what you file and what you audit are held to the same standard.',
  ],
  ['Architectural impact', 'Your team, ours, or an agent. Same engine.'],
  [
    'Understand how the change reaches across files and services.',
    'Every entry that cannot be resolved with confidence becomes an exception. You choose who works it, and the mix can shift as agents learn your documents and rules.',
  ],
  [
    'Understand how a change reaches across invoices, packing lists, and the filed entry.',
    'Every entry that cannot be resolved with confidence becomes an exception. You choose who works it, and the mix can shift as agents learn your documents and rules.',
  ],
  ['Blast radius', 'Duty exposure'],
  [
    'See the risks and the parts of the diff driving them.',
    'See duty, PGA, and classification risks—and the documents driving them.',
  ],
  ['Add teammate invitations with roles', 'Add broker collaborators with roles'],
  ['acme/web-app', 'apex/logistics-portal'],
  ['Submit review', 'Submit filing'],
  ['Teammate invitations with roles', 'Broker collaborators with roles'],
  ['Review Change Stack', 'Document intake stack'],
  ['Change Stack walkthrough', 'Document intake walkthrough'],
  ['Layers', 'Filing layers'],
  ['Security blast radius', 'Duty & PGA exposure'],
  ['Architecture impact', 'Compliance impact'],
  ['QA Agent', 'Exception agent'],
  ['Add the invitation data model', 'Add the commercial invoice model'],
  ['Add the invitation API and emails', 'Add the ISF API and arrival notices'],
  ['Build the invite & members UI', 'Build the broker portal UI'],
  ['Data model · API · Members UI', 'Invoice · ISF · Broker portal'],
  ['1 merge blocker to act on', '1 release blocker to act on'],
  ['Code conflicts need to be resolved', 'HTS mismatch needs to be resolved'],
  ['Review in Change Stack. Post to your Git platform.', 'Review in Klearhub. Sync to your broker portal.'],
  [
    "Comments, approvals, and change requests sync with the GitHub surface and vice versa. An upgrade to your review interface that doesn’t break existing workflows.",
    'Comments, approvals, and change requests sync with your broker portal and TMS—without replacing how your team already works.',
  ],
];

export const applyChangeStackLayersCopy = (host: HTMLElement) => {
  replaceTextInTree(host, CHANGE_STACK_LAYERS_COPY);
};
