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



# Make sure it’s executable
RUN chmod +x start.sh
EXPOSE 8080

#CMD ["pwd"]
#RUN ls
# Set the entrypoint to your script
ENTRYPOINT ["./start.sh"]
CMD ["concurrently", "npx tsc --watch", "npx live-server --port=8080 --watch=./*.html,dist/* --entry-file=index.html"]