# 🚀 Deployment Guide - ESG Application

This guide will walk you through the complete deployment process for the ESG application using GitHub Actions and GitHub Pages.

## 📋 Prerequisites

Before starting the deployment process, ensure you have:

1. **GitHub Account**: Access to [https://github.com/nitu-das305/esg-web](https://github.com/nitu-das305/esg-web)
2. **Git Installed**: On your local machine
3. **Node.js**: Version 20 or higher
4. **npm**: For package management

## 🔧 Step-by-Step Deployment Process

### Step 1: Initial Repository Setup

1. **Clone the repository** (if not already done):
   ```bash
   git clone https://github.com/nitu-das305/esg-web.git
   cd esg-web
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Test locally**:
   ```bash
   npm start
   ```
   Verify the application runs at `http://localhost:4200`

### Step 2: Enable GitHub Pages

1. Go to your GitHub repository: [https://github.com/nitu-das305/esg-web](https://github.com/nitu-das305/esg-web)

2. Navigate to **Settings** → **Pages**

3. Configure GitHub Pages:
   - **Source**: Deploy from a branch
   - **Branch**: `gh-pages` (will be created automatically)
   - **Folder**: `/ (root)`

4. Click **Save**

### Step 3: Enable GitHub Actions

1. In your repository, go to **Actions** tab

2. You should see the workflows:
   - **Deploy ESG Application**
   - **Pull Request Validation**

3. These workflows will be automatically enabled when you push the code

### Step 4: Development Workflow

#### 4.1 Create a Feature Branch

```bash
# Ensure you're on main branch
git checkout main
git pull origin main

# Create and switch to a new feature branch
git checkout -b feature/your-feature-name
```

#### 4.2 Make Your Changes

1. Make your code changes
2. Test locally:
   ```bash
   npm test
   npm run lint
   npm run build
   ```

3. Commit your changes:
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

#### 4.3 Push to Remote

```bash
git push origin feature/your-feature-name
```

### Step 5: Pull Request Process

1. **Create Pull Request**:
   - Go to your repository on GitHub
   - Click **Compare & pull request** for your feature branch
   - Fill out the PR template with details about your changes

2. **Automated Validation**:
   - GitHub Actions will automatically run:
     - ✅ Code formatting check
     - ✅ Linting
     - ✅ Unit tests
     - ✅ Build process
     - ✅ PR validation

3. **Review Process**:
   - Wait for all checks to pass (green ✅)
   - Address any issues if checks fail
   - Request review if needed

4. **Merge to Main**:
   - Once approved, click **Merge pull request**
   - Delete the feature branch

### Step 6: Automatic Deployment

After merging to `main`:

1. **GitHub Actions Deployment**:
   - The `Deploy ESG Application` workflow automatically triggers
   - Builds the application
   - Deploys to GitHub Pages

2. **Deployment Status**:
   - Monitor the deployment in the **Actions** tab
   - Wait for the green checkmark ✅

3. **Access Your Application**:
   - Your application will be available at: [https://nitu-das305.github.io/esg-web/](https://nitu-das305.github.io/esg-web/)
   - First deployment may take 5-10 minutes

## 🔍 Monitoring and Troubleshooting

### Check Deployment Status

1. **GitHub Actions Tab**:
   - Go to **Actions** in your repository
   - Check the latest workflow runs
   - Green checkmark = successful deployment

2. **GitHub Pages Settings**:
   - Go to **Settings** → **Pages**
   - Verify the deployment status

### Common Issues and Solutions

#### Issue: Build Fails
```bash
# Check locally first
npm run build

# Common fixes:
npm install  # Reinstall dependencies
npm run lint  # Fix linting issues
npm test     # Fix failing tests
```

#### Issue: GitHub Pages Not Updating
- Wait 5-10 minutes for deployment
- Check Actions tab for deployment status
- Verify the `gh-pages` branch exists

#### Issue: Tests Failing
```bash
# Run tests locally
npm test

# Check specific test files
npm test -- --include="**/your-component.spec.ts"
```

## 📊 Deployment Workflow Summary

```
Feature Branch → Push → Pull Request → Automated Tests → Review → Merge → Auto Deploy → Live Site
```

## 🎯 Best Practices

### Before Creating PR
- [ ] Run `npm test` locally
- [ ] Run `npm run lint` locally
- [ ] Run `npm run build` locally
- [ ] Test your changes in the browser
- [ ] Update documentation if needed

### Commit Messages
Use conventional commit format:
```
feat: add new training module
fix: resolve file upload issue
docs: update deployment guide
style: improve button styling
refactor: optimize dashboard performance
```

### Branch Naming
```
feature/training-module
fix/file-upload-bug
docs/update-readme
hotfix/security-patch
```

## 🔗 Useful Links

- **Repository**: [https://github.com/nitu-das305/esg-web](https://github.com/nitu-das305/esg-web)
- **Live Application**: [https://nitu-das305.github.io/esg-web/](https://nitu-das305.github.io/esg-web/)
- **Actions**: [https://github.com/nitu-das305/esg-web/actions](https://github.com/nitu-das305/esg-web/actions)
- **Issues**: [https://github.com/nitu-das305/esg-web/issues](https://github.com/nitu-das305/esg-web/issues)

## 🆘 Support

If you encounter issues:

1. Check the **Actions** tab for error details
2. Review the **Issues** section for similar problems
3. Create a new issue with detailed information
4. Include error logs and screenshots

---

**Happy Deploying! 🚀** 