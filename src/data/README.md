# Portfolio Data

This directory contains the local JSON data for your portfolio website.

## File Structure

- `portfolioData.json` - Contains all your portfolio information

## How to Update Your Data

### 1. Profile Information
Edit the `profileBanner` and `contactMe` sections in `portfolioData.json`:

```json
{
  "profileBanner": {
    "headline": "Your New Headline",
    "profileSummary": "Your updated summary",
    "linkedinLink": "https://linkedin.com/in/yourprofile"
  },
  "contactMe": {
    "name": "Your Name",
    "title": "Your Title",
    "email": "your.email@example.com",
    "phoneNumber": "+1 (555) 123-4567"
  }
}
```

### 2. Projects
Add or modify projects in the `projects` array:

```json
{
  "title": "Project Name",
  "description": "Detailed description of your project",
  "techUsed": "React, Node.js, MongoDB",
  "image": {
    "url": "/images/your-project-image.png"
  }
}
```

### 3. Skills
Update your skills in the `skills` array:

```json
{
  "name": "Skill Name",
  "category": "Category (e.g., Programming Languages)",
  "description": "Description of your skill level",
  "icon": "icon-name"
}
```

### 4. Certifications
Add certifications to the `certifications` array:

```json
{
  "title": "Certification Title",
  "issuer": "Issuing Organization",
  "issuedDate": "YYYY-MM-DD",
  "link": "https://certificate-url.com",
  "iconName": "organization-icon"
}
```

### 5. Timeline (Work Experience & Education)
Update your timeline in the `timeline` array:

```json
{
  "name": "Position/Program Name",
  "timelineType": "work" or "education",
  "title": "Job Title or Degree",
  "techStack": "Technologies used",
  "summaryPoints": [
    "Achievement 1",
    "Achievement 2",
    "Achievement 3"
  ],
  "dateRange": "2020 - 2022"
}
```

### 6. Work Permit
Update work authorization information:

```json
{
  "visaStatus": "Your Visa Status",
  "expiryDate": "YYYY-MM-DD",
  "summary": "Brief summary of work authorization",
  "additionalInfo": "Additional information"
}
```

## Adding Images

1. Place your images in the `public/images/` directory
2. Reference them in the JSON using `/images/filename.jpg`
3. For profile pictures, resume, and project images, make sure to use the correct paths

## Benefits of Local Data

- ✅ No external dependencies
- ✅ No API keys needed
- ✅ Faster loading
- ✅ Full control over your data
- ✅ Easy to version control
- ✅ No monthly costs

## Restart Required

After making changes to `portfolioData.json`, restart your development server:

```bash
npm start
# or
yarn start
```
