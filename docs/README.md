# Python Projects Repo Documentation

For developing this simple documentation I used [mkdocs](https://www.mkdocs.org/) lib with [mkdocs-material](https://squidfunk.github.io/mkdocs-material/) theme.

## Installation

Create and activate a new python virtual environment.

```bash
python3 -m venv <venv_name>
source <venv_name>/bin/activate
```

Use the package manager [pip](https://pip.pypa.io/en/stable/) to install requirements.

```bash
pip install -r requirements.txt
```

## Usage

How to build documentation and serve:

```bash
mkdocs build
mkdocs serve 
```

How to deploy documentation:

```bash
git checkout gh-pages
mkdocs gh-deploy
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
