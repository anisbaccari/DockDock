FROM alpine:3.19

# Install packages
#to prevent content to fail loading ->  ca-certificates 
RUN apk update && apk add --no-cache \
    ca-certificates  \ 
    bash \
    curl \
    vim \
    nodejs \
    npm

WORKDIR /app  

COPY package*.json .

RUN npm install -g concurrently

COPY . .

RUN chmod +x start.sh
EXPOSE 8080


# Set the entrypoint to your script
ENTRYPOINT ["./start.sh"]
CMD ["concurrently", "npx tsc --watch", "npx live-server --port=8080 --watch=./*.html,dist/* --entry-file=index.html"]