# Forahia News App

Forahia News App is a news aggregator application built with Laravel 11.3 that scafolds with React. It allows users to search for news articles, filter them by various criteria, and manage their preferences for a personalized news experience.

## Features

- Fetch and display news articles from various sources
- Search for news articles by keyword
- Filter news articles by date, category, author, and source
- Manage user preferences for authors and sources
- Responsive design for a seamless experience on all devices

## Sample Images

### Welcome
![Welcome](./images/welcome.png)

### login
![Login](./images/login.png)

### Dashboard
![Dashboard](./images/dashboard.png)

### Filter
![Search](./images/search.png)

### Preferences
![Preferences](./images/preferences.png)

## Installation

Follow these steps to set up the Forahia News App on your local machine:

### Prerequisites

- PHP >= 8.0
- Composer
- Node.js and npm
- Git

### Clone the Repository

```bash
git clone https://github.com/Chi-G/forahia-news-app.git
cd forahia-news-app
composer install
npm install
cp [.env.example](http://_vscodecontentref_/1) .env
php artisan key:generate
php artisan migrate
npm run dev
