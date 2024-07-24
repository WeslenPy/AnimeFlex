FROM openjdk:17-slim

ENV ANDROID_SDK_TOOLS 9477386
ENV ANDROID_SDK_URL https://dl.google.com/android/repository/commandlinetools-linux-${ANDROID_SDK_TOOLS}_latest.zip
ENV ANDROID_BUILD_TOOLS_VERSION 33.0.0
ENV ANDROID_HOME /usr/local/android-sdk-linux
ENV ANDROID_VERSION 33
ENV ANDROID_NDK_VERSION 23.1.7779620
ENV ANDROID_CMAKE_VERSION 3.22.1
ENV PATH $PATH:$ANDROID_HOME/tools:$ANDROID_HOME/tools/bin:$ANDROID_HOME/platform-tools:$ANDROID_HOME/cmdline-tools/bin
# Set user to root for necessary permissions
USER root
# Install required packages
RUN apt-get update && \
    apt-get install -y --no-install-recommends unzip curl && \
    mkdir "$ANDROID_HOME" .android && \
    cd "$ANDROID_HOME" && \
    curl -o sdk.zip $ANDROID_SDK_URL && \
    unzip sdk.zip && \
    rm sdk.zip && \
# Download Android SDK
    yes | sdkmanager --licenses --sdk_root=$ANDROID_HOME && \
    sdkmanager --update --sdk_root=$ANDROID_HOME && \
    sdkmanager --sdk_root=$ANDROID_HOME "build-tools;${ANDROID_BUILD_TOOLS_VERSION}" \
    "platforms;android-${ANDROID_VERSION}" \
    "sources;android-${ANDROID_VERSION}" \
    "cmake;${ANDROID_CMAKE_VERSION}" \
    "platform-tools" \
    "ndk;${ANDROID_NDK_VERSION}" \
    "extras;android;m2repository" \
    "extras;google;m2repository" && \
# Clean up
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* && \
    apt-get autoremove -y && \
    apt-get clean

ENV NODE_VERSION 18.20.4
RUN apt-get install -y curl
RUN curl o https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
ENV NVM_DIR /root/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"
RUN node --version
RUN npm --version
RUN npm install -g eas-cli
RUN npm install -g yarn

RUN apt-get update && apt-get install -y git

WORKDIR /home/src/app

COPY . ./