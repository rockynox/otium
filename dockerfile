FROM arm64v8/node:12.2.0-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY . .

RUN npm install
RUN npm install serve
RUN npm build

CMD ["serve", "-s", "build", "-l", "2233"]
