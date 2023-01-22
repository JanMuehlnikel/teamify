echo "Switching to branch main"
git checkout main

echo "Building app..."
npm run build

echo "Deploying files to server..."
scp -r build/* jan@45.10.24.220:/var/www/45.10.24.220/

echo "Done!"

