# Notes App

> A simple Notes App using Node.js

## Installation

This app is built using [**Node.js**](https://nodejs.org/en/download/) make sure you have this installed before running.

Clone `main` branch from [***Notes App repo***](https://github.com/joaohb07/notes-app).

Access `notes-app` folder:

```bash title="Access app folder"
cd notes-app
```

Install the package with its dependencies (You must execute this in `notes-app` folder):

```bash title="Install app package"
npm install
```

### Packages Used

1. [Chalk](https://www.npmjs.com/package/chalk) - Format output
2. [Yargs](https://www.npmjs.com/package/yargs) - Parse Arguments
3. [Mocha](https://mochajs.org/) - Unit Tests
4. [Chai](https://www.chaijs.com/) - Unit Tests

## Usage

### Add a Note

To add a note just run the following command:

```bash title="Add a Note"
node app.js add --title="<your-title>" --body="<note-description>"
# ! Important ! You have to set title and body, or else it won't add your note
```

### Remove a Note

To remove a note just run the following command:

```bash title="Remove a Note"
node app.js remove --title="<your-title>"
# ! Important ! You have to set title or else it won't remove any note
```

### Read a Note

To read a note just run the following command:

```bash title="Read a Note"
node app.js read --title="<your-title>"
# ! Important ! You have to set title or else it won't display any note
```

### List Notes

To list notes just run the following command:

```bash title="List Notes"
node app.js list 
# This will list all your notes stored in notes.json file
```

### Testing

To execute Unit Tests run the following command:

```bash title="Unit Tests"
npm test
```

???+ tip "Unit Test Workflow"
    Here is the unit test workflow that runs unit tests:
    ```yaml title="unit-tests.yml"
    name: Node.js CI

    on:
    push:
        branches: [ "main" ]
    pull_request:
        branches: [ "main" ]

    jobs:
    build:

        runs-on: ubuntu-latest

        strategy:
        matrix:
            node-version: [14.x, 16.x, 18.x]

        steps:
        - uses: actions/checkout@v3
        - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
            node-version: ${{ matrix.node-version }}
            cache: 'npm'
        - run: npm install
        - run: npm test
    ```

### Help

To get informations about the app itself, you can always run the following command to check the available options:

```bash title="Check Commands"
node app.js --help
```

???+ quote "Output"
    Output should be something like this:

    ```bash title="Output"
    Commands:
        app.js add     Add a new note
        app.js remove  Removes an existing note
        app.js read    Read an existing note
        app.js list    List notes

    Options:
        --help     Show help                                                 [boolean]
        --version  Show version number                                       [boolean]
    ```

You can also look inside each argument, `add, remove, list, read` by running the following:

```bash title="Help argument"
node app.js add --help # change add to remove, list or read to check each argument info
```

???+ quote "Output"
    Output should be something like this:

    ```bash title="Help add argument output"
    app.js add

    Add a new note

    Options:
        --help     Show help                                                 [boolean]
        --version  Show version number                                       [boolean]
        --title    Note title                                      [string] [required]
        --body     Note body                                       [string] [required]
    ```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
