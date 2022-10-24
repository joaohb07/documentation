# Unit Tests

>Unit tests developed to test my python scripts.

---

## Installation

!!! tip "Python"
    This script is developed in ***[python3.7 >](https://www.python.org/downloads/)***, make sure you have this installed before run it.

The unit tests lib that used was **[pytest](https://docs.pytest.org/en/)** to write unit tests for my python scripts.

## Usage

1. Clone `main` branch from [***python-projects***](https://github.com/joaohb07/python-projects).

2. Access the tests folder to install the requirements

    ```bash title="Access tests folder"
    cd python-projects/tests/
    ```

3. Use the package manager ***[pip](https://pip.pypa.io/en/stable/)*** to install requirements, I recommend you use an virtual environment:

    ???+ quote "Optional step"
        This is an optional step, it is not needed.
        Create and activate a new python virtual environment.

        ```bash title="Virtual environment"
        python3 -m venv <venv_name>
        source <venv_name>/bin/activate
        ```

    ```bash title="Install requirements"
    pip install -r requirements.txt
    ```

4. Run Unit tests:

    ```bash title="Run Unit Tests"
    pytest
    ```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
