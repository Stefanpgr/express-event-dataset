let request = require('supertest');

request = request('http://localhost:4000')

test('should return records', async () => {
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
})

test('should return error 400 if empty request is sent', async () => {
  const response = await request.post('/records').send({}).expect(400)
})
