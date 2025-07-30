# ESG Application

A comprehensive Environmental, Social, and Governance (ESG) management platform built with Angular.

## 🚀 Live Demo

Visit the live application: [ESG App](https://nitu-das305.github.io/esg-web/)

## 📋 Features

- **Environmental Dashboard**: Comprehensive sustainability metrics and monitoring
- **Training & Development**: File attachment support for training materials
- **Stakeholder Engagement**: Community initiatives and feedback management
- **Data Management**: Centralized ESG data handling
- **Reporting & Analytics**: Advanced reporting capabilities
- **Dark Mode Support**: Enhanced user experience with theme switching

## 🛠️ Technology Stack

- **Frontend**: Angular 20
- **Styling**: SCSS with responsive design
- **Charts**: Chart.js with ng2-charts
- **PDF Generation**: jsPDF
- **Internationalization**: ngx-translate
- **Deployment**: GitHub Pages with GitHub Actions

## 📦 Installation

### Prerequisites
- Node.js (v20 or higher)
- npm or yarn

### Setup
```bash
# Clone the repository
git clone https://github.com/nitu-das305/esg-web.git

# Navigate to project directory
cd esg-web

# Install dependencies
npm install

# Start development server
npm start
```

The application will be available at `http://localhost:4200`

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run linting
npm run lint

# Build for production
npm run build
```

## 🚀 Deployment

This project uses GitHub Actions for automated deployment. The deployment process follows these steps:

### 1. Branch Workflow
- Create a feature branch from `main`
- Make your changes
- Push to your feature branch

### 2. Pull Request Process
- Create a Pull Request to `main` branch
- GitHub Actions will automatically:
  - Run tests
  - Check code quality
  - Build the application
  - Validate the PR

### 3. Merge and Deploy
- Once PR is approved and merged to `main`
- GitHub Actions automatically deploys to GitHub Pages
- Application becomes available at: https://nitu-das305.github.io/esg-web/

## 📁 Project Structure

```
src/
├── app/
│   ├── environmental-dashboard/     # Main dashboard
│   ├── environmental-training/      # Training & Development
│   ├── stakeholder-engagement/      # Stakeholder management
│   ├── data-management/            # Data handling
│   ├── reporting/                  # Reports and analytics
│   └── shared/                     # Shared components
├── assets/                         # Static assets
└── styles.scss                     # Global styles
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory for environment-specific configurations.

### Build Configuration
The application is configured for production builds with optimization enabled.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Check the existing issues for similar problems

## 🔄 CI/CD Pipeline

The project uses GitHub Actions for continuous integration and deployment:

- **Pull Request Validation**: Runs tests, linting, and builds on every PR
- **Main Branch Deployment**: Automatically deploys to GitHub Pages on merge to main
- **Quality Gates**: Ensures code quality before deployment

## 📊 Build Status

![Build Status](https://github.com/nitu-das305/esg-web/workflows/Deploy%20ESG%20Application/badge.svg)
![Pull Request Validation](https://github.com/nitu-das305/esg-web/workflows/Pull%20Request%20Validation/badge.svg)
