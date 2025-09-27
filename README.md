# 🎬 Netflix-Style Portfolio Website

A modern, responsive portfolio website built with React and TypeScript, inspired by Netflix's UI/UX design. This portfolio showcases projects, skills, experience, and personal interests in an engaging, interactive format.

## ✨ Features

- 🎨 **Netflix-Inspired Design** - Dark theme with red accents and smooth animations
- 📱 **Fully Responsive** - Works perfectly on desktop, tablet, and mobile devices
- 🎮 **Interactive Sections** - Profile-based navigation with different views
- 🎯 **Project Showcase** - Detailed project cards with technology stacks
- 🎵 **Personal Interests** - Music, Reading, Video Games, and more
- 📊 **Skills & Certifications** - Comprehensive skill showcase
- 🔗 **Contact Integration** - Easy ways to get in touch
- ⚡ **Fast Performance** - Optimized for speed and user experience

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: CSS3 with custom animations
- **Icons**: React Icons (Font Awesome, Simple Icons)
- **Routing**: React Router DOM
- **Build Tool**: Create React App
- **Data Management**: Local JSON with custom data service

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Harsh-1807/netflix-portfolio.git
   cd netflix-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Main page components
├── profilePage/        # Profile-specific components
├── data/               # JSON data files
├── services/           # Data service layer
├── queries/            # Data fetching functions
├── images/             # Static images
└── types.ts           # TypeScript type definitions
```

## 🎯 Key Sections

- **Profile Selection** - Choose between different persona views (Recruiter, Developer, Stalker, Adventure)
- **Top Picks** - Curated content based on selected profile
- **Continue Watching** - Personal interests and hobbies
- **Projects** - Detailed project showcase with tech stacks
- **Skills** - Technical skills with categories
- **Experience** - Work experience timeline
- **Certifications** - Professional certifications
- **Video Games** - Gaming interests and favorites
- **Reading** - Book recommendations and favorites
- **Contact** - Multiple ways to get in touch

## 🎨 Customization

### Adding New Projects
Edit `src/data/portfolioData.json`:
```json
{
  "title": "Your Project Name",
  "description": "Project description",
  "techUsed": "React, Node.js, MongoDB",
  "image": {
    "url": "/images/your-project.png"
  }
}
```

### Adding New Skills
```json
{
  "name": "New Skill",
  "category": "Category Name",
  "description": "Skill description",
  "icon": "icon-name"
}
```

### Styling
- Main styles: `src/index.css`
- Component styles: Individual `.css` files in each component folder
- Color scheme: Netflix-inspired dark theme with red (#e50914) accents

## 🚀 Deployment

This project is configured for easy deployment on:
- **Netlify** (Recommended)
- **Vercel**
- **GitHub Pages**
- **AWS S3 + CloudFront**

### Netlify Deployment
1. Connect your GitHub repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `build`
4. Deploy automatically on every push to main branch

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 📧 Contact

- **GitHub**: [@Harsh-1807](https://github.com/Harsh-1807)
- **LinkedIn**: [Your LinkedIn Profile]
- **Email**: [Your Email]

## 🙏 Acknowledgments

- Netflix for the amazing UI/UX inspiration
- React community for the excellent ecosystem
- All open source contributors

---

⭐ **Star this repository if you found it helpful!**