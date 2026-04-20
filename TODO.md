# Playwright Structure Fix TODO

## Plan Steps:
- [x] 1. Create src/, src/pages/, src/utils/ directories
- [x] 2. Move pages/* → src/pages/* and utils/* → src/utils/*, remove old empty dirs
- [x] 3. Update imports in tests/project.js (utils → src/utils, pages/project → src/pages/project)
- [x] 4. Update imports in tests/organization.js (utils → src/utils, pages/organization → src/pages/organization)
- [x] 5. Update imports in tests/login.js (utils → src/utils, pages/userlogin → src/pages/userlogin)
- [x] 6. Update imports in tests/assessments.js (utils → src/utils, pages/project → src/pages/project, pages/instructors → src/pages/instructors)
- [x] 7. Clean playwright.config.js (remove conflicting module.exports block)
- [ ] 8. Verify: Run `npx playwright test`
- [ ] 9. Update .github/workflows if needed

All code changes complete. Run step 8 to verify.

