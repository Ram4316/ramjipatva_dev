#!/bin/bash

echo "🚀 Building and deploying portfolio to GitHub Pages..."

# Build the project
echo "📦 Building project..."
npm run export

# Deploy to gh-pages
echo "🚀 Deploying to GitHub Pages..."
npx gh-pages -d out --dotfiles

echo "✅ Deployment complete!"
echo "🌐 Your portfolio should be available at: https://ram4316.github.io/my-portfolio"
echo "⏰ It may take a few minutes to become available."
