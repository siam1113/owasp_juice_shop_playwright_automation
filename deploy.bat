“@ECHO OFF
MOVE .\playwright-report\index.html .
git add .
git commit -m "%date%-%time%"

