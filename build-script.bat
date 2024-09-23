@echo off
SETLOCAL

echo Removing old resources...
cd Maitinimas-back\src\main\resources\public
del /Q *.*

echo Building react app...
cd ..\..\..\..\..\Maitinimas-front\

echo Checking Node.js version...
node -v
IF ERRORLEVEL 1 (
    echo Node.js is not installed or not found in PATH. Exiting...
    exit /B 1
)

echo Checking Node.js version...
cmd /c npm -v
echo Npm version checked: %ERRORLEVEL%

echo Installing dependencies...
npm install
echo Dependencies installed: %ERRORLEVEL%

npm run build
IF ERRORLEVEL 1 (
    echo Npm build failed. Exiting...
    exit /B 1
) ELSE (
    echo Npm build completed successfully.
)

echo Copying build to target...
cd ..\Maitinimas-back\src\main\resources\public\
xcopy /E /Y ..\..\..\..\..\Maitinimas-front\build\* .\

echo Maven clean package...
cd ..\..\..\..
mvn clean package
IF ERRORLEVEL 1 (
    echo Maven clean package failed. Exiting...
    exit /B 1
)

echo Build script completed successfully.
ENDLOCAL