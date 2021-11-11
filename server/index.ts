import { Application, Request, Response } from 'express';
import { IUser } from '../src/types/users';

const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const server: Application = express();
const PORT = 8080;
const DIST_DIR = path.resolve(__dirname, '../dist');
const HTML_FILE = path.resolve(DIST_DIR, 'index.html');
const DB_DIR = path.resolve(__dirname, './db');
const USERS_FILE = path.resolve(DB_DIR, 'users.json');
const urlencodedParser = express.urlencoded({ extended: false });
server.use(express.static(DIST_DIR));
server.use(bodyParser.json());

server.get('/api/users', (req: Request, res: Response): void => {
  res.sendFile(USERS_FILE);
});

server.post('/api/users', urlencodedParser, (req: Request, res: Response) => {
  const users: IUser[] = JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));
  users.push(req.body);
  fs.writeFile(USERS_FILE, JSON.stringify(users), (err: Error): void => {
    if (err) throw err;
  });
  res.sendStatus(200);
});

server.delete('/api/users', urlencodedParser, (req: Request, res: Response) => {
  const users: IUser[] = JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));
  const newUsers = users.filter((user) => user.id !== req.body.id);
  fs.writeFile(USERS_FILE, JSON.stringify(newUsers), (err: Error): void => {
    if (err) throw err;
  });
  res.sendStatus(200);
});

server.patch(
  '/api/users',
  urlencodedParser,
  (req: Request, res: Response): void => {
    const users: IUser[] = JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));
    const currentUser = users.find((user) => user.id === req.body.id);
    if (currentUser) {
      currentUser.name = req.body.name;
      currentUser.role = req.body.role;
    }
    fs.writeFile(USERS_FILE, JSON.stringify(users), (err: Error): void => {
      if (err) throw err;
    });
    res.sendStatus(200);
  }
);

server.get('*', (req: Request, res: Response): void => {
  res.sendFile(HTML_FILE);
});

server.listen(PORT, (): void => {
  console.log(`Server has been started on: ${PORT}`);
});
