@ECHO OFF
chcp 65001
:: Step 1: Delete old index.html from the root directory
DEL index.html
if %ERRORLEVEL% EQU 0 (
    echo ✅ Successfully deleted index.html from the root directory
) else (
    echo ❌ Failed to deleted index.html from the root directory
    exit /b 1
)

:: Step 2: Move index.html to root directory
MOVE .\playwright-report\index.html .
if %ERRORLEVEL% EQU 0 (
    echo ✅ Successfully moved index.html to root directory
) else (
    echo ❌ Failed to move index.html to root directory
    exit /b 1
)

:: Step 3: Commit and push the changes to GitHub
set commit_message=%date% %time%
git add index.html deploy.bat
git commit -m "%commit_message%"
git push origin main
if %ERRORLEVEL% EQU 0 (
    echo ✅ Successfully pushed changes to GitHub
) else (
    echo ❌ Failed to push changes to GitHub
    exit /b 1
)
