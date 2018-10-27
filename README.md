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
cd mana && git pull && docker-compose up
```
