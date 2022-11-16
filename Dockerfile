FROM node:18.12.1

LABEL version="1.0"

LABEL description="Chagest entreprise"

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

ARG NODE_ENV

#RUN npm install 
RUN if [ "$NODE_ENV" = "development" ]; \
    then npm ci && npm cache clean --force; \
    else npm ci && npm cache clean --force --only=production; \
    fi

COPY . ./

EXPOSE 8000

CMD ["npm", "run", "start"]