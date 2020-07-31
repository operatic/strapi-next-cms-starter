# next-strapi-cms-starter

Open Source Strapi CMS + Next.js starter Website. Preconfigured in a docker instance.

### Story so far...

In a world of building websites for clients. There always seemed to be 2 clients. Those who want to update their websites and those who don't but then end up wanting to update their websites themselves.

Enter Wordpress ![Wordpress Logo](https://image.flaticon.com/icons/svg/2111/2111777.svg). The website building software that was designed for bloggers and people looking to create and maintain their own website. Over time the product became bloated and makes for some hefty, slow websites.

The goal: To create a light-weight website that includes a content manage system(CMS) that would allow users to update their own website content, create blogs, and make a graphical tool that can add, remove and update database entries.

Since we have an Open Source CMS that generates the JSON objects and a separate website. I've included a dockerfile to be able to quickly spin up both instances and be pre-configured to connect to each other

## Setup

Create `.env` file in the root directory. This will be used by the docker file when creating the docker instance. I've included an example environment file with the various usernames, passwords, ports, etc that are needed to run the docker file. If you're feeling lazy, then just delete the `.example` off of the end and you're ready to begin installation.

## Installation

```sh
make install
```

## Development

```sh
make start
```

## Contributors

- [geofferiswheel](https://github.com/geofferiswheel) Andrew Konken - creator, maintainer
