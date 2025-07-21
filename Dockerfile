# Stage 1: Copy files
FROM nginx:alpine AS static-site

WORKDIR /usr/share/nginx/html

# Remove default nginx static files
RUN rm -rf ./*

# Copy all game files to nginx web root
COPY . .

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
