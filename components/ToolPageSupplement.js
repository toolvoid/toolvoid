const SUPPLEMENTS = {
  'one-brain': {
    example: 'Search for a saved memory, then review its context before sending it to an online AI provider.',
    steps: ['Download the build for your system.', 'Install or run One Brain.', 'Create a vault with a master password and save the recovery file somewhere safe.', 'Add or import memories.', 'Search; the first search needs internet once to download the approximately 130 MB local model.', 'Open Settings → Connections to connect an MCP client, local proxy, or browser extension.', 'Search, chat with your memories, and review context before sending.'],
    faqs: [
      ['Where are One Brain memories stored?', 'They are kept in an encrypted database on your computer; One Brain has no cloud server.'],
      ['Does semantic search work offline?', 'The first search needs internet once to download the approximately 130 MB local embedding model. After that, One Brain works fully offline.'],
      ['Does an online AI provider receive sent context?', 'Yes. If you send context to an online AI provider, that provider receives it. Review context before sending.'],
      ['Which computers are supported?', 'Downloads are provided for Linux x64, Windows x64, and macOS Apple Silicon. Intel Macs are not supported.'],
    ],
  },
  'capsule-manager': {
    example: 'A developer can preserve an API decision and open migration questions before moving debugging into a fresh chat.',
    steps: ['Write the goal, decisions, constraints, and next action.', 'Save the notes under a project name and useful tags.', 'Search for the capsule when returning to the work.', 'Review and update it before using the saved context.'],
    faqs: [
      ['Where are capsules saved?', 'They are stored in the browser profile and local site data used to create them.'],
      ['Can I separate notes by project?', 'Yes. Use a recognizable capsule name and tags to distinguish projects or work stages.'],
      ['Does a capsule update an AI conversation automatically?', 'No. Review the saved material and add it to the conversation where you want to continue.'],
      ['What makes a useful capsule?', 'Include the goal, decisions, constraints, references, and next action; leave out credentials.'],
      ['Will capsules appear in another browser?', 'Browser-local data is not automatically synchronized; use the available export or backup workflow.'],
    ],
  },
  hashtag: {
    heading: 'Use the hashtag generator controls',
    copy: 'The Topic field accepts up to 200 characters. Select a platform and category, choose 15, 20, or 30 hashtags, then select Generate Hashtags. The server sends the topic, platform, category, and count to Google Gemini.',
    example: 'Enter “sourdough bakery workshop”, select Instagram and General, choose 15, 20, or 30, and review the generated groups.',
    steps: ['Enter a topic in the Topic field (up to 200 characters).', 'Choose a platform in Platform and a category in Category.', 'Choose 15, 20, or 30.', 'Select Generate Hashtags and review the high-volume, medium, and niche groups.'],
  },
  keyword: {
    example: 'A bicycle shop can compare winter tire-care phrases with local tune-up searches before outlining a service page.',
    steps: ['Enter a focused topic or seed phrase.', 'Choose audience, market, and content type.', 'Generate and group related search ideas.', 'Validate leading phrases against current search results.'],
  },
  imagegen: {
    heading: 'Use the image generator controls',
    copy: 'The Image Description field accepts up to 500 characters. Choose a style, mood, and aspect ratio, then select Generate Image. The request is sent to the ToolVoid image route, which calls Pollinations for image generation. The page and lib/quotaStore.js set the image-generator limit to 6 per day.',
    example: 'Enter “a red bicycle beside a brick wall”, choose a style, mood, and one of the listed aspect ratios, then select Generate Image.',
    steps: ['Enter a description in Image Description (up to 500 characters).', 'Choose a style and mood.', 'Choose 1:1, 16:9, 9:16, or 4:3.', 'Select Generate Image and inspect the returned preview.'],
  },
  'image-tools': {
    heading: 'Prepare an image for its actual destination',
    copy: 'Image Tools brings together common raster-file tasks: change dimensions, reframe a photograph, reduce transfer size, or convert supported formats. It is useful when a marketplace specifies a square product image, an email attachment needs to be smaller, or a site needs consistent thumbnails. A smaller file is not automatically a better asset; inspect details at the size where people will see them. Work from a copy when the original matters, preview the result, and confirm output dimensions and format before distribution.',
    example: 'An online seller can crop a square product thumbnail and reduce its file weight for a marketplace upload.',
    steps: ['Select an image and choose the needed operation.', 'Set target dimensions or crop framing.', 'Adjust compression or output format.', 'Preview the result and save a checked version.'],
    faqs: [
      ['When should I resize instead of crop?', 'Resizing changes dimensions; cropping removes part of the frame.'],
      ['Does compression preserve every pixel?', 'Compression can change image data; compare the preview before replacing an original.'],
      ['Which formats can I use?', 'Choose from the formats shown by the page controls.'],
      ['What dimensions should I select?', 'Use the requirements of the page, marketplace, email, or document.'],
      ['Should I keep the original image?', 'Yes. Retain a source copy until the processed version has been checked.'],
    ],
  },
  pdf: {
    heading: 'Export selected PDF pages for image-based workflows',
    copy: 'This converter renders document pages as image files for workflows that accept pictures rather than PDFs. It can help place one chart in a presentation, share a visual excerpt in a message, or prepare a page preview for a site. Select only the pages you need, since long documents produce many files and take longer to render. Choose resolution with small text in mind, then inspect the result at its intended display size. An image is not an editable or searchable replacement for the original document, so keep the source PDF for later reference.',
    example: 'Upload a PDF, choose Convert to Images, select PNG, and download a rendered page.',
    steps: ['Choose a PDF with the file picker or drop it in the upload area.', 'Select Convert to Images.', 'Choose JPG, PNG, or WebP and set the available output options.', 'Review the rendered page and use its download control.'],
  },
  passport: {
    heading: 'Frame a portrait for a document-photo requirement',
    copy: 'The photo maker helps prepare a portrait crop for passport, visa, and identity-document workflows. Country and document presets provide a starting frame, while crop and background controls help align an image with a stated requirement. Applicants can review a digital result before printing or uploading it. A preset is not an official approval: rules vary by authority, change over time, and may prohibit retouching. Start with a clear, front-facing portrait, select the exact document type, then compare the final dimensions and appearance with the current official notice.',
    example: 'A traveler renewing an ID can prepare a crop, then confirm the issuing office’s latest dimensions and background rules.',
    steps: ['Select the country and document preset.', 'Upload a clear portrait and position the face.', 'Adjust the crop and permitted background controls.', 'Compare the export with current official instructions.'],
    faqs: [
      ['Does a preset guarantee acceptance?', 'No. The issuing authority decides, and its requirements may change.'],
      ['Can I use any portrait?', 'Choose a sharp, well-lit photo that meets the authority’s pose requirements.'],
      ['Can I change the background?', 'Use background controls only when the receiving rules allow that treatment.'],
      ['What should I inspect before export?', 'Check face placement, background, dimensions, and clarity against the notice.'],
      ['Is the file ready for every application?', 'Confirm file type, size, and specifications for the particular application.'],
    ],
  },
  qr: {
    heading: 'Make a scannable code for a specific handoff',
    copy: 'A QR code turns a small amount of information into a pattern a camera can scan. Additional generator modes on this page support other machine-readable formats, so select the type accepted by the receiving device. A café might encode its current menu; an event organizer could link a registration page; a warehouse may need a barcode supported by inventory software. Keep the encoded information accurate, use sufficient contrast, and avoid printing sensitive values where anyone can scan them. Test a downloaded proof at the size and distance where it will be used.',
    example: 'A café can put a menu link on a table card and test the printed proof with a phone camera.',
    steps: ['Choose a code type for the information.', 'Enter a URL, text, or supported contact value.', 'Set appearance and export size.', 'Scan a test file before printing or sharing.'],
    faqs: [
      ['What can a QR code contain?', 'Use the content types offered by the selected generator mode.'],
      ['Can I change its colors?', 'Appearance controls are available; maintain enough contrast for scanning.'],
      ['Which downloads are offered?', 'Choose among the export formats shown in the interface.'],
      ['Should I test a code before printing?', 'Yes. Scan the downloaded result at its intended size.'],
      ['Will an encoded link stay current?', 'The code stores its value; the destination must remain valid separately.'],
    ],
  },
  password: {
    heading: 'Generate a credential with deliberate character rules',
    copy: 'The password generator creates a credential from the length and character groups selected by the user. It is useful for a new account, a staging environment, or a service with particular symbol rules. Generate a distinct value, copy it directly to a password manager, and avoid keeping plaintext copies in messages or documents. Check the destination service’s maximum length and allowed characters before starting, since a restrictive policy may reject a value that is otherwise difficult to guess. A generated password protects only one account; never reuse it elsewhere.',
    example: 'A site administrator can make a separate long credential for a staging account and store it in a team vault.',
    steps: ['Set a length allowed by the account policy.', 'Choose permitted character groups.', 'Generate and copy the new value.', 'Store it securely and do not reuse it.'],
    faqs: [
      ['Can I set password length?', 'Use the length control and observe the target service’s current limits.'],
      ['Can symbols be included?', 'Select character groups supported by the tool and accepted by the service.'],
      ['Should I reuse a generated password?', 'No. A unique value limits the effect of a single account breach.'],
      ['Where should I store the result?', 'Use a reputable password manager instead of a plain note or message.'],
      ['Does a password replace multifactor authentication?', 'No. Enable multifactor authentication where the service offers it.'],
    ],
  },
  domain: {
    heading: 'Compare candidate names before registering a domain',
    copy: 'The lookup checks a proposed name against supported extensions and can display registration information for domains already in use. It is useful during brand naming, before printing a campaign URL, or while investigating an existing site. Availability is a point-in-time result, not a reservation or purchase guarantee. Verify spelling, compare alternatives that are easy to pronounce, and confirm status directly with a registrar. For a company or product, research applicable trademark rights and social handles as well; an available domain does not by itself grant permission to use a brand.',
    example: 'A design studio can compare its preferred name across a country-code extension and a familiar global domain.',
    steps: ['Enter the exact proposed name.', 'Check relevant extensions and result status.', 'Review registration details when available.', 'Verify the final result with a registrar.'],
  },
  unit: {
    heading: 'Convert a measurement without losing its context',
    copy: 'The unit converter translates values between compatible measurements while keeping the selected category visible. It can help with a recipe, travel planning, a classroom exercise, or a quick comparison of product specifications. The result only makes sense when the source unit is correct: confusing millilitres with litres can produce a plausible but unsuitable number. Check the source and destination labels as carefully as the value. For construction, laboratory, medical, or other precision-sensitive work, verify the calculation and rounding against the governing standard.',
    example: 'A home cook can convert a recipe temperature before using an oven with a different scale.',
    steps: ['Select the measurement category.', 'Enter the original value and unit.', 'Choose a compatible destination unit.', 'Check the result and precision before use.'],
    faqs: [
      ['Which measurements are supported?', 'Choose among categories and units shown in the converter.'],
      ['Can I convert temperature?', 'Select that category to check the available temperature units.'],
      ['Why can rounded answers vary?', 'Displayed precision affects the final digits; retain the precision your task requires.'],
      ['Is this suitable for engineering work?', 'Verify critical measurements against an authoritative standard.'],
      ['Can I save a favorite conversion?', 'Use the favorite control if it is offered for the selected conversion.'],
    ],
  },
  base64: {
    heading: 'Inspect Base64 without confusing it with encryption',
    copy: 'Base64 represents binary data using printable characters so it can travel through text-oriented formats. The encoder and decoder can help inspect a data URL, check an API fixture, or prepare a small asset for a test. The representation expands data and provides no confidentiality: anyone with the encoded string can decode it. Choose the operation, provide supported input, and verify the output against expectations. For large assets or secure transport, use a format and transfer method designed for that purpose instead of relying on Base64 as protection.',
    example: 'A frontend developer can decode a test data URL to confirm the media type of an embedded image.',
    steps: ['Choose text or file encode/decode mode.', 'Paste a value or select supported input.', 'Run the conversion and inspect the result.', 'Copy or download only after checking it.'],
    faqs: [
      ['Does Base64 protect private data?', 'No. It is reversible encoding, not encryption.'],
      ['Can I encode a file?', 'Use the file workflow for supported types and sizes.'],
      ['Why might decoding fail?', 'The value may be incomplete, malformed, or not valid Base64.'],
      ['What is a data URL?', 'It can include a media type and encoded data inline.'],
      ['Should I paste credentials here?', 'Avoid sharing secrets unless the data handling is understood and necessary.'],
    ],
  },
  emi: {
    heading: 'Compare instalment scenarios before requesting a quote',
    copy: 'The EMI calculator estimates a regular payment from the principal, interest rate, and repayment term. It can help compare home, vehicle, or personal-loan scenarios before asking providers for formal quotations. A longer term may lower the monthly instalment while increasing the time interest accrues, so consider the total repayment as well. Use consistent assumptions when comparing offers and note whether rates are fixed or variable. Fees, taxes, insurance, payment timing, and lender methods can change what is actually due; confirm a final schedule with the provider.',
    example: 'Rs 5,00,000 at 8.5% for 5 years gives an EMI of Rs 10,258.',
    steps: ['Enter the amount in Loan amount.', 'Enter the annual rate in Interest rate %.', 'Set Tenure in years.', 'Read EMI, TOTAL INTEREST, and TOTAL PAYMENT; use Extra EMI / month to model recurring prepayment.'],
    faqs: [
      ['Which inputs calculate the EMI?', 'Use Loan amount, Interest rate %, and Tenure in years; the calculator also has Extra EMI / month and Lump sum fields.'],
      ['What does the result panel show?', 'It displays the EMI, TOTAL INTEREST, TOTAL PAYMENT, closure date, and interest saved.'],
      ['How can I compare a recurring extra payment?', 'Enter a value in Extra EMI / month and read the updated total interest and total payment.'],
      ['Where can I inspect payment rows?', 'Select Open table; the schedule can switch between monthly and yearly views and offers CSV and JSON exports.'],
    ],
  },
  loan: {
    heading: 'Estimate a borrowing range from income and obligations',
    copy: 'This calculator provides an indicative view of borrowing capacity from the financial and age-related inputs requested by the page. It can help someone explore how a current monthly commitment might affect a proposed personal loan. Use realistic income and include recurring debt rather than entering optimistic figures. Compare multiple scenarios and focus on the resulting instalment as well as the principal. Lenders apply their own underwriting criteria, credit checks, and documentation rules; this estimate is not an approval, a rate quote, or financial advice.',
    example: 'An applicant can model how an existing vehicle payment affects the indicative room for another monthly instalment.',
    steps: ['Enter income and recurring obligations.', 'Set age, requested term, and other inputs.', 'Review the estimate and repayment indicators.', 'Compare with written lender terms before applying.'],
    faqs: [
      ['Does an estimate mean approval?', 'No. A lender decides after its own checks and policy review.'],
      ['Why include existing obligations?', 'Current repayments affect income potentially available for another instalment.'],
      ['Does the tool check a credit report?', 'It uses the inputs shown; it is not a credit-bureau decision.'],
      ['Can a different term change the result?', 'Term assumptions affect calculations, while lender rules still apply.'],
      ['What should I review before borrowing?', 'Compare written offers, fees, rates, and repayment obligations with a provider.'],
    ],
  },
  invoice: {
    heading: 'Prepare an itemized bill a client can reconcile',
    copy: 'The invoice builder collects supplier and customer details, itemizes charges, and produces a document for requesting payment. Consultants, tradespeople, and small studios can use it to present a clear work record without laying out a document from scratch. Separate deliverables into understandable lines, state the currency and payment deadline, and include tax only when it applies. Before sending, verify customer details, invoice numbering, arithmetic, and the terms agreed for the work. Exported formatting does not determine local tax or bookkeeping compliance, so retain a copy and check applicable requirements.',
    example: 'A freelance editor can list two revision rounds separately from the project fee to clarify the bill.',
    steps: ['Add supplier and customer details.', 'Set identifiers, dates, and payment terms.', 'List items with quantities, rates, and taxes.', 'Review totals and export the document.'],
    faqs: [
      ['Can I include several line items?', 'Use the item controls to describe each charge, quantity, and rate.'],
      ['Can tax be added?', 'Enter applicable tax where supported and verify local rules.'],
      ['Can I export a PDF?', 'Use the page export action after reviewing the invoice.'],
      ['Should payment terms be shown?', 'State clear due dates and methods that match your agreement.'],
      ['Does this ensure legal compliance?', 'No. Check local tax, numbering, and record-retention requirements.'],
    ],
  },
  'word-counter': {
    heading: 'Measure draft length against a real publishing constraint',
    copy: 'The counter summarizes text length so a writer can shape a draft for a defined format. It can help with an assignment limit, short caption, newsletter preview, or speech whose delivery time is constrained. Depending on the page controls, it may also show character totals, estimated reading time, keyword frequency, or a goal indicator. Those figures are aids rather than editorial judgments, and platforms may count text differently. Paste the exact material you plan to submit, review the metric that matters, make edits, and check the final version again.',
    example: 'Enter “ToolVoid counts words and characters.” and read the word and character totals above the editor.',
    steps: ['Type or paste text into the editor with id wc-textarea.', 'Read the live words, characters, sentences, and paragraphs counters.', 'Review the reading-time and keyword panels for that text.', 'Edit the text and check the updated counters.'],
  },
  json: {
    heading: 'Format a JSON payload and inspect parser feedback',
    copy: 'The formatter turns compact JSON into an indented structure that is easier to inspect, and can minify valid input when a compact representation is useful. Developers use it to review API responses, configuration files, sample payloads, and test fixtures. Validation feedback concerns syntax: a document can parse and still violate an application schema or business rule. Paste a representative payload, choose the operation, and inspect the reported position if parsing fails. After correction, test the result in the consuming application and remove credentials from examples before sharing them.',
    example: 'Paste {"name":"Sparsh","tools":["json","qr"]} and select Format to inspect its indented structure.',
    steps: ['Paste JSON into the editor.', 'Choose 2 spaces or 4 spaces in Indent size.', 'Select Format, Minify, or Sort Keys.', 'Use JSON path lookup to query a key such as owner.name.'],
    faqs: [
      ['Which indent sizes are available?', 'Indent size offers 2 spaces and 4 spaces.'],
      ['Which transforms are available?', 'The quick actions are Format, Minify, and Sort Keys.'],
      ['Can I import a JSON file?', 'Import File accepts .json, application/json, and text/plain files.'],
      ['Can I look up a nested value?', 'JSON path lookup supports dot notation and array paths such as tools[0].'],
    ],
  },
  tts: {
    heading: 'Listen to a passage to check rhythm and pronunciation',
    copy: 'Text to speech turns written passages into spoken playback, offering another way to review copy and an audio option for listeners. It can help proofread an announcement, rehearse language material, draft narration, or consume a page away from the screen. Choose a voice and supported language that fit the text, then listen for cadence as well as errors: names, abbreviations, and punctuation may sound unexpected. If audio export is available, check the downloaded file before sharing it. Speech output can support accessibility but should not replace a broader review of the content and interface.',
    example: 'A course author can listen to lesson instructions and catch sentences that are awkward to speak aloud.',
    steps: ['Enter or paste the passage.', 'Choose an available voice and language.', 'Adjust playback speed and listen.', 'Review pronunciation before exporting or sharing audio.'],
    faqs: [
      ['Can I choose a voice?', 'Select from the voices available in the interface and browser.'],
      ['Can playback speed be changed?', 'Use the speed control where it is offered.'],
      ['Can speech be downloaded?', 'Use the audio export action if available for the selected voice.'],
      ['Will names always sound right?', 'No. Check names, acronyms, and specialized vocabulary by listening.'],
      ['Does speech output replace accessibility testing?', 'No. Review the full experience with appropriate assistive technology.'],
    ],
  },
  resume: {
    heading: 'Arrange career evidence for a particular application',
    copy: 'The resume builder organizes work history, education, skills, and supporting sections into an application document. It can help create a first structured draft or maintain tailored versions for different roles. Strong entries describe contribution and outcome instead of listing duties alone; use accurate figures and avoid claims you cannot support. Choose a layout that keeps important information easy to scan, then compare section order with the vacancy. Export a PDF and inspect page breaks and links. A readable format helps presentation but cannot guarantee how an employer or screening system evaluates an application.',
    example: 'A project coordinator can foreground measurable delivery results and reorder skills for a specific vacancy.',
    steps: ['Add contact details and a concise summary.', 'Enter roles, achievements, education, and skills.', 'Choose a layout and check section order.', 'Export and proofread the PDF against the vacancy.'],
    faqs: [
      ['Can I edit resume sections?', 'Use the controls to add and revise sections supported by the chosen layout.'],
      ['Can I tailor a version to one role?', 'Yes. Emphasize relevant experience and use accurate language from your background.'],
      ['Does an ATS layout guarantee selection?', 'No. Employers and screening systems use different criteria.'],
      ['Can I download a PDF?', 'Use the export action after checking the preview.'],
      ['What should I proofread?', 'Check dates, links, role names, spelling, and page breaks.'],
    ],
  },
};

export default function ToolPageSupplement({ tool }) {
  const details = SUPPLEMENTS[tool];
  if (!details) return null;

  return (
    <section className={`tool-page-supplement${tool === 'one-brain' ? ' ob-supplement' : ''}`} aria-labelledby={`${tool}-guide-title`}>
      <style>{`
        .tool-page-supplement:not(.ob-supplement) { width: min(680px, calc(100% - 32px)); margin: 3rem auto 4rem; color: var(--app-text); font-family: inherit; font-size: 16px; line-height: 1.7; }
        .tool-page-supplement:not(.ob-supplement) h2 { margin: 24px 0 12px; color: var(--app-text); font-size: 1.4rem; line-height: 1.3; }
        .tool-page-supplement:not(.ob-supplement) h3 { margin: 24px 0 12px; color: var(--app-text); font-size: 1.2rem; line-height: 1.35; }
        .tool-page-supplement:not(.ob-supplement) > p { margin: 0 0 16px; color: var(--app-text); font-size: 16px; line-height: 1.7; }
        .tool-page-supplement-example { margin: 20px 0 24px !important; padding: 14px 16px; border: 1px solid var(--app-surface-strong); border-left: 3px solid #00ffb2; border-radius: 12px; background: var(--app-surface); }
        .tool-page-supplement-steps { display: grid; gap: 10px; margin: 0; padding-left: 26px; color: var(--app-text); font-size: 16px; line-height: 1.7; }
        .tool-page-supplement-steps li { padding-left: 4px; }
        @media (max-width: 600px) { .tool-page-supplement:not(.ob-supplement) { width: calc(100% - 32px); margin: 2.5rem auto 3rem; } }
      `}</style>
      {details.heading && <h2 id={`${tool}-guide-title`}>{details.heading}</h2>}
      {details.copy && <p>{details.copy}</p>}
      {details.example && <p className="tool-page-supplement-example"><strong>Example:</strong> {details.example}</p>}
      {details.steps && <><h2 id={details.heading ? undefined : `${tool}-guide-title`}>How to use it</h2><ol className="tool-page-supplement-steps">{details.steps.map((step) => <li key={step}>{step}</li>)}</ol></>}
      {details.faqs && <section aria-labelledby={`${tool}-faq-title`}>
        <h3 id={`${tool}-faq-title`}>Frequently asked questions</h3>
        {details.faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: details.faqs.map(([name, text]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text } })),
        }) }} />
      </section>}
    </section>
  );
}
