# Strapi CMS + Next.js Website

Open Source Strapi CMS + Next.js starter Website. Preconfigured in a docker instance.

### Story so far...

In a world of building websites for clients. There always seemed to be 2 clients. Those who want to update their websites and those who don't but then end up wanting to update their websites themselves.

Enter Wordpress. The website building software that was designed for bloggers and people looking to create and maintain their own website. Over time the product became bloated and makes for some hefty, slow websites.

The goal: To create a light-weight website that includes a content manage system(CMS) that would allow users to update their own website content, create blogs, and make a graphical tool that can add, remove and update database entries.

Since we have an Open Source CMS that generates the JSON objects and a separate website. I've included a dockerfile to be able to quickly spin up both instances and be pre-configured to connect to each other.

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

Give it a couple minutes for the docker instance to download, extract and install all of the dependencies, especially for the Strapi CMS.

## Usage

Stapi CMS will be available at `http://localhost:1337`

Next.js Frontend Website will be available at `http://localhost:3000`

Mongo DB will be available on port `27017`

## First Steps

### API Setup and Content Creation

Create Strapi Admin login at `http://localhost:1337/admin`

Once logged in, install the GraphQL from the [Marketplace](http://localhost:1337/admin/marketplace). This will be necessary for the Front end to pull the CMS objects and parse them using GraphQL query language.

After you've installed GraphQL then you can use the [Playground environment](http://localhost:1337/graphql) where you can do live queries to see what your data looks like.

Then start creating data types in the CMS. Pages, blog posts, categories, navigation menus, store locations. The sky is the limit. The ability to link different object types is easy. Once you've got more than 1 Content Type you can add a field called a `Relation` and choose your other content type and select what kind of relationship it is. One to one, one to many, many to many and more.

Last step is to make the objects in the CMS accessible via the API. Go to [Roles and Permissions](http://localhost:1337/admin/plugins/users-permissions/roles) and edit the `Public` role.

Find your content you want to be accessible via the API and check boxes for `find` and `findone`. Meaning you can get a list of items or one item.

There are options available to create, update, and delete (CRUD) via the API as well if you'd like youre front end to programmatically access your data.

### Create your first object on the frontend

Create your first object for the front end. It's going to be importing the GraphQL library that will be querying the CMS, since it already knows where it lives. Then create the query that will be used by the pages to display the content. Make sure to create the objects using the same fields as you created in the CMS.

Create your query in `./apollo/queries/{content-colection-type}/{collection-item}.js`. The name of the collection item is going to be the singular version of your collection. IE: Pages => page. `./apollo/queries/pages/page.js`. You can also put queries for Relational data if you're looking to get fancy.

```
./apollo/queries/page/page.js
```

OR

```
./apollo/queries/page/pages.js
```

```js
import gql from "graphql-tag";

const PAGES_QUERY = gql`
  query Pages {
    pages {
      id
      title
      content
      image {
        url
      }
    }
  }
`;

export default CATEGORIES_QUERY;
```

Once you're successully querying the data in the front end of your website then it's time to display it.

Create a matching JS file in the `./pages` directory. IE: `./pages/page.js`. Example:

```js
import { useRouter } from "next/router";
import Query from "../components/query";
import ReactMarkdown from "react-markdown";
import Moment from "react-moment";
import ARTICLE_QUERY from "../apollo/queries/pages/page";

const Page = () => {
  const router = useRouter();
  return (
    <Query query={PAGES_QUERY} id={router.query.id}>
      {({ data: { page } }) => {
        const imageUrl =
          process.env.NODE_ENV !== "development"
            ? page.image.url
            : process.env.API_URL + page.image.url;
        return (
          <div>
            <div
              id="banner"
              className="uk-height-medium uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light uk-padding uk-margin"
              data-src={imageUrl}
              data-srcset={imageUrl}
              data-uk-img
            >
              <h1>{page.title}</h1>
            </div>

            <div className="uk-section">
              <div className="uk-container uk-container-small">
                <ReactMarkdown source={page.content} />
              </div>
            </div>
          </div>
        );
      }}
    </Query>
  );
};

export default Page;
```

Now if you navigate to `http://localhost:3000/pages/{id}` you should see the data for that page in the browser.

## Quick Wrap

From here it's up to you. I've pieced this together using a couple different examples and code snippets for inspiration. They just never quite seemed to work exactly the way I was hoping for.

Credit goes to the Strapi Team and their [Blog Post](https://strapi.io/blog/build-a-blog-with-next-react-js-strapi-and-apollo) on creating a Strapi Next.js project. There's more examples of using Relational data and some additional configuration items. Also more explanation on how it's integrated and why it works. For additional information on the Strapi-Next-Blog tutorial check out their [Github Repo](https://github.com/strapi/strapi-starter-next-blog) for more information including a one click setup to deploy a Strapi CMS server on Heroku with one-click.

Next goes to [Julien Demangeon](https://github.com/jdemangeon) for his [Beerdex](https://github.com/marmelab/strapi-beerdex) project that showed me how the Dockerfile could be configured to work with the 2 applications.

Next.js has lots of different themes available. So it wouldn't take much to get a nice looking website up and running in a short period of time.

## TODO

Investigate One-Click Deploys to [Amazon AWS AMI](https://github.com/strapi/one-click-deploy)

Investigate [Theming Next.js](https://www.creative-tim.com/product/nextjs-material-kit)

## Contributors
- [Operatic Agency](https://operaticagency.com/)
- [geofferiswheel](https://github.com/geofferiswheel) Andrew Konken - creator, maintainer
