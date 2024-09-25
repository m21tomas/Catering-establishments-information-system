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
cmd /c npm install
echo Dependencies installed: %ERRORLEVEL%

echo Starting Npm Build...
cmd /c npm run build
echo Npm build completed: %ERRORLEVEL%


echo Copying build to target...
cd ..\Maitinimas-back\src\main\resources\public\
cmd /c xcopy /E /Y ..\..\..\..\..\Maitinimas-front\build\* .\
echo Build copied to target: %ERRORLEVEL%

echo Maven clean package...
cd ..\..\..\..
cmd /c mvn clean package -DskipTests
echo Backend binary war package created: %ERRORLEVEL%

echo Build script completed successfully.
ENDLOCAL