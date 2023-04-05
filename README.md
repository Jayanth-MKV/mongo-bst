# binary-tree-express-mongo

A simple Express and MongoDB project for storing and searching binary trees.

## Installation

1. Clone the repository:


2. Install dependencies:
```
cd binary-tree-express-mongo
npm install
```

3. Set environment variables:

Create a `.env` file with the following variables:
```
MONGODB_URI=mongodb://localhost:27017/binary-tree-db
PORT=3000
```

Replace `mongodb://localhost:27017/binary-tree-db` with the URL of your MongoDB database and `3000` with the desired port number.

4. Start the server:

```
npm start
```

Alternatively, you can use `npm run dev` to start the server with nodemon for automatic reloading during development.

## Usage

### Inserting nodes

To insert a node into the binary tree, make a POST request
to /nodes with the following JSON body:

```
{
  "value": 5,
  "left": {
    "value": 3,
    "left": {
      "value": 2
    },
    "right": {
      "value": 4
    }
  },
  "right": {
    "value": 7,
    "left": {
      "value": 6
    },
    "right": {
      "value": 8
    }
  }
}
```

```
        5
      /   \
     3     7
    / \   / \
   2   4 6   8

```

The response will contain the ID of the newly created node.

Breadth-first search
To perform a breadth-first search on the binary tree, make a GET request to /breadth-first-search/:startingNode, where :startingNode is the ID of the starting node. For example, to search starting from the root node created in the previous step, make a request to /breadth-first-search/insertedNodeId, where insertedNodeId is the ID returned from the POST request.

The response will contain the values of the nodes visited during the search, separated by spaces.

# Docker

To run the application in a Docker container, use the following commands:

```
docker build -t binary-tree-express-mongo .
docker run -p 3000:3000 -d binary-tree-express-mongo
```
Replace binary-tree-express-mongo with the desired name of the Docker image. The first command builds the image, and the second command starts a container running the image on port 3000.

