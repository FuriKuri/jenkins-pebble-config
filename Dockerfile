FROM iojs:slim

# Bundle app source
ADD index.js index.js
ADD package.json package.json
ADD files files

RUN npm install

ENV NODE_PORT 8080

EXPOSE 8080

ENTRYPOINT ["node", "index.js"]