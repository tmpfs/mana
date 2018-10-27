# Mana Veda

Mana Veda villas website.

## Website

Watch:

```
makestatic -w
```

Publish:

```
makestatic --clean --env stage --provider s3
makestatic --clean --env production --provider s3
```

Backend server:

```
npm start
```

## Deploy

A small backend is deployed to AWS as `api.manaveda.com`. This is used for the contact form which sends email via sendgrid.

It is a simple deployment, to ssh use `mana-api.pem`:

```
ssh -i ./mana-api.pem ec2-user@api.manaveda.com
```

The git repository is in the `ec2-user` directory as `mana`.

```
cd mana && git pull && sudo docker-compose up
```

Edit the crontab with `sudo crontab -e` and enter:

```
@reboot /home/ec2-user/mana/start.sh
0 0 1 * * /home/ec2-user/certbot-auto renew --non-interactive
```

To start services when the VM is rebooted and also to renew the lets encrypt certificate on the first day of every month.
