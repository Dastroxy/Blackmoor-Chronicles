import { RoleInfo, EvidenceItem, HintItem, CaseOverviewData } from '../types';

export const CASE_001_INFO: CaseOverviewData = {
  caseId: 'case-001',
  caseNumber: 'CASE 001',
  title: 'THE CHAPEL MURDER',
  subtitle: 'THE BLACKMOOR CHRONICLES',
  date: 'October 1896',
  location: 'St. Aurelius Chapel, Blackmoor Valley',
  status: 'ACTIVE',
  description: 
    'Lord Alistair Blackmoor, age 58, head of the old Blackmoor bloodline, is found dead inside the chapel after midnight. The chapel doors appeared secured. There is no obvious weapon, yet three bell strokes echoed across the valley.',
  initialScene: [
    'Chapel doors appear secured from within',
    'No obvious weapon found on or around the body',
    'Tallow candles still burning around the nave and chancel',
    'Victim discovered beside the eastern altar',
    'Three deep bell strikes heard across Blackmoor valley after midnight',
    'Weather rapidly deteriorating; dense fog and freezing rain',
    'The chapel interior is cold and drafty',
    'The belfry bell rope appears recently handled and moved'
  ],
  objectives: [
    'WHO committed the crime',
    'HOW the murder occurred',
    'WHY Alistair was killed (The true motive)',
    'WHEN the fatal event took place',
    'HOW THE SCENE WAS STAGED (and why the chapel appeared secured)'
  ],
  frameworkQuestions: [
    '1. WHEN DID ALISTAIR DIE?',
    '2. WHY DID HE GO TO THE CHAPEL?',
    '3. WHAT CAUSED HIS DEATH?',
    '4. WHAT HAPPENED TO THE BODY?',
    '5. WHY DID THE CHAPEL APPEAR SECURED?',
    '6. WHAT DID THE THREE BELL STROKES MEAN?',
    '7. WHY IS THE RELIQUARY IMPORTANT?',
    '8. WHY IS THE LEDGER IMPORTANT?',
    '9. WHAT DO THE PHYSICAL TRACES PROVE?',
    '10. WHO HAD MOTIVE, KNOWLEDGE, ACCESS, AND OPPORTUNITY?'
  ],
  suspectPool: [
    'ELIAS BLACKMOOR',
    'CLARA BLACKMOOR',
    'REVEREND MATTHIAS HALE',
    'DR. LUCIEN VOSS',
    'IRENA KEST',
    'JONAS ROOK'
  ]
};

export const INVESTIGATOR_ROLES: RoleInfo[] = [
  {
    id: 'sheriff',
    title: 'TOWN SHERIFF',
    subtitle: 'Official Authority & Chronology',
    focus: ['Chronology', 'Locations', 'Witnesses', 'Official Reports', 'Chapel Layout'],
    description: 'Holds the official town logs, reports of movements, parish registry records, and chapel architectural layout.',
    dossierCode: 'DOSSIER P-1 (SHERIFF)'
  },
  {
    id: 'investigator',
    title: 'PRIVATE INVESTIGATOR',
    subtitle: 'Undercover Inquiry & Motives',
    focus: ['Motives', 'Family Secrets', 'Inheritance', 'Blackmail', 'Correspondence', 'Hidden History'],
    description: 'Tracks confidential communications, financial ledgers, inheritance disputes, and clandestine town relationships.',
    dossierCode: 'DOSSIER P-2 (INVESTIGATOR)'
  },
  {
    id: 'mortician',
    title: 'MORTICIAN',
    subtitle: 'Anatomical & Toxicological Findings',
    focus: ['The Body', 'Injuries', 'Estimated Time of Death', 'Toxicology', 'Medical Findings'],
    description: 'Examines post-mortem temperature, livor mortis, bodily trauma, internal organ conditions, and physical pathologies.',
    dossierCode: 'DOSSIER P-3 (MORTICIAN)'
  },
  {
    id: 'forensics',
    title: 'FORENSICS EXPERT',
    subtitle: 'Trace Evidence & Scene Reconstruction',
    focus: ['Physical Traces', 'Fibers', 'Resin & Wax', 'Metal Scratches', 'Residues', 'Scene Reconstruction'],
    description: 'Analyzes particulate samples, microscopic scrapings, fiber composition, mineral dust, and tool marks on lock fittings.',
    dossierCode: 'DOSSIER P-4 (FORENSICS)'
  },
  {
    id: 'shaman',
    title: 'SHAMAN',
    subtitle: 'Lore, Antiquities & Old Records',
    focus: ['Folklore', 'Symbols', 'Chapel Traditions', 'Old Blackmoor Records', 'Supernatural Claims vs Reality'],
    description: 'Interprets ancient bloodline pacts, ritual symbolism, parish archives, and distinguishes folklore from mundane reality.',
    dossierCode: 'DOSSIER P-5 (SHAMAN)'
  }
];

export const EVIDENCE_CATALOG: EvidenceItem[] = [
  // Physical Artifacts E-001 to E-018
  {
    id: 'E-001',
    code: 'E-001',
    name: 'ALTAR SCENE',
    category: 'artifact',
    shortDesc: 'Arrangement of objects and position of the deceased beside the eastern stone altar.',
    catalogNotes: 'The body lay supine near the step. Four tallow candles remained burning in iron sconces. No defensive disturbance to the altar cloth.',
    relevantRoles: ['sheriff', 'forensics', 'mortician'],
    physicalDossierPrompt: 'Cross-reference with Mortician post-mortem diagram and Forensics layout sheet.'
  },
  {
    id: 'E-002',
    code: 'E-002',
    name: 'BELL ROPE',
    category: 'artifact',
    shortDesc: 'Braided hemp rope descending from the chapel belfry aperture.',
    catalogNotes: 'Tension shows recent downward pull. Microscopic examination indicates fibers disturbed within the past several hours.',
    relevantRoles: ['forensics', 'sheriff'],
    physicalDossierPrompt: 'Compare bell pull height with witness reports of the midnight bell.'
  },
  {
    id: 'E-003',
    code: 'E-003',
    name: 'METAL FITTING',
    category: 'artifact',
    shortDesc: 'Wrought-iron latch fixture recovered near the vestry aperture.',
    catalogNotes: 'Fine parallel scratches visible along the tongue plate, inconsistent with customary key operation.',
    relevantRoles: ['forensics'],
    physicalDossierPrompt: 'Examine Forensics Report: Toolmarks & Hardware.'
  },
  {
    id: 'E-004',
    code: 'E-004',
    name: 'UNUSUAL WAX',
    category: 'artifact',
    shortDesc: 'Hardened droplet of aromatic wax collected from the flagstones.',
    catalogNotes: 'Composition differs chemically from standard tallow parish candles. Contains beeswax and an aromatic resinous additive.',
    relevantRoles: ['forensics', 'shaman'],
    physicalDossierPrompt: 'Check Shaman ancient altar offerings record vs Forensics chemical breakdown.'
  },
  {
    id: 'E-005',
    code: 'E-005',
    name: 'DARK FIBER',
    category: 'artifact',
    shortDesc: 'Dyed woolen strand caught on the eastern altar corner molding.',
    catalogNotes: 'Heavy, dark-dyed wool with a tight weave. Not matching the victim’s linen shirt or velvet waistcoat.',
    relevantRoles: ['forensics', 'sheriff'],
    physicalDossierPrompt: 'Compare fiber characteristics with outerwear noted in Sheriff witness records.'
  },
  {
    id: 'E-006',
    code: 'E-006',
    name: 'MINERAL GRIT',
    category: 'artifact',
    shortDesc: 'Crushed grey particulate collected near the chancel doorway.',
    catalogNotes: 'Silicate particulate with lime mortar traces, characteristic of valley quarry roadbed and construction masonry.',
    relevantRoles: ['forensics', 'sheriff'],
    physicalDossierPrompt: 'Check footwear records and route geography in Sheriff dossier.'
  },
  {
    id: 'E-007',
    code: 'E-007',
    name: 'POCKET WATCH',
    category: 'artifact',
    shortDesc: 'Gold-plated pocket watch recovered from victim’s waistcoat pocket.',
    catalogNotes: 'The hands are stopped at 02:14. Crystal glass shows a singular internal stress crack. Spring mechanism under examination.',
    relevantRoles: ['mortician', 'forensics', 'sheriff'],
    physicalDossierPrompt: 'Crucial: Compare stopped watch time with Mortician’s biological window of death.'
  },
  {
    id: 'E-008',
    code: 'E-008',
    name: 'MISSING CANE',
    category: 'artifact',
    shortDesc: 'Lord Alistair’s customary ebony walking cane with silver crest.',
    catalogNotes: 'Noted as missing from the scene, though documented as carried by Alistair upon leaving Blackmoor Manor.',
    relevantRoles: ['sheriff', 'investigator'],
    physicalDossierPrompt: 'See Sheriff Manor departure logs and Investigator personal effects list.'
  },
  {
    id: 'E-009',
    code: 'E-009',
    name: 'SILVER SIGNET',
    category: 'artifact',
    shortDesc: 'Family signet ring worn on Alistair’s left ring finger.',
    catalogNotes: 'Intact, showing the Blackmoor family raven crest. No attempts made to pry it off; theft was not the objective.',
    relevantRoles: ['mortician', 'investigator'],
    physicalDossierPrompt: 'Check Investigator Blackmoor heirloom records.'
  },
  {
    id: 'E-010',
    code: 'E-010',
    name: 'CHAPEL KEY',
    category: 'artifact',
    shortDesc: 'Heavy brass key recovered from the interior lock turncock.',
    catalogNotes: 'Found turned in the deadbolt lock on the interior face of the oak door. No spare listed in standard parish log.',
    relevantRoles: ['sheriff', 'forensics'],
    physicalDossierPrompt: 'Analyze key placement against the locked-door puzzle in your dossier.'
  },
  {
    id: 'E-011',
    code: 'E-011',
    name: 'OUTER CLOAK',
    category: 'artifact',
    shortDesc: 'Heavy wool travelling mantle discarded on a rear bench.',
    catalogNotes: 'Damp along the hemline. Smells faintly of woodsmoke and damp earth. Pockets contain no identifying papers.',
    relevantRoles: ['sheriff', 'forensics'],
    physicalDossierPrompt: 'Verify cloak ownership in Sheriff witness interviews.'
  },
  {
    id: 'E-012',
    code: 'E-012',
    name: 'WRIST MARK',
    category: 'artifact',
    shortDesc: 'Symmetric circumferential bruising noted on Alistair’s forearms.',
    catalogNotes: 'Subcutaneous contusions indicating forcible restraint or compression prior to cessation of circulation.',
    relevantRoles: ['mortician'],
    physicalDossierPrompt: 'See Mortician autopsy notes on grip diameter and livor mortis state.'
  },
  {
    id: 'E-013',
    code: 'E-013',
    name: 'METALLIC TRACE',
    category: 'artifact',
    shortDesc: 'Microscopic silver-nickel flecks recovered from floor stones.',
    catalogNotes: 'Spectrographic analysis indicates plating wear from a mechanical clasp or tipped instrument.',
    relevantRoles: ['forensics'],
    physicalDossierPrompt: 'Cross-reference with Forensics metallic particle index.'
  },
  {
    id: 'E-014',
    code: 'E-014',
    name: 'METALLIC COLLAR RESIDUE',
    category: 'artifact',
    shortDesc: 'Residue swabbed from the victim’s stiff collar edge.',
    catalogNotes: 'Fine particulate blend of metal shavings and an oil-soluble solvent.',
    relevantRoles: ['forensics', 'mortician'],
    physicalDossierPrompt: 'Cross-reference with Mortician cervical neck exam.'
  },
  {
    id: 'E-015',
    code: 'E-015',
    name: 'RELIQUARY',
    category: 'artifact',
    shortDesc: 'Carved stone coffer recessed into the eastern sanctuary wall.',
    catalogNotes: 'The iron band seal shows evidence of recent inspection. Its heavy lid sits slightly askew.',
    relevantRoles: ['shaman', 'forensics', 'investigator'],
    physicalDossierPrompt: 'Review Shaman lore regarding St. Aurelius relics vs Investigator records.'
  },
  {
    id: 'E-016',
    code: 'E-016',
    name: 'CLOSURE MARK',
    category: 'artifact',
    shortDesc: 'Fresh scoring mark on the inner sanctuary wooden doorframe.',
    catalogNotes: 'Compression depression with trace oils, indicating something was wedged or retracted as the portal closed.',
    relevantRoles: ['forensics'],
    physicalDossierPrompt: 'Examine Forensics Diagram: Mechanical Points of Entry.'
  },
  {
    id: 'E-017',
    code: 'E-017',
    name: 'BELL-STAIR RESIDUE',
    category: 'artifact',
    shortDesc: 'Dust and dark organic matter swabbed from spiral stone belfry steps.',
    catalogNotes: 'Distinct from the substance found by the altar. Composed of dried soot, coal dust, and weathered leather oil.',
    relevantRoles: ['forensics', 'sheriff'],
    physicalDossierPrompt: 'Essential clue: Does this match who ascended to the bell tower?'
  },
  {
    id: 'E-018',
    code: 'E-018',
    name: 'ALTAR RESIN',
    category: 'artifact',
    shortDesc: 'Tacky amber residue found on the edge of the altar stone.',
    catalogNotes: 'Natural coniferous rosin used in musical instrument maintenance and fine cabinetry joinery.',
    relevantRoles: ['forensics', 'investigator'],
    physicalDossierPrompt: 'Cross-reference suspect occupations and hobbies in Investigator dossier.'
  },

  // Documents D-001 to D-008
  {
    id: 'D-001',
    code: 'D-001',
    name: 'BLACKMOOR HOUSE INVENTORY',
    category: 'document',
    shortDesc: 'List of valuables and estate keys cataloged on October 1st, 1896.',
    catalogNotes: 'Documents estate keys, heirloom items, and missing estate property ledger.',
    relevantRoles: ['investigator', 'sheriff'],
    physicalDossierPrompt: 'Check Investigator dossier for noted missing items.'
  },
  {
    id: 'D-002',
    code: 'D-002',
    name: 'PARISH NOTE',
    category: 'document',
    shortDesc: 'Handwritten memorandum found in the chapel vestry desk.',
    catalogNotes: 'Concerns evening service schedules, candle replenishment, and complaints about drafty locks.',
    relevantRoles: ['sheriff', 'shaman'],
    physicalDossierPrompt: 'Read Parish archives in Sheriff dossier.'
  },
  {
    id: 'D-003',
    code: 'D-003',
    name: 'BLACKMAIL FRAGMENT',
    category: 'document',
    shortDesc: 'Charred slip of stationery recovered from a tavern hearth.',
    catalogNotes: 'Partial sentence referencing: "...the true bloodline will be revealed unless twenty thousand pounds..."',
    relevantRoles: ['investigator'],
    physicalDossierPrompt: 'See Investigator dossier for handwriting comparison.'
  },
  {
    id: 'D-004',
    code: 'D-004',
    name: 'LODGING REGISTER',
    category: 'document',
    shortDesc: 'Guestbook from the Blackmoor Valley Arms Inn for the week of October 8th.',
    catalogNotes: 'Records arrival of outsiders, room numbers, checkout times, and carriage hires.',
    relevantRoles: ['sheriff', 'investigator'],
    physicalDossierPrompt: 'Cross-reference suspect alibis in Sheriff Dossier.'
  },
  {
    id: 'D-005',
    code: 'D-005',
    name: 'ESTATE LEDGER ENTRY',
    category: 'document',
    shortDesc: 'Page torn from the confidential Blackmoor family financial book.',
    catalogNotes: 'Shows repeated clandestine payments to initials "J.R." and substantial mining deed mortgages.',
    relevantRoles: ['investigator'],
    physicalDossierPrompt: 'Examine Investigator Financial Ledger Exhibit.'
  },
  {
    id: 'D-006',
    code: 'D-006',
    name: 'SOLICITOR MEMO',
    category: 'document',
    shortDesc: 'Legal correspondence from Lord Alistair’s London attorney.',
    catalogNotes: 'Advising Alistair regarding codicil changes to his will scheduled to be signed the following Monday.',
    relevantRoles: ['investigator'],
    physicalDossierPrompt: 'Check Investigator inheritance papers.'
  },
  {
    id: 'D-007',
    code: 'D-007',
    name: 'PHYSICIAN NOTE',
    category: 'document',
    shortDesc: 'Dr. Voss’s private medical casebook entry regarding Lord Alistair.',
    catalogNotes: 'Records recurrent chest angina, laudanum prescriptions, and recent neurological trembles.',
    relevantRoles: ['mortician', 'investigator'],
    physicalDossierPrompt: 'Compare with Mortician toxicology findings.'
  },
  {
    id: 'D-008',
    code: 'D-008',
    name: 'PARISH INVENTORY NOTE',
    category: 'document',
    shortDesc: 'Historic ecclesiastical catalog of St. Aurelius sacramental items.',
    catalogNotes: 'Notes silver communion vessels, reliquary locks, and warden bell keys.',
    relevantRoles: ['shaman', 'sheriff'],
    physicalDossierPrompt: 'Cross-reference with Shaman sacred vessel records.'
  },

  // Timing/History W-001 to W-004
  {
    id: 'W-001',
    code: 'W-001',
    name: 'DISCOVERY',
    category: 'chronology',
    shortDesc: 'Official record of the discovery of the deceased.',
    catalogNotes: 'Discovered at 06:15 AM by the sexton. Chapel main door locked from inside, requiring window latch force.',
    relevantRoles: ['sheriff'],
    physicalDossierPrompt: 'Consult Sheriff Scene Discovery Narrative.'
  },
  {
    id: 'W-002',
    code: 'W-002',
    name: 'BELL REPORT',
    category: 'chronology',
    shortDesc: 'Witness statements regarding the chapel bell after midnight.',
    catalogNotes: 'Three heavy tolls heard throughout the valley at approximately 02:17 AM. Surprised townsfolk due to hour.',
    relevantRoles: ['sheriff', 'shaman'],
    physicalDossierPrompt: 'Compare Sheriff timeline vs Shaman ritual bell meanings.'
  },
  {
    id: 'W-003',
    code: 'W-003',
    name: 'WEATHER',
    category: 'chronology',
    shortDesc: 'Meteorological observations recorded at the Blackmoor station.',
    catalogNotes: 'Heavy fog descended at 22:00. Freezing rain began 01:10 and ended 03:40. Ground was muddy and slick.',
    relevantRoles: ['sheriff', 'forensics'],
    physicalDossierPrompt: 'Check Forensics footwear mud saturation levels.'
  },
  {
    id: 'W-004',
    code: 'W-004',
    name: 'TIME OF DEATH',
    category: 'chronology',
    shortDesc: 'Mortician’s scientific evaluation of post-mortem changes.',
    catalogNotes: 'Based on rigor mortis progression and body cooling curve, death estimated between 23:30 and 01:30.',
    relevantRoles: ['mortician'],
    physicalDossierPrompt: 'Vital discrepancy: Compare estimated death time (23:30–01:30) with the 02:17 bell.'
  },

  // Lore L-001 to L-004
  {
    id: 'L-001',
    code: 'L-001',
    name: '1681 ACCOUNT',
    category: 'lore',
    shortDesc: 'Centuries-old manuscript chronicling the Blackmoor pact.',
    catalogNotes: 'Tells of Sir Guy Blackmoor’s covenant with the valley guardians and the sanctification of the eastern altar.',
    relevantRoles: ['shaman'],
    physicalDossierPrompt: 'Read Shaman Ancient Covenant Folio.'
  },
  {
    id: 'L-002',
    code: 'L-002',
    name: 'KEEPER RECORD',
    category: 'lore',
    shortDesc: 'Parish chronicle detailing chapel traditions and the keeper’s office.',
    catalogNotes: 'Records that three bell strikes historically signaled the Keeper had fulfilled his sacred duty.',
    relevantRoles: ['shaman'],
    physicalDossierPrompt: 'See Shaman Ritual Protocol Dossier.'
  },
  {
    id: 'L-003',
    code: 'L-003',
    name: 'WARDEN\'S MARK',
    category: 'lore',
    shortDesc: 'Secret stonemason insignia etched near the reliquary niche.',
    catalogNotes: 'An interlocking knot symbol, used by the ancient builders to signify a hidden counter-weight release.',
    relevantRoles: ['shaman', 'forensics'],
    physicalDossierPrompt: 'Cross-reference Shaman glyph glossary.'
  },
  {
    id: 'L-004',
    code: 'L-004',
    name: 'AGREEMENT FRAGMENT',
    category: 'lore',
    shortDesc: 'Old parchment scrap preserved in Blackmoor family strongbox.',
    catalogNotes: 'Noted that: "The true reckoning resides not in iron or stone, but within the ledger of blood."',
    relevantRoles: ['shaman', 'investigator'],
    physicalDossierPrompt: 'Compare Shaman text with Investigator ledger revelations.'
  }
];

export const HINTS_DATA: HintItem[] = [
  {
    level: 1,
    label: 'HINT LEVEL 1',
    text: 'Start with the timeline.\n\nThe stopped watch and the bell are tempting timestamps.\n\nDo not accept either without corroboration.',
    audioKey: 'hint1'
  },
  {
    level: 2,
    label: 'HINT LEVEL 2',
    text: 'Compare the eastern altar traces with the material recovered around the bell stair.\n\nSimilar-looking material does not necessarily have the same origin.',
    audioKey: 'hint2'
  },
  {
    level: 3,
    label: 'HINT LEVEL 3',
    text: 'The locked-chapel problem and the motive problem are connected, but they are not the same question.\n\nSolve the physical scene first.\n\nThen ask who benefits from the staging.',
    audioKey: 'hint3'
  }
];

export const OPENING_VOICEOVER_TEXT = [
  "Blackmoor. October, 1896.",
  "At the edge of the valley stands St. Aurelius Chapel, an old stone building tied to the Blackmoor family for generations.",
  "Shortly after midnight, Lord Alistair Blackmoor was found dead inside.",
  "The chapel appeared secured.",
  "There was no obvious weapon.",
  "The candles were still burning.",
  "And three bell strokes were heard after midnight.",
  "You have been assembled because no single investigator has enough information to reconstruct what happened.",
  "There are five of you.",
  "The Sheriff has the chronology.",
  "The Private Investigator has the secrets.",
  "The Mortician has the body.",
  "The Forensics Expert has the physical traces.",
  "And the Shaman has the old records, symbols, and traditions surrounding the chapel.",
  "None of you has the whole story.",
  "Your task is not to find the person with the strongest motive.",
  "Your task is to reconstruct the night.",
  "When you believe you know what happened, the archive will ask you to commit your theory.",
  "Only then will the final record be opened.",
  "Begin."
];
