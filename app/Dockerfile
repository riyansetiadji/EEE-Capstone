FROM centos:7
MAINTAINER Riyan Setiadji <rsetiadj@asu.edu>
EXPOSE 8090

RUN yum -y update && \
yum install -y epel-release && \
yum install -y python34 && \
curl -O https://bootstrap.pypa.io/get-pip.py && \
python3 get-pip.py

COPY . /app/eecapstone/

WORKDIR /app/eecapstone/

RUN pip3 install flask && \
pip3 install gunicorn

CMD ["gunicorn", "-b", "0.0.0.0:8090", "--reload", "eecapstone:app"]

