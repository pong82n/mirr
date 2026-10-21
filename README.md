# MIRR Construction Services

A modern, high-performance, and responsive website designed for **MIRR Construction Services**, a premier general building contractor and heavy civil engineering firm established in 2017, headquartered in Antipolo City, Philippines.

---

## 🏗️ Key Features

- **Industrial Modern Aesthetic:** Designed with a striking palette (Midnight Navy `#0b1120`, Construction Amber/Gold `#f59e0b`, Steel Gray, and clean concrete slate), custom typography (Montserrat + Plus Jakarta Sans), and FontAwesome 6 icons.
- **Interactive Project Cost / Budget Estimator:**
  - Dynamic calculations per square foot based on project sector (Commercial, Luxury Residential, Industrial, Renovation, Civil, Healthcare).
  - Dynamic square footage slider (1,000 sq.ft to 100,000+ sq.ft).
  - Specification tiers (Standard, Premium, Ultra-Luxury).
  - Add-ons (4D BIM clash modeling, LEED Gold sustainability, smart automation, fast-track scheduling).
  - Real-time breakdown of structural core, MEP systems, architectural finishes, and engineering soft costs with duration estimation.
  - One-click transfer to proposal RFP form.
- **Masterwork Project Portfolio (Filterable):**
  - Instant category filtering (Commercial, Residential, Industrial, Infrastructure).
  - High-resolution imagery, completion dates, square footage, and project valuation metrics.
- **Interactive Before & After Renovation Slider:**
  - Mouse & touch-draggable interactive comparison showcasing structural demolition to finished modern campus.
- **Full Lifecycle Services Grid with Interactive Modals:**
  - Deep technical architectural scopes for each engineering discipline.
- **Safety & Quality Standards:**
  - OSHA Voluntary Protection Program highlights, drone photogrammetry, and surety bonding.
- **RFQ & Tender Proposal Request System:**
  - Integrated contact forms with validation feedback and animated toast alerts.
- **Zero Build Step / No Runtime Required:**
  - Runs in any web browser without needing Node.js, Python, or local servers.

---

## 🚀 How to View the Website Locally

You can preview the website immediately:

1. Open File Explorer and navigate to:
   ```
   D:\ONLINE PROJECT\
   ```
2. Double-click **`index.html`** to launch it in your default web browser (Chrome, Edge, Firefox, Brave, etc.).

---

## 🔗 How to Connect & Push to GitHub: `https://github.com/pong82n/mirr.git`

The repository URL requested:
```
https://github.com/pong82n/mirr.git
```

### Step 1: Install Git (If not already installed)
Git was not detected in your current system PATH. You can install it in either of two ways:

- **Via PowerShell (Winget):**
  Open PowerShell as Administrator and run:
  ```powershell
  winget install --id Git.Git -e --source winget
  ```
  *(Restart PowerShell or your terminal after installation so that `git` is recognized)*

- **Or Download Git for Windows:**
  Download and install from: [https://git-scm.com/download/win](https://git-scm.com/download/win)

---

### Step 2: Initialize and Push to Your Repository

Once Git is installed, open PowerShell or Command Prompt in `D:\ONLINE PROJECT` and execute:

```powershell
# 1. Initialize git
git init

# 2. Stage all project files
git add .

# 3. Create initial commit
git commit -m "Initial commit: MIRR Construction and Engineering website"

# 4. Set the main branch
git branch -M main

# 5. Link to your GitHub repository
git remote add origin https://github.com/pong82n/mirr.git

# 6. Push code to GitHub
git push -u origin main
```

> **Note on Authentication:**
> When prompted for your GitHub password during `git push`:
> - Enter your GitHub username: `pong82n`
> - For password, use a **GitHub Personal Access Token (PAT)** (created at GitHub Settings -> Developer Settings -> Personal Access Tokens -> Tokens (classic) with `repo` scope), or sign in using GitHub CLI (`gh auth login`) / GitHub Desktop.

---

### Alternative: Upload via GitHub Web Interface
If you prefer not to install Git right away:
1. Go to [https://github.com/pong82n/mirr](https://github.com/pong82n/mirr) in your browser.
2. Click **"Add file"** > **"Upload files"**.
3. Drag and drop `index.html`, `styles.css`, `script.js`, and `README.md` from `D:\ONLINE PROJECT\`.
4. Click **"Commit changes"**.
