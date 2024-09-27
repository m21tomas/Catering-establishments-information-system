@echo off
SETLOCAL

echo Removing old resources...
cd Maitinimas-back\src\main\resources\public
del /Q *.*

echo Building react app...
cd ..\..\..\..\..\Maitinimas-front\

echo Checking for node_modules...
IF NOT EXIST "node_modules" (
    echo node_modules folder not found. Installing dependencies...
    npm install
    IF %ERRORLEVEL% NEQ 0 (
        echo npm install failed. Exiting...
        exit /B 1
    )
) ELSE (
    echo node_modules exists. Skipping npm install.
)

echo Starting Npm Build...
npm run build
IF %ERRORLEVEL% NEQ 0 (
    echo Npm build failed. Exiting...
    exit /B 1
)
echo Npm build completed.

echo Copying build to target...
cd ..\Maitinimas-back\src\main\resources\public\
xcopy /E /Y ..\..\..\..\..\Maitinimas-front\build\* .\
IF %ERRORLEVEL% NEQ 0 (
    echo Failed to copy build files. Exiting...
    exit /B 1
)
echo Build copied to target.

echo Maven clean package...
cd ..\..\..\..
mvn clean package -DskipTests
IF %ERRORLEVEL% NEQ 0 (
    echo Maven build failed. Exiting...
    exit /B 1
)
echo Backend binary war package created.

echo Build script completed successfully.
ENDLOCAL
