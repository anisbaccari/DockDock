FROM alpine:3.19

# Install packages
RUN apk update && apk add --no-cache \
    bash \
    curl \
    vim \
    nodejs \
    npm

WORKDIR /app  

COPY package*.json .

RUN npm install 

COPY . .

# Compile TypeScript during the build
#RUN npx tsc --watch & 
# Copy the script into the container
# COPY start.sh /usr/local/bin/start.sh

# Make sure it’s executable
 RUN chmod +x start.sh
EXPOSE 8080

#CMD ["pwd"]
#RUN ls
# Set the entrypoint to your script
ENTRYPOINT ["./start.sh"]
CMD ["npx", "live-server", "--port=8080", "--entry-file=index.html"]