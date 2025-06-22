# AssignMe - Complete Your Assignments with Custom Handwriting

AssignMe is an open source web application that helps students complete their assignments by converting digital text into customizable handwritten-style documents. The application provides two main features: generating handwritten-style documents from text and creating custom handwriting fonts from your own handwriting samples. You just need to upload your assignment question and wait for the magic.

**🌐 Live Website: [assignme.live](https://assignme.live)**

![AssignMe Logo](image/logo.png)

## 🛡️ Open Source

This project is open source and released under the [MIT License](./LICENSE). You are free to use, modify, and distribute this software. Contributions are welcome!

## 🌟 Features

### 1. Assignment Text to Handwriting Converter
- Upload assignment questions (PDF or image)
- Enter subject name for better processing
- Customize handwriting style with various font options
- Adjust text parameters (font size, spacing, position)
- Apply different paper effects (shadows, scanner look)
- Choose pen color (blue, black, red, green)
- Generate and download handwritten documents as images or PDF

### 2. Custom Handwriting Font Generator
- Create your own handwriting font
- Capture handwriting samples from camera or uploaded images
- Follow guidelines for best results
- Use your custom font in the handwriting generator

## 🚀 Getting Started

You can access the live version of the application at [assignme.live](https://assignme.live) or set up a local development environment following the instructions below.

### Prerequisites
- Modern web browser (Chrome, Firefox, Edge recommended)
- Internet connection

### Installation
1. Clone the repository:
   ```
   git clone https://github.com/yourusername/assignme.git
   ```
2. Navigate to the project directory:
   ```
   cd assignme
   ```

3. Open the project:
   * Simply open `index.html` in your web browser
   * No build process or server setup required
   
For local development, you can use a simple HTTP server:
   ```
   # Using Python (Python 3)
   python -m http.server
   
   # OR using VS Code Live Server extension
   # Right-click on index.html and select "Open with Live Server"
   ```

**Note:** While this is a static web application that runs in the browser, the dependencies are needed for API integration and some server-side utilities.

5. You're ready to go! The application will automatically use the correct configuration based on your environment.

## 📚 Usage

### Converting Text to Handwriting
1. Open the home page (`index.html`)
2. Upload your assignment question file (PDF/image)
3. Enter the subject name
4. Click "Upload" to process your assignment
5. Customize handwriting options (font, size, spacing, color)
6. Optionally upload a custom paper background image for different paper textures
7. Click "Generate Sheet" to create your handwritten document
8. Download the result as a PDF or individual images

### Creating Your Own Handwriting Font
1. Navigate to "Own Handwriting" section
2. Follow the capture guidelines (stay in the box, align with grid, use black pen)
3. Either capture handwriting samples with your camera or upload images
4. Submit samples to generate your custom font
5. Use your new font in the main handwriting generator

## 🔧 Customization Options

### Handwriting Options
- **Font Selection**: Choose from 30+ handwriting styles
- **Font Size**: Adjust from small to large (up to 30pt)
- **Upload Custom Font**: Add your own TTF/OTF font files
- **Vertical Position**: Adjust text positioning on page
- **Word Spacing**: Control space between words (0-100px)
- **Letter Spacing**: Adjust space between letters (-5 to 40pt)
- **Effects**: Apply shadow, scanner, or no effect
- **Custom Paper Background**: Upload your own paper texture or background image
- **Pen Color**: Choose between blue, black, red, or green ink

## 📂 Project Structure

```
assignme/
│
├── index.html            # Main application page
├── docs.html             # Documentation and guide
├── contactus.html        # Feedback form
├── style.css             # Main stylesheet
├── .gitignore            # Git ignore configuration
├── .env                  # Environment variables (not tracked in git)
├── .env.example          # Example environment variables template
│
├── js/                   # JavaScript files
│   ├── script.js         # Main script file
│   └── config.js         # Configuration and environment variables loader
│
├── canvaPage/            # Canvas drawing functionality
│   ├── css/              # Canvas page stylesheets
│   │   ├── features.css  # Feature-specific styles
│   │   └── index.css     # Canvas page main styles
│   │
│   ├── js/               # Canvas page scripts
│   │   ├── app.mjs       # Main application script
│   │   ├── generate-images.mjs  # Image generation functionality
│   │   └── utils/        # Utility functions
│   │       ├── draw.mjs  # Drawing functions
│   │       ├── generate-utils.mjs  # Generation utilities
│   │       └── helpers.mjs  # Helper functions
│   │
│   ├── fonts/            # Custom and generated fonts
│   └── cypress.json      # Cypress testing configuration
│
├── captureimg/           # Custom handwriting capture functionality
│   ├── index.html        # Handwriting capture page
│   ├── scripts.js        # Capture functionality
│   └── style.css         # Capture page styles
│
├── image/                # Website images
│   ├── logo.png          # Site logo
│   ├── icon.png          # Favicon
│   ├── docs/             # Documentation images
│   └── ...               # Other site images
│
└── script/               # Additional scripts and resources
    ├── package.json      # Package configuration (not for main app)
    ├── test.js           # Testing script
    └── images/           # Sample images for font generation
```

**Note**: This is a static web application that runs directly in the browser without requiring a build process or server setup.

## 🔄 API Integration

The application integrates with a backend API to process assignment files and convert them to handwritten text.

> **Note:** The provided API endpoints are for testing and demonstration purposes only. They are not intended for production use.

```javascript
const url = "https://test2-sfwm.onrender.com/process-file/";

function uploadFile() {
  // File upload and processing functionality
  // ...
  axios.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
  })
  .then(function (response) {
    // Process and display response
  })
  .catch(function (error) {
    console.error("Error:", error);
  });
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is available under the MIT License. See the LICENSE file for more information.

## 👥 Acknowledgments

- References: GitHub, Node community, GenAI, Open-source
- Fonts used in this project are either created by the team or sourced from open-source font repositories
- HTML2Canvas for converting HTML to images
- jsPDF for PDF generation

## 📧 Contact

For feedback or questions, please use the [contact form](https://assignme.live/contactus.html) on the website.

---

© 2024 [assignme.live](https://assignme.live) | All Rights Reserved.
