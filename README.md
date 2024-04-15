## 1ureka's CG : Portfolio & Personal Website

This website acts as both a platform to display 3D CG portfolios and my personal website, powered by React.

## Key Features

#### Design and Appearance

- **Responsive Design**: Ensures optimal viewing experience across devices.
- **Theme Support**: Users can seamlessly switch between system theme and manual selection of light/dark mode.
- **Material Design**: Incorporates Material Design principles for a sleek and intuitive user interface.
- **SPA**: Implements React Router for seamless navigation between different pages, ensuring smooth transitions and a cohesive user experience.

#### Image Processing

- **Lazy Loading**: Images are loaded asynchronously, optimizing memory usage, with partial decoding for enhanced efficiency.
- **Image Decoding**: Completely rewritten the image decoding process, overriding browser default behavior. Even when displaying large images, smooth scrolling is maintained.

#### User Experience

- **Visitor Mode**: Allows visitors to browse the landing page, divided into distinct sections with Snap Scroll feature and unique animated designs.
- **Admin Mode**: Upon logging in, users access the administrator mode. Here, they can explore two different themed portfolios and perform file management tasks such as addition, deletion, and integrity verification.
- **Interactive Gallery**: Within portfolios, users can drag to zoom images and adjust parameters like exposure and saturation for enhanced viewing experience.

## Technologies Used

- **React**: Building the entire frontend application.
- **Vite**: Project build tool.
- **React Router**: Implementing routing functionality.
- **Recoil**: State management.
- **Material-UI**: Providing UI components.
- **Material Icons**: Application icon set.
- **Octokit**: GitHub API integration.
- **GSAP (GreenSock Animation Platform)**: Used for animation effects.

## Installation

To run this project locally, follow these steps:

1. Clone the repository.
2. Navigate to the project directory.
3. Install dependencies using `npm install`.
4. Start the development server with `npm run dev`.
