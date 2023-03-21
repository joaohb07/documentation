# Book Tracker Challenge

---

## Technologies Used

???+ info "Database and Hosting"
    - [Node.js](https://nodejs.org/en/)

    - [MongoDB](https://www.mongodb.com/)

    - [MongoDB atlas](https://www.mongodb.com/atlas/database)

    - [Express](https://expressjs.com/)

???+ tip "Template"
    - [ejs](https://ejs.co/) - Embbed JavaScript templating

???+ abstract "Prototype"
    - [Docker](https://www.docker.com/)

## Installation

This app is built in **[Docker](https://www.docker.com/products/docker-desktop/)**, make sure you have this installed before run it.

Clone `main` branch from **[***book tracker challenge repo***](https://github.com/joaohb07/book-tracker-challenge)**.

## Usage

Access `book-tracker-challenge` folder:

```bash
cd book-tracker-challenge
```

How to run the app:

```bash title="Build App's Image"
# builds the image-based container
docker build . -t user/node-web-app # tagging to identify the registry
```

```bash title="Run Container's App"
# run on local port 3000
docker run -p 3000:3000 -d user/node-web-app
# output will be container id
```

Access your web browser in: `http://localhost:3000/`

To end container execution, copy the container id outputted by the `docker run` command and run the following:

```bash title="Kill Container"
# kill container execution
docker kill <container id>
```

If you want to make sure that the container execution stopped, run the following:

```bash title="Curl App"
# curl localhost on app's port
curl -i localhost:3000
```

Output should be something like this:

```bash title="Curl Output"
curl: (7) Failed to connect to localhost port 3000 after 17 ms: Connection refused
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
