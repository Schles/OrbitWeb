FROM node:15

COPY dist/apps/server ./

EXPOSE 8000

CMD ["node", "main.js"]
