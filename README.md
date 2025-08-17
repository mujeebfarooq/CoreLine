# Gemini AI Chat

A simple chat application powered by Google's Gemini AI. This application provides a clean, responsive interface for interacting with the Gemini language model.

## Features

- Clean, modern UI with Material-UI components
- Responsive design that works on desktop and mobile
- Real-time chat interface with message history
- Typing indicators for better UX
- Custom scrollbars and smooth animations

## Prerequisites

- Node.js (v16 or later)
- npm (v7 or later) or yarn
- Google Gemini API key (Get it from [Google AI Studio](https://aistudio.google.com/app/apikey))

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd myai
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn
   ```

3. **Set up your Gemini API key**
   - Create a `.env` file in the root directory
   - Add your Gemini API key:
     ```
     VITE_GEMINI_API_KEY=your_api_key_here
     ```
   - Alternatively, you can set it directly in `src/config.js`

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open in your browser**
   The app will be available at `http://localhost:5173`

## Project Structure

- `src/` - Main source code
  - `components/` - React components
    - `Chat.jsx` - Main chat interface component
  - `config.js` - Configuration for Gemini API
  - `App.jsx` - Main application component
  - `main.jsx` - Application entry point
- `public/` - Static assets
- `index.html` - Main HTML file

## Customization

You can customize the application by modifying:

- `src/config.js` - Update model parameters and safety settings
- `src/theme.js` - Change the color scheme and typography
- `src/App.css` - Modify global styles

## Deployment

To create a production build:

```bash
npm run build
# or
yarn build
```

The build artifacts will be stored in the `dist/` directory.

## License

This project is open source and available under the MIT License.

## Acknowledgments

- [Google Gemini](https://ai.google.dev/) - For the powerful AI model
- [Material-UI](https://mui.com/) - For the UI components
- [Vite](https://vitejs.dev/) - For the build tooling
