#!/bin/sh
echo "RUN setup-ssh.sh"
# Ensure we have the ssh folder
if [ ! -d ~/.ssh ]; then
    mkdir -p ~/.ssh
    chmod 700 ~/.ssh
fi
# Load the private key into a file.
# key=`cat ./keys/dropbox-worker-fix`
# echo "now a key should be printed"
# echo "$key"
test=$(base64 -i ./keys/dropbox-worker-fix)
echo "$test" | base64 --decode > ~/.ssh/deploy_key
# Change the permissions on the file to
# be read-write for this user.
  chmod 600 ~/.ssh/deploy_key
# Setup the ssh config file.
# Switch out the hostname for different hosts.
  echo "Host gitlab.enterpriselab.ch\n"\
          " IdentityFile ~/.ssh/deploy_key\n"\
          " IdentitiesOnly yes\n"\
          " UserKnownHostsFile=/dev/null\n"\
          " StrictHostKeyChecking no"\
          > ~/.ssh/config