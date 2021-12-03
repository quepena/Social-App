import City from "../../models/cityModel.js";
import Country from "../../models/countryModel.js";
import chai from 'chai'
import chaiHttp from 'chai-http'
import should from 'should';
import { expect } from "chai";
import server from '../../server.js'

chai.use(chaiHttp)
describe("City API", () => {

    describe('Cities', () => {
        beforeEach((done) => {
            City.deleteOne();
            Country.deleteOne({}, (err) => {
                done();
            })
        });
    });

    let country = new Country({
        countryName: "South Korea"
    });

    describe('/POST city', () => {
        it('it should post a new city', (done) => {
            chai.request('http://127.0.0.1:5000')
                .post('/api/countries')
                .send(country)
            let city = new City({
                cityName: "Seoul",
                countryId: country.id
            });
            chai.request('http://127.0.0.1:5000')
                .post('/api/cities/' + country.id)
                .send(city)
                .end((err, res) => {
                    res.status.should.be.equal(201);
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.a.property('cityName');
                    done();
                });
        });

        describe('/GET cities', () => {
            it('it should GET all the cities for a country', (done) => {
                chai.request('http://127.0.0.1:5000')
                    .get('/api/cities/' + country.id)
                    .end((err, res) => {
                        res.status.should.be.equal(200);
                        expect(res.body).to.be.an('array').that.is.empty;
                        done();
                    });
            });
        });
    });
})