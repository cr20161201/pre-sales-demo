# Requirement Ledger

| ID | Requirement | Status | Evidence |
|---|---|---|---|
| VB-01 | Keep the comparison tool independent from sweater | implemented | All changes are scoped to `vton-benchmark` |
| VB-02 | Compare Xmax and Decart with equivalent inputs | verified | Same fixed video and garment A verified; A-to-B waits for `garment-b.jpg` |
| VB-03 | Repair the Decart realtime browser integration | verified | Worker HTTP 200; Decart produced 1088x624 video |
| VB-04 | Store each test run independently | verified | Validation evidence saved under a unique run ID |
| VB-05 | Store readable result documents separately | verified | Report smoke test generated outside the raw run directory |
| VB-06 | Preserve Decart diagnostics outside the formal flow | confirmed | Diagnostic pages remain developer-only |
| VB-07 | Verify build and both provider paths | verified | Build passed; Xmax 1280x736 and Decart 1088x624 outputs observed |
| VB-08 | Compare garment A-to-B-to-A switching | verified | One-second evidence sequence and manual visual confirmation saved in run `aba-switch-2026-08-17` |
| VB-09 | Measure rendered FPS and frame stalls with one browser-side method | verified | `requestVideoFrameCallback` metrics saved in all low-cost runs |
| VB-10 | Compare Xmax x2.0 with Decart Lucy VTON 3.5 | verified | `reports/lowcost-vton35-comparison/summary.md` |
| VB-11 | Measure both providers across repeated equivalent runs | verified | Xmax n=3 and Decart n=3, with per-run values and ranges disclosed in the report |
