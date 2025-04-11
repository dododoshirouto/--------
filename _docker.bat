@echo off

IF NOT EXIST .env (
    echo nul>.env
)

"C:\Program Files\Google\Chrome\Application\chrome.exe" http://127.0.0.1:8080

setlocal

REM Docker Desktop のパス（環境によって変わるかも）
set DOCKER_PATH="C:\Program Files\Docker\Docker\Docker Desktop.exe"

REM Docker Desktop のプロセスチェック
tasklist /FI "IMAGENAME eq Docker Desktop.exe" | find /I "Docker Desktop.exe" >nul
IF %ERRORLEVEL% NEQ 0 (
    echo Docker Desktop が起動してないから立ち上げるで...
    start "" /MIN %DOCKER_PATH%
) ELSE (
    echo Docker Desktop はもう起動してるで！
)

REM Docker が起動するまで待機ループ（最大60秒）
set /A RETRY_COUNT=0
:wait_loop
docker info >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    set /A RETRY_COUNT+=1
    IF %RETRY_COUNT% GEQ 60 (
        echo Docker Desktop の起動に失敗したっぽいで…
        exit /b 1
    )
    echo 待機中...（%RETRY_COUNT% 秒経過）
    timeout /t 1 >nul
    goto wait_loop
)

echo Docker 起動確認完了！

REM docker-compose 実行（必要ならパス修正）
docker-compose up -d

@REM pause

endlocal