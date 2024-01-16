FROM ubuntu/nginx
# add nginx
# RUN yum -y install wget
COPY ./index.html /var/www/html/index.html

CMD ["nginx", "-g", "daemon off;"]
