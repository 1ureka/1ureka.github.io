## 1ureka's CG : Portfolio & Personal Website

This website acts as both a platform to display 3D CG portfolios and my personal website, powered by React.

## Key Features

#### Design and Appearance

- **Story Book**: The entire website is conceived as a storybook, where different pages represent different chapters, each chapter further divided into numerous bookmarks.
- **Cover**: Upon opening this book, the cover showcases animated highlights from the portfolio. On the left side, there's a menu mimicking a book's sidebar, allowing for login and navigation.
- **Books**: Featuring a picture wall of portfolios from various categories, each opening into carousels upon selection. Users can switch between images by scrolling or interact further by zooming, panning, and pinching gestures.
- **Tools**: Divided into two bookmarks, Manager for handling portfolio images including addition, deletion, and integrity verification, and Tools for utilities related to images or 3D tools used during development.

#### Image Processing

- **Lazy Loading**: Images are loaded asynchronously, optimizing memory usage, with partial decoding for enhanced efficiency.
- **Image Decoding**: Completely rewritten the image decoding process, overriding browser default behavior. Even when displaying large images, smooth scrolling is maintained.

#### User Experience

- **Theme Support**: Users can seamlessly switch between system theme and manual selection of light/dark mode.
- **Material Design**: Incorporates Material Design principles for a sleek and intuitive user interface.
- **SPA**: Implements React Router for seamless navigation between different pages, ensuring smooth transitions and a cohesive user experience.

## Technologies Used

- **React**: Building the entire frontend application.
- **Vite**: Project build tool.
- **React Router**: Implementing routing functionality.
- **Recoil**: State management.
- **Material-UI**: Providing UI components.
- **Material Icons**: Application icon set.
- **Octokit**: GitHub API integration.
- **Framer Motion**: Used for animation effects.
- **React Zoom Pan Pinch**: Handling interactive image functionalities.

## Installation

To run this project locally, follow these steps:

1. Clone the repository.
2. Navigate to the project directory.
3. Install dependencies using `npm install`.
4. Start the development server with `npm run dev`.
