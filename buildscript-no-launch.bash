#!/bin/sh

echo Removing old resources...
cd Maitinimas-back/src/main/resources/static
rm -r -f ./*
echo "Old resources removed."

echo Building react app...
cd ../../../../../Maitinimas-front/

# Check if node_modules/ exists, if not run npm install
if [ ! -d "node_modules" ]; then
    echo "node_modules not found. Running npm install..."
    npm install
    if [ $? -ne 0 ]; then
        echo "npm install failed. Exiting."
        exit 1
    fi
else
    echo "node_modules exists. Skipping npm install."
fi

# Run npm build and check for errors
if npm run build | grep "Failed\|failed\|error\|Error\|not found"
	then echo Npm build failed, try npm install first
	exit 1
else
	echo Npm build completed
fi

echo Copying build to target...
cd ../Maitinimas-back/src/main/resources/static/
cp -r ../../../../../Maitinimas-front/build/* .
echo "Build copied."

echo Maven clean package...
cd ../../../../
mvn clean package -DskipTests

#echo Starting tomcat on port 8081...
# mvn org.codehaus.cargo:cargo-maven2-plugin:1.7.7:run -Dcargo.maven.containerId=tomcat9x -Dcargo.servlet.port=8081 -Dcargo.maven.containerUrl=https://repo1.maven.org/maven2/org/apache/tomcat/tomcat/9.0.40/tomcat-9.0.40.zip