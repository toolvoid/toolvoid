const SUPPLEMENTS = {
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
    example: 'A neighborhood bakery can combine sourdough and local-area terms for a workshop post instead of reusing a broad food list.',
    steps: ['Describe the post topic and intended audience.', 'Choose the platform and a matching category.', 'Generate suggestions and inspect reach groups.', 'Remove irrelevant tags before copying the selection.'],
    faqs: [
      ['How should I describe a post?', 'Name its subject and a useful detail such as location, format, or audience.'],
      ['Can one tag set suit every network?', 'Review suggestions for the selected platform because conventions and audiences differ.'],
      ['Do generated tags guarantee more reach?', 'No. Tags are discovery cues, not a promise of views or engagement.'],
      ['What should I check before copying?', 'Review meaning, spelling, current use, duplicates, and fit with the post.'],
      ['Should I reuse a hashtag list?', 'Keep only evergreen niche terms that remain relevant; refresh trend-oriented choices.'],
    ],
  },
  keyword: {
    example: 'A bicycle shop can compare winter tire-care phrases with local tune-up searches before outlining a service page.',
    steps: ['Enter a focused topic or seed phrase.', 'Choose audience, market, and content type.', 'Generate and group related search ideas.', 'Validate leading phrases against current search results.'],
  },
  imagegen: {
    example: 'A café owner can compare an overhead seasonal drink composition with a close-up before planning a campaign.',
    steps: ['Describe a subject, setting, and composition.', 'Choose a style and aspect ratio.', 'Generate a draft and inspect details.', 'Revise the prompt and review the final image.'],
    faqs: [
      ['What makes an image prompt useful?', 'Describe visible subjects, framing, setting, palette, and intended placement.'],
      ['Can an image contain inaccurate details?', 'Yes. Inspect text, faces, objects, and factual visuals before using it.'],
      ['How should I choose an aspect ratio?', 'Match the destination canvas, such as a portrait story or wide presentation.'],
      ['Can exact lettering be generated reliably?', 'Text can be unreliable; add precise labels in a design editor when needed.'],
      ['Is every generated draft ready to publish?', 'Review quality, usage requirements, and brand fit before publishing.'],
    ],
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
    example: 'A student can export one chart page as PNG for a slide without converting the rest of a report.',
    steps: ['Choose a PDF from your device.', 'Select page numbers or the entire document.', 'Set format, quality, and resolution.', 'Preview and download pages individually or as a bundle.'],
    faqs: [
      ['Can I export selected pages?', 'Use the page selection controls to render only the pages you need.'],
      ['Which image types can I choose?', 'Select a supported format listed in the converter, such as JPG, PNG, or WebP.'],
      ['Will small text remain readable?', 'That depends on resolution and source quality; inspect the export at its intended size.'],
      ['Can I download a multi-page result?', 'Use the provided bundled download option when you want several rendered pages.'],
      ['Does an image keep selectable PDF text?', 'No. Exporting a page as an image rasterizes its visual appearance.'],
    ],
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
    example: 'A car buyer can compare a shorter repayment term with a lower monthly payment over a longer term.',
    steps: ['Enter principal and annual interest rate.', 'Set the repayment period and frequency.', 'Review estimated payment and interest.', 'Change one assumption at a time to compare.'],
    faqs: [
      ['What values are needed?', 'Enter the principal, interest rate, and term requested by the calculator.'],
      ['Are all fees included?', 'Not necessarily; provider fees and policies may alter the schedule.'],
      ['Why does term length affect total interest?', 'The repayment duration changes how long interest is charged.'],
      ['Is this a loan offer?', 'No. It is a planning estimate, not lender approval or a quote.'],
      ['How should I compare scenarios?', 'Compare payment size, total repayment, rate terms, and applicable fees.'],
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
    example: 'A newsletter editor can shorten a preview blurb while leaving the full article intact.',
    steps: ['Paste or type the text to review.', 'Check word and character totals.', 'Review reading-time or keyword metrics shown.', 'Edit the draft and compare the revised counts.'],
    faqs: [
      ['What statistics are available?', 'The page shows the text measures exposed by its controls.'],
      ['Do all platforms count words identically?', 'No. Rules for spaces, punctuation, and special characters can differ.'],
      ['Is reading time exact?', 'It is an estimate based on text length and an assumed pace.'],
      ['Can I check assignment length?', 'Yes, then apply any exclusions or counting rules in the assignment.'],
      ['Does keyword density guarantee SEO results?', 'No. It describes text frequency, not search performance or usefulness.'],
    ],
  },
  json: {
    heading: 'Format a JSON payload and inspect parser feedback',
    copy: 'The formatter turns compact JSON into an indented structure that is easier to inspect, and can minify valid input when a compact representation is useful. Developers use it to review API responses, configuration files, sample payloads, and test fixtures. Validation feedback concerns syntax: a document can parse and still violate an application schema or business rule. Paste a representative payload, choose the operation, and inspect the reported position if parsing fails. After correction, test the result in the consuming application and remove credentials from examples before sharing them.',
    example: 'A developer can format a compact API response to inspect nested settings while tracing a configuration bug.',
    steps: ['Paste JSON text into the editor.', 'Choose format, validate, or minify.', 'Read the reported position if parsing fails.', 'Copy the result and test it in its application.'],
    faqs: [
      ['Can validation find invalid JSON?', 'It can report syntax issues but does not validate an application schema.'],
      ['How do format and minify differ?', 'Formatting adds readable whitespace; minification removes unnecessary whitespace.'],
      ['Why does an error include a position?', 'The location can help find malformed punctuation, quotes, or structure.'],
      ['Can valid JSON still break an app?', 'Yes. Syntax does not guarantee required fields or types.'],
      ['Should I paste credentials?', 'Avoid including secrets unless necessary and data handling is understood.'],
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
  video: {
    heading: 'Prepare a clip for a playback or upload requirement',
    copy: 'The converter prepares video for a target playback environment by changing supported formats or dimensions and, where offered, adjusting file size or trimming. It can help when a presentation, learning platform, or sharing service has a practical limit. Start from a copy, choose settings that meet the destination requirements, and compare picture and audio after conversion. Re-encoding can alter clarity, color, or synchronization; the smallest file is not automatically the best result. Browser resources and source codecs affect which files can be processed, so retain the original until the export is confirmed.',
    example: 'A team can resize a meeting excerpt for a presentation while retaining the source recording for its archive.',
    steps: ['Select a source and desired operation.', 'Choose a supported format and dimensions.', 'Adjust available compression or trim controls.', 'Preview playback and keep the source until verified.'],
    faqs: [
      ['Which formats can I convert?', 'Use formats displayed by the converter; codec support can also matter.'],
      ['Can I reduce the file size?', 'Use compression controls and compare the result with the original.'],
      ['Can I adjust the audio?', 'Audio operations depend on the controls offered on the page.'],
      ['Why might processing fail?', 'Unsupported codecs, large inputs, or browser memory limits can be factors.'],
      ['Should I delete the original?', 'Keep it until the converted file has been played and checked.'],
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
    <section aria-labelledby={`${tool}-guide-title`}>
      {details.heading && <h2 id={`${tool}-guide-title`}>{details.heading}</h2>}
      {details.copy && <p>{details.copy}</p>}
      {details.example && <p><strong>Example:</strong> {details.example}</p>}
      {details.steps && <><h3>How to use it</h3><ol>{details.steps.map((step) => <li key={step}>{step}</li>)}</ol></>}
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
