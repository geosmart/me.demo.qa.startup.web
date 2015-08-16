
#Build java web app container image 
FROM daocloud.io/centos6
MAINTAINER geosmart<geosmart.github.io>

#Make java and tomcat install directory
WORKDIR /home/

RUN yum update -y && yum install -y \
	tar \
	wget \
	java-1.7.0-openjdk-devel

# Install Tomcat 7
RUN wget https://archive.apache.org/dist/tomcat/tomcat-7/v7.0.57/bin/apache-tomcat-7.0.57.tar.gz && \
	tar xzf apache-tomcat-7.0.57.tar.gz && \
	mv apache-tomcat-7.0.57 /usr/local/tomcat7 && \
	rm apache-tomcat-7.0.57.tar.gz

# Deploy .war
RUN rm -rf /usr/local/tomcat7/webapps/ROOT
ADD ./deploy/demo.war /usr/local/tomcat7/webapps/ROOT.war

# Make Tomcat daemon
COPY init.d-tomcat /etc/rc.d/init.d/tomcat
RUN chmod 755 /etc/rc.d/init.d/tomcat

ADD ./run.sh /home/run.sh
RUN chmod +x /home/run.sh

CMD ["/home/run.sh"]