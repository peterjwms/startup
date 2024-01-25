# CS 260 Notes
## GitHub basics
### Basic Git commands:
```
git status
git add
git commit
git push
git pull
git fetch
git clone
git init
```

### Development Process with Git
1. Pull changes with `git pull`
1. Make changes to code
1. Commit changes with `git commit`
   - add a descriptive message with `git commit -am "message"`
1. Push changes with `git push`

### Markdown Basics
Basic formatting and syntax info can be found on the [GitHub Markdown Intro](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax).

## AWS Basics
IP address: `44.217.89.189`

#### Steps to start the server
* created an instance of a webserver through AWS EC2
   * For this project, using an AMI (Amazon Machine Image) as the base for the server
   * Had to make sure to adjust the security group rules to allow ssh, http, and https from anywhere (`0.0.0.0/0`)
   * currently using a `t2.micro` instance because it's on the free tier - can upgrade to `t3.micro/nano/small` if running too slowly/erratically
* Can ssh into the server - `ssh -i production-260.pem ubuntu@44.217.89.189`
* Can associate an elastic IP with the server so that the IP address stays the same even when stopping the server

#### Domain name
* Register a domain name from AWS Route 53
* need to manage the records so that it connects to the IP address of your server for the rot domain name and for all subdomain names by creating records associated with the domain name


## HTTPS
* Secure Hypertext Transport Protocol basically expected for all online communication now.
* data and web certificates passed back and forth between browser and domain name of server to verify identity
* Use Caddy and `Let's Encrypt` to dynamically generate and renew a certificate for free
* Modified the Caddy rules to handle requests to the domain name instead of to a specific port so that it uses HTTPS instead
