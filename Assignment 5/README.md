# JMeter API Testing - Assignment No. 5

## 📋 Project Overview

This project demonstrates comprehensive API testing using JMeter with CRUD operations (Create, Read, Update, Delete) against a REST API. The test suite includes data-driven testing with CSV files, response validation, and performance monitoring.

**Objective:** Build automated API tests covering CRUD operations with data-driven validation and GitHub submission.

---

## 🎯 Learning Objectives

By completing this assignment, you will learn to:

✅ Build JMeter test plans with Thread Groups, Samplers, and Listeners  
✅ Automate CRUD API workflows (POST → GET → PUT → DELETE)  
✅ Implement CSV data-driven testing for parameterized test cases  
✅ Validate API responses using assertions and extractors  
✅ Monitor performance metrics and generate reports  
✅ Version control test plans using Git/GitHub  

---

## 📦 Project Files

```
jmeter-api-testing/
├── api_testing.jmx          # Main JMeter test plan
├── test_data.csv            # Test data for CSV-driven testing
├── README.md                # This file
├── .gitignore               # Git ignore rules
└── results/                 # Test results (generated)
    ├── results.jtl         # JMeter results
    └── jmeter.log          # JMeter logs
```

---

## 🚀 Quick Start

### Prerequisites
- ✅ JMeter installed (v5.5 or later)
- ✅ Java installed (JDK 8+)
- ✅ Git installed
- ✅ Internet connection (for JSONPlaceholder API)

### Step 1: Prepare the Environment

```bash
# Clone the repository (after pushing to GitHub)
git clone https://github.com/your-username/jmeter-api-testing.git
cd jmeter-api-testing

# Verify files exist
ls -la
# Output:
# api_testing.jmx
# test_data.csv
# README.md
```

### Step 2: Open Test Plan in JMeter

```bash
# Option 1: Using JMeter GUI
jmeter -t api_testing.jmx

# Option 2: Use JMeter GUI to open file
# File → Open → Select api_testing.jmx
```

### Step 3: Run the Tests

**In GUI Mode:**
1. Open JMeter GUI
2. File → Open → Select `api_testing.jmx`
3. Click the green **Start** button (triangle icon)
4. Watch the progress in listeners

**In Command Line Mode:**

```bash
# Run with default settings
jmeter -n -t api_testing.jmx -l results.jtl

# Run with logging
jmeter -n -t api_testing.jmx -l results.jtl -j jmeter.log

# Run with HTML report generation
jmeter -n -t api_testing.jmx -l results.jtl -j jmeter.log -e -o htmlreport/
```

---

## 🔌 Test Configuration

### API Details

| Property | Value |
|----------|-------|
| **API Base URL** | `https://jsonplaceholder.typicode.com` |
| **Protocol** | HTTPS |
| **Content-Type** | application/json |
| **Authentication** | None (free test API) |

### Endpoints Tested

| Method | Endpoint | Description |
|--------|----------|-------------|
| **GET** | `/posts` | Retrieve all posts |
| **GET** | `/posts/{id}` | Retrieve specific post |
| **POST** | `/posts` | Create new post |
| **PUT** | `/posts/{id}` | Update existing post |
| **DELETE** | `/posts/{id}` | Delete post |

---

## 📊 Test Plan Structure

```
Test Plan: API Testing - CRUD Operations
│
└─ Thread Group: API CRUD Tests
   ├─ Number of Threads: 5
   ├─ Ramp-up Period: 10 seconds
   ├─ Loop Count: 1
   │
   ├─ HTTP Request Defaults (Config)
   │  └─ Base URL: jsonplaceholder.typicode.com
   │
   ├─ CSV Data Set Config
   │  └─ File: test_data.csv
   │  └─ Variables: userId, title, body
   │
   ├─ Sampler 1: GET All Posts
   │  ├─ Method: GET
   │  ├─ Path: /posts
   │  └─ Assertion: Response contains "id"
   │
   ├─ Sampler 2: POST New Post (CSV Data)
   │  ├─ Method: POST
   │  ├─ Path: /posts
   │  ├─ Body: JSON with ${title}, ${body}, ${userId}
   │  ├─ Assertion: Response Code = 201 or 200
   │  └─ Extractor: Regular Expression to get postId
   │
   ├─ Sampler 3: GET Specific Post
   │  ├─ Method: GET
   │  ├─ Path: /posts/${postId}
   │  └─ Assertion: Response Code = 200
   │
   ├─ Sampler 4: PUT Update Post
   │  ├─ Method: PUT
   │  ├─ Path: /posts/${postId}
   │  ├─ Body: Updated JSON data
   │  └─ Assertion: Response Code = 200
   │
   ├─ Sampler 5: DELETE Post
   │  ├─ Method: DELETE
   │  ├─ Path: /posts/${postId}
   │  └─ Assertion: Response Code = 200
   │
   ├─ Sampler 6: GET After Delete (Verify)
   │  ├─ Method: GET
   │  ├─ Path: /posts/${postId}
   │  └─ No Assertion (verify deletion)
   │
   └─ Listeners
      ├─ View Results Tree
      ├─ Summary Report
      └─ Results saved to: results.jtl
```

---

## 📝 CSV Data Format

**File:** `test_data.csv`

```csv
userId,title,body
1,First API Test Post,This is the body content for the first test post
2,Second API Test Post,Testing CRUD operations with multiple data sets
3,Third API Test Post,This data-driven test validates CSV parsing
...
```

**Variables:**
- `${userId}` - User ID (1-5)
- `${title}` - Post title
- `${body}` - Post body content

---

## 🔍 Test Execution Details

### Execution Flow

1. **GET All Posts** → Retrieve all available posts (baseline)
2. **POST New Post** → Create post using CSV data, extract ID
3. **GET Specific Post** → Retrieve created post by ID
4. **PUT Update Post** → Update post with new content
5. **DELETE Post** → Delete the post
6. **GET After Delete** → Verify post is deleted

### Thread Configuration

- **Number of Threads:** 5 concurrent users
- **Ramp-up Period:** 10 seconds (2 seconds per thread)
- **Loop Count:** 1 iteration per thread
- **Total Executions:** 5 threads × 1 loop × 6 requests = 30 API calls

### Response Assertions

Each request includes response validation:

| Request | Assertion Type | Expected Value |
|---------|---|---|
| GET All Posts | Response Text | Contains `"id"` |
| POST New Post | Response Code | 200 or 201 |
| GET Specific Post | Response Code | 200 |
| PUT Update Post | Response Code | 200 |
| DELETE Post | Response Code | 200 |

---

## 📈 Expected Results

### Success Criteria

✅ All 5 threads complete successfully  
✅ 30 total requests executed (6 per thread)  
✅ 0% failure rate  
✅ All assertions pass  
✅ Response times < 500ms average  
✅ CSV data correctly substituted in requests  

### Sample Output

```
Test Summary:
════════════════════════════════════════
Samples:    30
Failures:   0
Success:    100%
Avg Time:   145ms
Min Time:   45ms
Max Time:   320ms
Error Rate: 0%
════════════════════════════════════════
```

---

## 🛠️ Advanced Features

### 1. Regular Expression Extractor

Extracts `postId` from POST response to use in subsequent requests:

```xpath
Reference Name: postId
Regex: "id":(\d+)
Template: $1
```

### 2. Response Assertions

Validates response codes and content:

```
Assertion Type: Response Code
Test Type: Equals
Response Code: 200
```

### 3. CSV Data Set Config

Parameterizes tests with external data:

```
Filename: test_data.csv
Variable Names: userId,title,body
Delimiter: ,
Recycle: true
```

---

## 🐛 Troubleshooting

### Issue: "Connection Refused"
**Cause:** API server unreachable  
**Solution:** 
- Check internet connection
- Verify URL: `https://jsonplaceholder.typicode.com`
- Try in browser first

### Issue: "Assertion Failed - Response Code"
**Cause:** Unexpected response code  
**Solution:**
- Check API response in View Results Tree
- Verify request method and path
- Check JSON body syntax

### Issue: "CSV File Not Found"
**Cause:** Invalid file path  
**Solution:**
- Use absolute path: `/full/path/to/test_data.csv`
- Place CSV in same directory as `.jmx` file
- Check file permissions

### Issue: "Out of Memory"
**Cause:** Large number of threads/results  
**Solution:**
```bash
# Increase heap size
export JVM_ARGS="-Xmx2048m"
jmeter -t api_testing.jmx
```

### Issue: "Regex Extractor Returns Empty"
**Cause:** Regex pattern doesn't match  
**Solution:**
- View actual response in View Results Tree
- Update regex pattern to match response format
- Use default value for fallback

---

## 📋 Submission Checklist

Before submitting, ensure:

- [ ] `api_testing.jmx` file created and tested
- [ ] `test_data.csv` file with at least 5 test cases
- [ ] All 6 CRUD requests configured
- [ ] Response assertions for each request
- [ ] CSV variables properly substituted
- [ ] Regular expression extractor for POST response
- [ ] Listeners configured (View Results Tree, Summary Report)
- [ ] Test plan runs without errors
- [ ] GitHub repository created
- [ ] All files committed and pushed
- [ ] README.md with clear instructions
- [ ] `.gitignore` configured properly

---

## 🔐 Git Submission

### Create GitHub Repository

```bash
# Initialize git in project directory
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: JMeter API testing project"

# Add remote repository
git remote add origin https://github.com/your-username/jmeter-api-testing.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Repository Structure

```
jmeter-api-testing/
├── api_testing.jmx          ← Main test plan
├── test_data.csv            ← CSV test data
├── README.md                ← Documentation
├── .gitignore               ← Git ignore rules
└── results/                 ← Test results (optional)
    ├── results.jtl
    └── jmeter.log
```

### .gitignore Content

```gitignore
# JMeter generated files
*.jtl
jmeter.log
htmlreport/

# CSV backups
*.csv~
*.bak

# System files
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
*.swp
```

---

## 📚 Resources

### JMeter Documentation
- [Apache JMeter Official Guide](https://jmeter.apache.org/usermanual/)
- [JMeter Functions Reference](https://jmeter.apache.org/usermanual/functions.html)

### API Testing
- [JSONPlaceholder Test API](https://jsonplaceholder.typicode.com)
- [REST API Testing Best Practices](https://restfulapi.net/http-status-codes/)

### Video Tutorials
- JMeter CRUD Testing
- CSV Data-Driven Testing
- JMeter Performance Testing

---

## 💡 Tips & Best Practices

1. **Use Meaningful Names:** Name requests clearly (e.g., "POST Create User")
2. **Add Comments:** Use test plan comments to explain logic
3. **Validate Assertions:** Always validate response codes and content
4. **Use Variables:** Leverage variables for reusability
5. **Monitor Performance:** Review response times and throughput
6. **Test Data Variety:** Use diverse CSV data for comprehensive testing
7. **Error Handling:** Check error responses and edge cases
8. **Version Control:** Commit frequently with descriptive messages

---

## ✅ Assignment Completion

**Status:** Ready for Submission

**What You've Built:**
- ✅ Complete JMeter test plan with CRUD operations
- ✅ CSV data-driven testing with 10+ test cases
- ✅ Response validation and assertions
- ✅ Regular expression extractors for data flow
- ✅ Performance monitoring with listeners
- ✅ GitHub-ready repository structure

**Next Steps:**
1. Run `api_testing.jmx` in JMeter GUI
2. Verify all tests pass
3. Push to GitHub
4. Submit GitHub link to instructor

---

## 📞 Support

For issues or questions:
1. Check the Troubleshooting section
2. Review JMeter official documentation
3. Test with simpler scenarios first
4. Verify CSV file format and paths

---

**Last Updated:** 2024  
**Version:** 1.0  
**Status:** Complete ✅

---

## 🎓 Learning Outcomes

Upon successful completion, you will be able to:

✨ Design and implement API test automation  
✨ Use data-driven testing techniques  
✨ Validate API responses automatically  
✨ Monitor performance metrics  
✨ Version control test artifacts  
✨ Document testing procedures  

**Congratulations! You're ready for production API testing! 🚀**
