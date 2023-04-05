const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ObjectId } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true });

client.connect(err => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('Connected to database');

  const db = client.db('binary-tree-db');
  const nodesCollection = db.collection('nodes');

  app.post('/nodes', async (req, res) => {
    const node = req.body;

    const result = await nodesCollection.insertOne(node);

    res.status(201).send(result.insertedId);
  });

  app.get('/breadth-first-search/:startingNode', async (req, res) => {
    const startingNode = req.params.startingNode;

    const queue = [startingNode];
    const visited = new Set();

    while (queue.length > 0) {
      const currentNode = queue.shift();
      visited.add(currentNode);

      const node = await nodesCollection.findOne({ _id: ObjectId(currentNode) });

      if (!node) {
        res.status(404).send(`Node ${currentNode} not found`);
        return;
      }

      res.write(`${node.value} `);

      if (node.left && !visited.has(node.left.toHexString())) {
        queue.push(node.left.toHexString());
      }

      if (node.right && !visited.has(node.right.toHexString())) {
        queue.push(node.right.toHexString());
      }
    }

    res.end();
  });

  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });
});
