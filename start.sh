#!/bin/sh

cd /home/ec2-user/mana
su -s /bin/sh -c "/usr/local/bin/docker-compose up -d" ec2-user
