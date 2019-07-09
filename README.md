# dirsummary

Show a directory summary based on informations found in markdown files
Resulting in a ldjson stream of extracted informations

## Installation

```
npm install -g dirsummary
```


## Usage

```
Usage: dirsummary [options]
```

The information in the stream are:

- filepath: The full file path
- filename: The filename
- name: The filename without extension
- dirname: The directory name containing the markdown file
- volume: The dirname parent
- title: The markdown title
- description: The first line after the title
- (Other fields): The first block containing Yaml data is merged with
  the resulting json entry

From a directory containing other directory with README.md inside

```sh
dirsummary --glob "*/README.md"

# With csv-write utility (from csv-write-stream npm package)
dirsummary | csv-write
```
