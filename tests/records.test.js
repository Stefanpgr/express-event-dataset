let request = require('supertest');

request = request('http://localhost:4000')

test('should return 200 ok when GET / is called', async () => {
  await request.get('/').expect(200)
})

test('should return records object with status code 200', async () => {
  const response = await request.post('/records').send({
    startDate: '2016-01-26',
    endDate: '2018-02-02',
    minCount: 2000,
    maxCount: 5000,
  }).expect(200)
  expect(response.body).toEqual(
    expect.objectContaining({
      code: 0,
      msg: 'Success',
      records: expect.arrayContaining([
        expect.objectContaining({
          key: expect.any(String),
          createdAt: expect.any(String),
          totalCount: expect.any(Number),
        }),
      ]),
    }),
  );
}, 15000) //timeout increase incase the app takes time to start up #TDD

test('minCount should be greater than or equals to 2000', async () => {
  const response = await request.post('/records').send({
    startDate: '2016-01-26',
    endDate: '2018-02-02',
    minCount: 2000,
    maxCount: 5000,
  }).expect(200)
  for (let i = 0; i < response.body.records.length; i++) {
  expect(response.body.records[i].totalCount).toBeGreaterThanOrEqual(2000);
  }
}, 15000) //timeout increase incase the app takes time to start up #TDD

test('maxCount should be less than or equals to 5000', async () => {
  const response = await request.post('/records').send({
    startDate: '2016-01-26',
    endDate: '2018-02-02',
    minCount: 2000,
    maxCount: 5000,
  }).expect(200)
  for (let i = 0; i < response.body.records.length; i++) {
    expect(response.body.records[i].totalCount).toBeLessThanOrEqual(5000);
  }
  
}, 15000) //timeout increase incase the app takes time to start up #TDD

test('should return status error 404 if no records found', async () => {
   await request.post('/records').send({
    startDate: '2017-01-26',
    endDate: '2018-02-02',
    minCount: 2000,
    maxCount: 5000,
  }).expect(404)
})

test('should return error 422 if empty request is sent with empty object', async () => {
  await request.post('/records').send({}).expect(422)
})
