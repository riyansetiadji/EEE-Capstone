#FROM centos:7
FROM ubuntu:latest
MAINTAINER Riyan Setiadji <rsetiadj@asu.edu>
EXPOSE 8090

#RUN yum -y update && \
#yum install -y epel-release && \
#yum install -y python34 && \
#curl -O https://bootstrap.pypa.io/get-pip.py && \
#python3 get-pip.py && \
#pip3 install music21 matplotlib numpy scipy && \
#pip3 install flask gunicorn

RUN apt-get -y update && \
apt-get -y install python3 python3-pip && \
pip3 install music21 matplotlib numpy scipy && \
pip3 install flask gunicorn

COPY . /app/eecapstone/

WORKDIR /app/eecapstone/

CMD ["gunicorn", "-b", "0.0.0.0:8090", "--reload", "eecapstone:app"]

