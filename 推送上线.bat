@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo.
echo ============================================
echo   推送作品集到 GitHub（部署到线上）
echo ============================================
echo.

echo [1/3] 检查网络...
ping -n 1 github.com >nul 2>&1
if errorlevel 1 (
  echo.
  echo   [!] 无法连接 github.com
  echo.
  echo   请先打开你的代理软件（Clash Verge），确保它正在运行，
  echo   然后重新双击本脚本。
  echo.
  pause
  exit /b 1
)
echo       网络正常
echo.

echo [2/3] 推送中...
set GIT_TERMINAL_PROMPT=0
git push origin main
if errorlevel 1 (
  echo.
  echo   [!] 推送失败，正在重试（走代理）...
  git push origin main
)
echo.

echo [3/3] 结果
git status -sb | findstr /C:"ahead" >nul
if errorlevel 1 (
  echo       推送成功！
  echo.
  echo   稍等 1-2 分钟，然后打开：
  echo   https://yan1234567yan.github.io/portfolio/
  echo.
  echo   如果还是旧内容，按 Ctrl+F5 强制刷新。
) else (
  echo       仍未推送成功，请确认代理软件正常运行后重试。
)
echo.
pause
