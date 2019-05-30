const app = require('../app');
const expect = require('chai').expect;
const request = require('supertest');

const apps = require('../playstoreApps.js');

describe('GET /apps', () => {
    it('should return the full list of apps if no queries', () => {   
        const fullList = apps;

        return request(app)
            .get('/apps')
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body.length).to.equal(fullList.length);
                expect(res.body).to.eql(fullList);
            })
    })

    it('should sort the list alphabetically by App', () => {
        const sortedList = apps.sort((a, b) => {
            return a['App'] > b['App'] ? 1 : a['App'] < b['App'] ? -1 : 0;
        });

        return request(app)
            .get('/apps')
            .query({sort: 'App'})
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body.length).to.equal(sortedList.length);
                expect(res.body).to.eql(sortedList);
            })

    })

    it('should sort the list numerically by Rating ascending', () => {
        const sortedList = apps.sort((a, b) => {
            return a['Rating'] > b['Rating'] ? 1 : a['Rating'] < b['Rating'] ? -1 : 0;
        });

        return request(app)
            .get('/apps')
            .query({sort: 'Rating'})
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body.length).to.equal(sortedList.length);
                expect(res.body).to.eql(sortedList);
            })

            
    })

    it('should filter the list if a genre is provided', () => {
        const filteredList = apps.filter(app =>
            app
                .Genres
                .includes('Action'));
        
        return request(app)
            .get('/apps')
            .query({genre: 'Action'})
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body.length).to.equal(filteredList.length);
                expect(res.body).to.eql(filteredList);
            })
    })
})