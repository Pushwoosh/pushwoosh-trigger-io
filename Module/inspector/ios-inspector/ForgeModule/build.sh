if [ -d "${SRCROOT}/build" ]
then
rm -rf "${SRCROOT}/build"
fi

PROJECT_NAME=ForgeModule
CONFIGURATION=Release
BUILD_DIR="build"
PRODUCT_NAME="module.a"

${XCODEB_PATH} -project ${PROJECT_NAME}.xcodeproj -sdk iphonesimulator -target ${PROJECT_NAME} -configuration ${CONFIGURATION} clean build CONFIGURATION_BUILD_DIR=${BUILD_DIR}/${CONFIGURATION}-iphonesimulator

if [ $? -ge 1 ]
then
exit 1;
fi;

${XCODEB_PATH} -project ${PROJECT_NAME}.xcodeproj -sdk iphoneos -target ${PROJECT_NAME} -configuration ${CONFIGURATION} clean build CONFIGURATION_BUILD_DIR=${BUILD_DIR}/${CONFIGURATION}-iphoneos

if [ $? -ge 1 ]
then
exit 1;
fi;

SIMULATOR_LIBRARY_PATH="${BUILD_DIR}/${CONFIGURATION}-iphonesimulator/lib${PROJECT_NAME}.a" &&
DEVICE_LIBRARY_PATH="${BUILD_DIR}/${CONFIGURATION}-iphoneos/lib${PROJECT_NAME}.a" &&
UNIVERSAL_LIBRARY_DIR="${BUILD_DIR}/${CONFIGURATION}-iphoneuniversal" &&
UNIVERSAL_LIBRARY_PATH="${UNIVERSAL_LIBRARY_DIR}/${PRODUCT_NAME}" &&

rm -rf "out" &&
mkdir -p "${UNIVERSAL_LIBRARY_DIR}" &&
mkdir "out"

# Generate universal binary for the device and simulator.
lipo "${SIMULATOR_LIBRARY_PATH}" "${DEVICE_LIBRARY_PATH}" -create -output "${UNIVERSAL_LIBRARY_PATH}"

if [ $? -ge 1 ]
then
exit 1;
fi;

# Move files to appropriate locations in framework paths.
cp "${UNIVERSAL_LIBRARY_PATH}" "out"

# cleanup
rm -rf "${SRCROOT}/build"
