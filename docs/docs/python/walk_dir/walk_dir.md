# Return directory files

>A simple script developed using python and the `os` library.

## Installation
!!! tip "Python"
    This script is developed in ***[python3.7 >](https://www.python.org/downloads/)***, make sure you have this installed before run it.

Clone `main` branch from my ***[python-projects repo](https://github.com/joaohb07/python-projects)***.

## Usage

Access `dir_files` folder and execute the script:

```bash title="Execute return directory files script"
cd python-projects/scripts/dir_files
python3 run.py
```

## Code

```python title="Main Script"
class WalkDir():
    
    def __init__(self):
        self.path = input("Type your path:\n")
        self.exclude_dir = [input("Type dir(s) to exclude (e.g. folder1,folder2...) or else <enter>:\n")]
            
    def walk_dir(self):
        if os.path.isdir(self.path):
            for current_dir, dirs, filenames in os.walk(top=self.path, topdown=True):
                dirs[:] = [d for d in dirs if d not in self.exclude_dir]
                for file in filenames:
                    print(f'Files paths: {current_dir}/{file}\n')
            print(f'Files: {filenames}\n')
            return filenames
                    
        else:
            print(f'Invalid path: {self.path}\n')
            return  None
```

> The script above simply inputs: a path from the user and dir(s) to exclude, then it prints the file(s) name(s),
> ***[repo](#installation)***.

???+ example
    ```bash title="Sample output"
    Type your path:
    /Users/joaobotelho/projects/snake
    Type dir(s) to exclude (e.g. folder1,folder2...) or else <enter>:
    snake # my virtual env w/ requirements installed
    Files paths: /Users/joaobotelho/projects/snake/requirements.txt

    Files paths: /Users/joaobotelho/projects/snake/snake.py

    Files paths: /Users/joaobotelho/projects/snake/README.md

    Files: ['requirements.txt', 'snake.py', 'README.md']
    ```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
