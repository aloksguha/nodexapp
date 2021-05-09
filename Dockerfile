FROM node:slim
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY . /opt/app
RUN npm install
RUN chmod +x /opt/app
EXPOSE 3000
CMD [ "npm", "start" ]