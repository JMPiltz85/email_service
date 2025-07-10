const request = require('supertest');
const app = require('./app');

const toAddress= "jmpiltz@gmail.com"
const strSubject = "Work order from Unit #999"
const msg ="Test Email Message"

// Mock the entire mailer module
jest.mock('./mailer', () => ({
    sendEmail: jest.fn(() => Promise.resolve()),
}));

const { sendEmail } = require('./mailer');

describe('POST /api/send-email', () => {

  it('should send an email and return success', async () => {

    const res = await request(app).post('/api/send-email').send({
      to: toAddress,
      subject: strSubject,
      text: msg,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ success: true });
    expect(sendEmail).toHaveBeenCalledWith(
      toAddress,
      strSubject,
      msg
    );
  });

  it('should return 400 for missing all fields', async () => {
    const res = await request(app).post('/api/send-email').send({
      to: '',
      subject: '',
      text: '',
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

   it('should return 400 for missing To field', async () => {
        const res = await request(app).post('/api/send-email').send({
            to: '',
            subject: strSubject,
            text: msg,
        });

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('error');
  });

  it('should return 400 for missing Subject field', async () => {
        const res = await request(app).post('/api/send-email').send({
            to: toAddress,
            subject: '',
            text: msg,
        });

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('error');
  });

  it('should return 400 for missing Text field', async () => {
        const res = await request(app).post('/api/send-email').send({
            to: toAddress,
            subject: strSubject,
            text: '',
        });

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('error');
  });

  it('should handle email send errors', async () => {
    sendEmail.mockImplementationOnce(() =>
      Promise.reject(new Error('SMTP error'))
    );

    const res = await request(app).post('/api/send-email').send({
      to: toAddress,
      subject: 'Error Case',
      text: 'This will fail.',
    });

    expect(res.statusCode).toBe(500);
    expect(res.body).toHaveProperty('error', 'Failed to send email');
  });
});