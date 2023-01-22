echo "Switching to branch master"
git checkout master

echo "Building app..."
npm run build

echo "Deploying files to server..."
scp -r build/* root@45.10.24.220:/var/www/45.10.24.220/

echo "Done!"

