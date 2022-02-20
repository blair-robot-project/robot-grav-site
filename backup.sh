cd /srv/robot-grav-site
git config --local user.name blairrobotproject
git config --local user.email blair.robot@gmail.com
git add user/pages/*
git commit -am "Backup for ${date}"
git push