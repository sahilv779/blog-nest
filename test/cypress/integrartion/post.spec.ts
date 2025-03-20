import { Types } from 'mongoose';

describe('Posts API', () => {
  const apiUrl = 'http://localhost:3000';

  it('should create a post', () => {
    cy.request('POST', `${apiUrl}/posts`, {
      title: 'New Post',
      body: 'This is a new test post',
      userId: new Types.ObjectId(),
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.title).to.eq('New Post');
    });
  });

  it('should fetch all posts', () => {
    cy.request('GET', `${apiUrl}/posts`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
    });
  });

  it('should fetch a single post', () => {
    cy.request('GET', `${apiUrl}/posts/67bf98afbea6fdda3283cc8f`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body._id).to.eq('67bf98afbea6fdda3283cc8f');
      },
    );
  });

  it('should delete a post', () => {
    cy.request('DELETE', `${apiUrl}/posts/post123`).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
