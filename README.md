# PuPHPet apache vhost helper

Allows you to add apache vhosts to a PuPHPet + Vagrant machine using a few questions on your command line.

## Installation

`yarn global add puphpet-helper`
or
`npm install -g puphpet-helper`

## What it does

Currently asks the following questions:

1. `Domain? (example.local)`<br>
2. `Document root? (/var/www/example.local)`<br>
3. `Port? (80)`<br>
4. `Are you happy and ready to go? (Y/n)`

After answering Y on the last question will start the installation.
puphpet-helper will create `puphpet/config-custom.yaml` if it does not exist yet and append 
the vhost to the file using the `vhost.yaml` template from the `templates/` folder in this app.


## Roadmap or wishlist  (feel free to PR)

- Through a question, add the new vhost to the host-machine's host file
  - output the command to append it to the host file (like `echo <IP> <VHOST> >> /etc/hosts`)
  - if puphpet-helper is run with root/elevation, add it
- Add support for MySQL databases
- Make questions more dynamic (e.g. when answering the domain question with test.local, make the default for Document root /var/www/test.local/public_html)
- Don't ask for the port, ask for HTTP or HTTPS (and base public_html and private_html on that)


## Far away
- Add support for self-signed SSL certs and a root certificate
