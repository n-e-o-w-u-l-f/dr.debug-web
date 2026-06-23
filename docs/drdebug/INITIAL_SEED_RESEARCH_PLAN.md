# Initial Seed Research Plan for Dr.Debug Web and Memory

Status: PROPOSAL_ONLY
Purpose: Build a broad, evidence-based seed map for electronic devices, manufacturers, manuals, firmware, drivers, platforms, games, endpoints and relations.

## Required principle

Do not add canonical records directly from this plan. Every item starts as proposal-only until source review, dedupe, redaction and validation are complete.

## Initial research steps

1. Define canonical artifact classes: devices, manufacturers, manuals, firmware, drivers, BIOS, bootloaders, consoles, games, platforms, accessories, source records and relations.
2. Define endpoint taxonomy for electronics: computing, mobile, gaming, networking, imaging, audio, storage, power, industrial, automotive and miscellaneous.
3. Create manufacturer discovery queue from official vendor support portals.
4. Create device-family discovery queue from official product support categories.
5. Create manual discovery queue from official manuals/download pages.
6. Create firmware discovery queue from official firmware/download pages.
7. Create driver discovery queue from official driver/download pages.
8. Create BIOS/UEFI discovery queue from official support pages.
9. Create service-manual candidate queue, separated from user manuals.
10. Create quick-start-guide queue, separated from full manuals.
11. Create safety-document queue for battery, mains, charger and high-voltage devices.
12. Create chipset/vendor queue for Intel, AMD, Qualcomm, MediaTek, Broadcom, Realtek and similar vendors.
13. Create board identifier queue for DMI, PCI, USB, ACPI, modalias and fwupd identifiers.
14. Create hardware ID normalization rules for USB VID/PID.
15. Create hardware ID normalization rules for PCI vendor/device IDs.
16. Create firmware GUID normalization rules for fwupd-style metadata.
17. Create device model normalization rules for region suffixes and hardware revisions.
18. Create manufacturer alias normalization for old names, acquisitions, sub-brands and OEM labels.
19. Create region normalization: global, US, EU, UK, DE, JP, CN, KR and other known release regions.
20. Create language normalization: de, en, fr, es, it, nl, pl, ja, ko, zh and multilingual.
21. Create console platform taxonomy: Nintendo, Sony, Microsoft, Sega, Atari, NEC, SNK and others.
22. Create computer platform taxonomy: PC, Mac, Amiga, Atari ST, Commodore, MSX, ZX Spectrum and others.
23. Create mobile platform taxonomy: Android, iOS/iPadOS, KaiOS, legacy Symbian, Windows Mobile and feature-phone families.
24. Create printer/scanner taxonomy by manufacturer and protocol.
25. Create networking taxonomy: routers, modems, switches, APs, NAS, firewalls and IoT hubs.
26. Create storage taxonomy: HDD, SSD, USB storage, memory cards, optical drives and controllers.
27. Create power taxonomy: PSUs, chargers, UPS, batteries and battery management devices.
28. Create display taxonomy: monitors, TVs, panels, projectors and VR/AR displays.
29. Create camera taxonomy: DSLR, mirrorless, compact, camcorder, webcam, security camera and action camera.
30. Create audio taxonomy: sound cards, DACs, mixers, headphones, speakers, receivers and synthesizers.
31. Create game relation schema: game title, platform, region, version, publisher, developer, release type and media type.
32. Create cross-platform game relation queue for titles released on multiple consoles or computers.
33. Create version relation queue for games with regional, revision, remaster, collection or edition differences.
34. Create accessory compatibility relation schema.
35. Create manual-to-device relation schema.
36. Create firmware-to-device-revision relation schema.
37. Create driver-to-OS relation schema.
38. Create manufacturer-to-brand relation schema.
39. Create OEM-to-retail-label relation schema.
40. Create source-record schema for official vendor pages.
41. Create source-record schema for standards and registries.
42. Create source-record schema for repositories and issue trackers.
43. Create source-record schema for manuals and documentation.
44. Create source-record schema for firmware and high-risk binaries.
45. Create source-record schema for archived/discontinued material.
46. Create conflict-record schema for contradictory sources.
47. Create dedupe workflow for exact names.
48. Create dedupe workflow for normalized names.
49. Create dedupe workflow for aliases.
50. Create dedupe workflow for model numbers.
51. Create dedupe workflow for source URLs.
52. Create dedupe workflow for checksums.
53. Create orphan-candidate detection for branches without canonical path or relation.
54. Create README/matrix counter proposal for every artifact class.
55. Create endpoint branch plan for at least 100 manufacturer candidates.
56. Create endpoint branch plan for at least 100 device-family candidates.
57. Create endpoint branch plan for at least 100 manual candidates.
58. Create endpoint branch plan for at least 100 firmware/driver candidates.
59. Create endpoint branch plan for at least 100 relation candidates.
60. Create endpoint branch plan for at least 100 game/platform relation candidates.
61. Create endpoint branch plan for at least 100 source-record candidates.
62. Create review batches by source strength: official first, registry second, repositories third, community last.
63. Create safety tags for firmware, mains power, battery, medical, vehicle, radio and production systems.
64. Create evidence-level mapping from raw input to reviewed canonical status.
65. Create validation script requirements for Jekyll data generation.
66. Create validation script requirements for Markdown links.
67. Create validation script requirements for JSON schema checks.
68. Create validation script requirements for orphan detection.
69. Create validation script requirements for manual source records.
70. Create rollback procedure for seed branch generation.
71. Create changelog entry template for any applied seed batch.
72. Create review queue for human approval before canonical promotion.
73. Create publishing boundary: public summaries yes, raw private logs no, unreviewed binaries no.
74. Create update cadence for stale source records.
75. Create final import plan from proposal-only web seed to reviewed memory candidates.

## Seed batch target

Initial target:

- 100 manufacturer proposal endpoints
- 100 device-family proposal endpoints
- 100 manual source-record proposal endpoints
- 100 firmware/driver source-record proposal endpoints
- 100 relation proposal endpoints
- 100 game/platform/version relation proposal endpoints
- 100 source-record proposal endpoints
- 100 orphan-candidate placeholders for later dedupe
- 100 validation/checklist artifacts
- 100 alias/OEM/sub-brand candidates

All counts are planning targets, not canonical knowledge claims.
