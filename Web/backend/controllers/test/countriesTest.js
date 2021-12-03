import Country from "../../models/countryModel.js";
import chai from 'chai'
import chaiHttp from 'chai-http'
import should from 'should';
import { expect } from "chai";
import server from '../../server.js'

chai.use(chaiHttp)
describe("Country API", () => {

    describe('Countries', () => {
        beforeEach((done) => {
            Country.deleteMany({}, (err) => {
                done();
            });
        });
        
        describe('/GET countries', () => {
            it('it should GET all the countries', (done) => {
                chai.request('http://127.0.0.1:5000')
                    .get('/api/countries/')
                    .end((err, res) => {
                        res.status.should.be.equal(200);
                        expect(res.body).to.be.an('array').that.is.empty;
                        done();
                    });
            });
        });

    });

    describe('/POST country', () => {
        it('it should post a new country', (done) => {
            let country = new Country({
                countryName: "Argentina"
            })
            chai.request('http://127.0.0.1:5000')
                .post('/api/countries/')
                .send(country)
                .end((err, res) => {
                    res.status.should.be.equal(201);
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.a.property('countryName');
                    done();
                });
        });
    });
    
    describe('/GET country', () => {
        it('it should GET all the countries', (done) => {
            chai.request('http://127.0.0.1:5000')
                .get('/api/countries/')
                .end((err, res) => {
                    res.status.should.be.equal(200);
                    expect(res.body).to.be.an('array').that.is.not.empty;
                    done();
                });
        });
    });
})