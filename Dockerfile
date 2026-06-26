# Use Nginx Alpine image for a lightweight, secure web server
FROM nginx:alpine

# Copy static game files to the default Nginx public directory
COPY . /usr/share/nginx/html

# Expose port 80 for serving static content
EXPOSE 80

# Run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
