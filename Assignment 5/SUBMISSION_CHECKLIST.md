# Assignment Submission Checklist - JMeter API Testing

## 📋 Complete Checklist Before Submission

Use this checklist to verify everything is ready!

---

## ✅ Part 1: Project Files Created

- [ ] **api_testing.jmx** exists
  - Test plan file with all requests configured
  - Can be opened in JMeter GUI
  - Contains 6 HTTP requests (GET, POST, GET, PUT, DELETE, GET)

- [ ] **test_data.csv** exists
  - Contains at least 5 rows of test data
  - Headers: userId, title, body
  - Proper CSV format (comma-separated)
  - Can be read by CSV Data Set Config

- [ ] **README.md** exists
  - Complete documentation
  - Setup instructions
  - Test plan description
  - API endpoints documented
  - How to run tests

- [ ] **QUICK_REFERENCE.md** exists
  - Quick start guide
  - Key file locations
  - Common issues and solutions

- [ ] **.gitignore** exists
  - Excludes *.jtl files
  - Excludes *.log files
  - Excludes htmlreport/
  - Excludes system files

---

## ✅ Part 2: Test Plan Configuration

### HTTP Request Samplers

- [ ] **Request 1: GET All Posts**
  - Method: GET ✓
  - URL: https://jsonplaceholder.typicode.com/posts ✓
  - Contains assertion: Response contains "id" ✓

- [ ] **Request 2: POST New Post**
  - Method: POST ✓
  - URL: https://jsonplaceholder.typicode.com/posts ✓
  - Headers: Content-Type: application/json ✓
  - Body: JSON with ${title}, ${body}, ${userId} ✓
  - Assertion: Response Code 200 or 201 ✓
  - Regular Expression Extractor: extracts postId ✓

- [ ] **Request 3: GET Specific Post**
  - Method: GET ✓
  - Path: /posts/${postId} ✓
  - Assertion: Response Code 200 ✓

- [ ] **Request 4: PUT Update Post**
  - Method: PUT ✓
  - Path: /posts/${postId} ✓
  - Headers: Content-Type: application/json ✓
  - Body: Updated JSON with variables ✓
  - Assertion: Response Code 200 ✓

- [ ] **Request 5: DELETE Post**
  - Method: DELETE ✓
  - Path: /posts/${postId} ✓
  - Assertion: Response Code 200 ✓

- [ ] **Request 6: GET After Delete**
  - Method: GET ✓
  - Path: /posts/${postId} ✓
  - Purpose: Verify deletion ✓

### Thread Group Configuration

- [ ] Thread Group created
  - Name: "API CRUD Tests" ✓
  - Number of Threads: 5 ✓
  - Ramp-up Period: 10 seconds ✓
  - Loop Count: 1 ✓

### Config Elements

- [ ] HTTP Request Defaults configured
  - Protocol: https ✓
  - Server: jsonplaceholder.typicode.com ✓

- [ ] CSV Data Set Config configured
  - File: test_data.csv ✓
  - Variables: userId,title,body ✓
  - Delimiter: , (comma) ✓

### Assertions

- [ ] Response Assertions added
  - GET All Posts: Contains "id" ✓
  - POST New Post: Code 200/201 ✓
  - GET Specific: Code 200 ✓
  - PUT Update: Code 200 ✓
  - DELETE: Code 200 ✓

### Extractors

- [ ] Regular Expression Extractor
  - Name: Extract Post ID ✓
  - Reference Name: postId ✓
  - Regex: "id":(\d+) ✓
  - Default: 101 ✓

### Listeners

- [ ] View Results Tree added
  - Shows detailed request/response ✓
  - Visible in GUI ✓

- [ ] Summary Report added
  - Shows statistics ✓
  - Visible in GUI ✓

---

## ✅ Part 3: CSV Data-Driven Testing

- [ ] **test_data.csv** has proper structure
  ```csv
  userId,title,body
  1,First Test,Content...
  2,Second Test,Content...
  [etc]
  ```

- [ ] CSV file readable
  - No extra spaces ✓
  - Proper quotes around long text ✓
  - No special characters breaking CSV ✓

- [ ] Variables correctly substituted
  - POST uses ${title} ✓
  - POST uses ${body} ✓
  - POST uses ${userId} ✓

- [ ] Multiple iterations working
  - Each thread reads different CSV row ✓
  - 5 threads × 1 loop = 5 CSV rows used ✓

---

## ✅ Part 4: CRUD Operations Complete

- [ ] **POST (Create)**
  - Request exists ✓
  - Uses CSV data ✓
  - Returns 201/200 ✓
  - Returns new ID ✓

- [ ] **GET (Read)**
  - GET all posts exists ✓
  - GET specific post exists ✓
  - Both working ✓

- [ ] **PUT (Update)**
  - Request exists ✓
  - Updates with new data ✓
  - Returns 200 ✓

- [ ] **DELETE (Delete)**
  - Request exists ✓
  - Uses extracted ID ✓
  - Returns 200 ✓

- [ ] **Verification**
  - GET after delete exists ✓
  - Confirms deletion ✓

---

## ✅ Part 5: Test Execution

- [ ] Test plan runs without errors
  - Opens in JMeter ✓
  - Can click Start ✓
  - Doesn't crash ✓

- [ ] All 5 threads execute
  - No "0 samples" ✓
  - All threads complete ✓

- [ ] 30 total samples executed
  - 5 threads × 6 requests = 30 ✓

- [ ] 0 failures
  - Error % = 0% ✓
  - All requests successful ✓

- [ ] All assertions pass
  - Green checkmarks ✓
  - No red X marks ✓

- [ ] Response times acceptable
  - Most < 300ms ✓
  - No timeouts ✓

---

## ✅ Part 6: Documentation

- [ ] **README.md** complete
  - Overview section ✓
  - Prerequisites listed ✓
  - Setup instructions ✓
  - API endpoints documented ✓
  - Thread configuration explained ✓
  - Expected results shown ✓
  - Troubleshooting included ✓
  - Submission requirements clear ✓

- [ ] **QUICK_REFERENCE.md** useful
  - Quick start commands ✓
  - File locations listed ✓
  - Common issues covered ✓
  - Success criteria shown ✓

- [ ] **GITHUB_SETUP.md** clear
  - Step-by-step GitHub setup ✓
  - Git commands explained ✓
  - Troubleshooting included ✓

- [ ] **SAMPLE_RESULTS.md** provided
  - Example output shown ✓
  - Expected values documented ✓
  - Interpretation explained ✓

---

## ✅ Part 7: GitHub Repository

- [ ] GitHub account created
  - [ ] or already has account

- [ ] Repository created
  - Name: jmeter-api-testing ✓
  - Public (visible to instructor) ✓
  - Has description ✓

- [ ] Git configured locally
  - `git config user.name` set ✓
  - `git config user.email` set ✓

- [ ] Repository initialized
  - `git init` executed ✓
  - `.git` folder created ✓

- [ ] Files added to Git
  - `git add .` executed ✓
  - All files staged ✓

- [ ] Initial commit created
  - `git commit` executed ✓
  - Has descriptive message ✓

- [ ] Remote added
  - `git remote add origin ...` executed ✓
  - Points to correct repository ✓

- [ ] Branch renamed
  - `git branch -M main` executed ✓
  - On 'main' branch ✓

- [ ] Pushed to GitHub
  - `git push -u origin main` executed ✓
  - Files visible on GitHub website ✓

- [ ] Repository verified
  - Can see api_testing.jmx ✓
  - Can see test_data.csv ✓
  - Can see README.md ✓
  - Can see all other files ✓

---

## ✅ Part 8: Final Verification

- [ ] All required files present

```
jmeter-api-testing/
├── api_testing.jmx          ✓
├── test_data.csv            ✓
├── README.md                ✓
├── QUICK_REFERENCE.md       ✓
├── GITHUB_SETUP.md          ✓
├── SAMPLE_RESULTS.md        ✓
├── SUBMISSION_CHECKLIST.md  ✓
└── .gitignore               ✓
```

- [ ] Test plan syntax correct
  - Valid XML ✓
  - Opens without errors ✓

- [ ] Variable substitution working
  - ${title} replaced ✓
  - ${body} replaced ✓
  - ${userId} replaced ✓
  - ${postId} extracted and used ✓

- [ ] Assertions properly configured
  - No syntax errors ✓
  - All passing ✓

- [ ] CSV file properly formatted
  - No encoding issues ✓
  - All rows readable ✓

- [ ] Documentation complete
  - No broken links ✓
  - Instructions clear ✓
  - Enough detail for reproduction ✓

---

## ✅ Part 9: Ready for Submission

- [ ] Test plan works perfectly
  - 100% success rate ✓
  - All assertions pass ✓
  - No errors ✓

- [ ] GitHub repository ready
  - All files pushed ✓
  - Can clone and run ✓

- [ ] Documentation complete
  - Step-by-step instructions ✓
  - Troubleshooting guide ✓
  - Sample results ✓

- [ ] Can provide GitHub link
  - https://github.com/[username]/jmeter-api-testing ✓

---

## 🎯 Submission Details

**What to submit to instructor:**

### Option 1: GitHub Link (RECOMMENDED)
```
Repository URL:
https://github.com/YOUR-USERNAME/jmeter-api-testing

Contents:
✓ api_testing.jmx
✓ test_data.csv
✓ README.md
✓ All supporting documentation
```

### Option 2: Files + Proof
If instructor wants files directly:
- [ ] api_testing.jmx file
- [ ] test_data.csv file
- [ ] README.md documentation
- [ ] Screenshot of test results

---

## 📝 Test Results to Show Instructor

Before submitting, verify you can show:

1. **JMeter GUI with test running**
   - [ ] Start button clicked
   - [ ] Tests executing
   - [ ] Progress visible

2. **View Results Tree**
   - [ ] 30 samples shown
   - [ ] All green (passed)
   - [ ] No red X marks

3. **Summary Report**
   - [ ] 30 samples total
   - [ ] 100% success
   - [ ] 0% error
   - [ ] Response times shown

4. **GitHub Repository**
   - [ ] All files visible
   - [ ] Can be cloned
   - [ ] README readable

---

## 🚀 Final Steps

1. [ ] Run test one last time
   - Verify all passing
   - Note response times
   - Screenshot results

2. [ ] Create GitHub repository
   - Push all files
   - Verify visible on web

3. [ ] Prepare submission
   - Have GitHub link ready
   - Have screenshots ready
   - Have this checklist ready

4. [ ] Submit to instructor
   - Provide GitHub link
   - Or provide files + evidence
   - Include screenshots

---

## ✨ Success Criteria Met?

Answer YES to all:

- [ ] Test plan has GET, POST, PUT, DELETE requests
- [ ] CRUD cycle validated (POST → GET → PUT → DELETE → GET)
- [ ] CSV data-driven testing working
- [ ] 5 concurrent threads
- [ ] Multiple test iterations
- [ ] All assertions passing
- [ ] Response times acceptable
- [ ] GitHub repository created
- [ ] All files committed
- [ ] Documentation complete

**If ALL ✓, you're ready to submit!**

---

## 📊 Quick Status Check

```
TEST PLAN:     ✓ Complete
CRUD OPS:      ✓ All working
CSV TESTING:   ✓ Parameterized
ASSERTIONS:    ✓ Validated
GITHUB:        ✓ Pushed
DOCS:          ✓ Documented
RESULTS:       ✓ Passing

STATUS:        ✓✓✓ READY FOR SUBMISSION ✓✓✓
```

---

## 💾 Files to Keep Safe

```
✓ api_testing.jmx       (Main test plan - MOST IMPORTANT)
✓ test_data.csv         (Test data)
✓ GitHub repo link      (For submission)
✓ Screenshots of results (Evidence of passing tests)
```

---

## 🎓 Learning Objectives Achieved?

- [ ] Built JMeter test plan with Thread groups ✓
- [ ] Created Samplers (HTTP requests) ✓
- [ ] Added Listeners (results) ✓
- [ ] Automated CRUD workflow ✓
- [ ] Implemented CSV data-driven testing ✓
- [ ] Validated API responses ✓
- [ ] Managed Git/GitHub ✓

**All complete? Congratulations! 🎉**

---

## 📞 If Something's Wrong

**Test fails?**
→ Check View Results Tree for error message
→ Verify test_data.csv is readable
→ Check internet connection

**Files not pushing to GitHub?**
→ Verify remote URL: `git remote -v`
→ Check credentials
→ Try with Personal Access Token

**Can't open JMeter file?**
→ Make sure JMeter is running
→ Try File → Open → Select file
→ Verify .jmx file is valid XML

---

## ✅ Final Check Before Submission

Run this command to verify everything:

```bash
# Check files exist
ls -la *.jmx *.csv README.md .gitignore

# Output should show all files exist

# Check git status
git status

# Output should show "nothing to commit, working tree clean"

# Check remote
git remote -v

# Output should show GitHub URL
```

**All good? You're ready to submit! 🚀**

---

**Congratulations on completing Assignment No. 5!** 🎓

*Date Completed: _________*  
*Submission Date: _________*  
*Status: ✓ READY*
