# Production 
git reset --hard
git checkout master
git pull origin master

npm run build
pm2 start "process.config.js" --env production

#Development
# git reset --hard
# git checkout develop
# git pull origin develop

# npm build
# pm2 start "process.config.js" --env development