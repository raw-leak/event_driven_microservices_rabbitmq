// Servers
import producer from '../../User-ms/src/configs/app';
// import receiver from '../../TodoList-ms/';

// DB
import mongoose from 'mongoose';
import User from '../../User-ms/src/User/Model';
import TodoList from '../../TodoList-ms/src/TodoList/Model';

// Testing
import request from 'supertest';
import { expect } from 'chai';
import 'mocha';

describe('POST /user', () => {
  it('should return true', async () => {
    const body = {
      firstName: 'Misha',
      lastName: 'Gusak',
      email: 'email@email.com',
      password: '123',
    };

    const res = await request(producer).post('/user');

    console.log(res);
  });
});
