# Test Execution Guide

Complete guide for running tests in various scenarios and interpreting results.

## Quick Command Reference

### Most Common Commands

```bash
# Open interactive test runner
npm run test:open

# Run all tests
npm run test

# Run specific test suite
npm run test:login-failure
npm run test:login-success
npm run test:product-nav
npm run test:cart
npm run test:advanced

# Run in different browser
npm run test:chrome
npm run test:firefox
npm run test:edge

# Debug mode
npm run test:debug
```

---

## Running Tests - Detailed Guide

### 1. Interactive Testing (Recommended for Development)

**Command:**
```bash
npm run test:open
```

**What it does:**
- Opens Cypress Test Runner GUI
- Shows file browser on left
- Real-time test execution in center
- Command log on right

**How to use:**
1. Click any test file in the file browser
2. Cypress launches test in browser
3. Watch test execution step-by-step
4. Hover over commands to see elements highlighted
5. Inspect DOM using DevTools

**Best for:**
- Developing new tests
- Debugging failures
- Learning Cypress
- Quick feedback loop

---

### 2. Headless Testing (For CI/CD)

**Command:**
```bash
npm run test
```

**What it does:**
- Runs all tests without browser UI
- Outputs results in terminal
- Faster than headed mode
- Returns exit code (0 = pass, 1 = fail)

**Output includes:**
```
============================= Test Results =============================
  Login Failure Scenarios
    ✓ Should display error when logging with invalid username
    ✓ Should display error when logging with invalid password
    ...
    Passing: 10
    Failing: 0
    Duration: 45.2s
========================================================================
```

**Best for:**
- CI/CD pipelines
- Automated testing
- Quick batch runs
- Production validation

---

### 3. Single Test Suite Execution

**Commands:**
```bash
npm run test:login-failure    # Login failure tests
npm run test:login-success    # Login success tests
npm run test:product-nav      # Product navigation tests
npm run test:cart             # Cart and checkout tests
npm run test:advanced         # Advanced scenarios
```

**Use case:** Test specific functionality during development

**Example:**
```bash
# Only test login scenarios
npm run test:login-failure
npm run test:login-success
```

---

### 4. Browser-Specific Testing

**Supported Browsers:**
```bash
npm run test:chrome    # Google Chrome (default)
npm run test:firefox   # Mozilla Firefox
npm run test:edge      # Microsoft Edge
```

**Why test multiple browsers:**
- Verify cross-browser compatibility
- Catch browser-specific issues
- Ensure consistent behavior

**Example - Test in Firefox:**
```bash
npm run test:firefox
```

---

### 5. Debug Mode

**Command:**
```bash
npm run test:debug
```

**Features:**
- Runs in headed (visible) mode
- Does not exit after completion
- Allows manual inspection
- Browser DevTools available

**Use for:**
- Inspecting elements
- Checking network requests
- Understanding test flow
- Analyzing failures

**Debugging steps:**
1. Run `npm run test:debug`
2. Test executes in visible browser
3. DevTools opens automatically
4. Inspect elements in Elements tab
5. Check network requests in Network tab
6. Review console for errors

---

## Running Specific Tests

### Run Single Spec File
```bash
npx cypress run --spec "cypress/e2e/loginFailure.cy.js"
```

### Run Single Test Case
```bash
npx cypress run --spec "cypress/e2e/loginFailure.cy.js" -t "Should display error when logging in with invalid username"
```

### Run Tests Matching Pattern
```bash
npx cypress run --spec "cypress/e2e/spec*.cy.js"
```

---

## Test Output Interpretation

### Successful Test Output

```
  ✓ Should login successfully (2.5s)
  ✓ Should display all products (1.8s)
  ✓ Should add to cart (1.3s)

  3 passing (5.6s)
```

**Indicators of success:**
- ✓ checkmark next to each test
- Duration shown for each test
- "passing" count at bottom
- Exit code: 0

### Failed Test Output

```
  ✓ Should login successfully (2.5s)
  ✗ Should display all products (3.2s)
    Error: expected element to be visible
    
  ✓ Should add to cart (1.3s)

  2 passing (5.8s)
  1 failing
```

**What to look for:**
- ✗ mark next to failed test
- Error message explains what failed
- Stack trace shows where error occurred
- Exit code: 1

### Performance Metrics

```
Spec                          Tests  Passing  Failing  Duration
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
cypress/e2e/loginFailure.cy   10     10       0        24.5s
cypress/e2e/spec.cy.js        12     12       0        31.2s
cypress/e2e/spec-copy-1.cy    15     15       0        42.8s
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total: 37/37 passing                                  98.5s
```

---

## Debugging Failed Tests

### Step 1: Identify the Failure

Look at error message:
```
CypressError: Timed out retrying after 10000ms: expected <button> 
to be 'visible'
```

This tells you:
- Type: Timeout error
- What failed: Button not visible
- Timeout: 10 seconds

### Step 2: Check the Element

```javascript
// Add temporary debug command
cy.get('[data-test="add-to-cart"]').debug();
cy.get('[data-test="add-to-cart"]').should('be.visible');
```

### Step 3: Review in Test Runner

1. Open `npm run test:open`
2. Run the failing test
3. Hover over commands to see highlighted elements
4. Use DevTools to inspect elements
5. Check if element exists and is visible

### Step 4: Common Causes

| Error | Cause | Solution |
|-------|-------|----------|
| "Element not found" | Wrong selector | Verify selector in DevTools |
| "Timeout" | Element not visible | Add explicit wait |
| "Click failed" | Element covered | Wait for overlay to close |
| "Type failed" | Input not focused | Click input first |
| "URL mismatch" | Navigation failed | Check for redirects |

### Step 5: Fix and Verify

1. Fix the issue in page class or test
2. Run test again with `npm run test:open`
3. Verify fix works

---

## Continuous Integration

### GitHub Actions Example

```yaml
name: Cypress Tests

on: [push, pull_request]

jobs:
  cypress-run:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: cypress-io/github-action@v5
        with:
          start: npm start
          spec: cypress/e2e/**/*.cy.js
```

### Running in CI

```bash
# Cypress automatically runs in headless mode
npm test
```

---

## Test Reporting

### HTML Report

Cypress generates HTML reports:
```bash
npx cypress run --reporter html
```

Reports saved in: `cypress/results/`

### JSON Report

```bash
npx cypress run --reporter json > results.json
```

### Merge Multiple Reports

```bash
npx cypress run --reporter json --reporter-options reportDir=cypress/results
```

---

## Performance Optimization

### Run Tests in Parallel (Cloud Only)

```bash
# Requires Cypress Cloud subscription
cypress run --parallel --record
```

### Optimize Test Order

- Faster tests first
- Group related tests
- Independent tests in parallel

### Reduce Test Time

- Use `cy.intercept()` to mock slow requests
- Combine related assertions
- Avoid unnecessary navigations

---

## Environment-Specific Testing

### Test Against Different Environments

**Development:**
```bash
# Update cypress.config.js baseUrl
# baseUrl: "http://localhost:3000"
npm run test
```

**Staging:**
```bash
# baseUrl: "https://staging.example.com"
npm run test
```

**Production:**
```bash
# baseUrl: "https://www.example.com"
npm run test
```

---

## Troubleshooting

### "Chrome not found"
```bash
# Install Cypress with browser
npm install -g cypress
npx cypress install
```

### "Permission denied"
```bash
# On Linux/Mac
chmod +x node_modules/.bin/cypress
```

### "Port already in use"
```bash
# Kill process using port
# On Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### "Tests timeout inconsistently"
```bash
# Increase timeout in cypress.config.js
defaultCommandTimeout: 15000  // 15 seconds
```

### "Cannot find element"
```bash
# Verify selector is correct
cy.get('[data-test="button"]').should('exist');

# Add debugging
cy.get('[data-test="button"]').debug();
```

---

## Best Practices for Test Execution

### 1. Run Tests Regularly
- Before committing code
- In CI/CD pipeline
- Before releases
- On schedule (nightly)

### 2. Monitor Test Health
- Track flaky tests
- Monitor execution time
- Review failure patterns
- Update tests as app changes

### 3. Use Test Reports
- Share results with team
- Track trends over time
- Identify slow tests
- Document issues

### 4. Maintain Test Data
- Keep test accounts active
- Monitor data consistency
- Update selectors as needed
- Archive old tests

### 5. Document Failures
- Note failure causes
- Link to bug reports
- Update documentation
- Prevent future issues

---

## Test Execution Checklist

Before running tests:
- [ ] Dependencies installed (`npm install`)
- [ ] Cypress version correct (`npx cypress --version`)
- [ ] Application is accessible
- [ ] Test data is available
- [ ] No conflicting processes running
- [ ] Browser drivers updated

During test execution:
- [ ] Monitor for failures
- [ ] Check for warnings
- [ ] Verify all tests run
- [ ] Monitor execution time

After test execution:
- [ ] Review results
- [ ] Investigate failures
- [ ] Update documentation
- [ ] Plan improvements

---

## Quick Reference - npm Scripts

| Command | Purpose |
|---------|---------|
| `npm run test:open` | Open interactive test runner |
| `npm run test` | Run all tests headless |
| `npm run test:headless` | Explicit headless mode |
| `npm run test:chrome` | Run in Chrome browser |
| `npm run test:firefox` | Run in Firefox browser |
| `npm run test:edge` | Run in Edge browser |
| `npm run test:login-failure` | Login failure tests |
| `npm run test:login-success` | Login success tests |
| `npm run test:product-nav` | Product navigation tests |
| `npm run test:cart` | Cart tests |
| `npm run test:advanced` | Advanced scenario tests |
| `npm run test:debug` | Debug mode with headed browser |

---

## Support and Resources

- **Cypress Docs**: https://docs.cypress.io
- **API Reference**: https://docs.cypress.io/api/table-of-contents
- **Common Issues**: https://docs.cypress.io/guides/references/troubleshooting
- **Best Practices**: https://docs.cypress.io/guides/references/best-practices

---

**Last Updated:** May 29, 2026
