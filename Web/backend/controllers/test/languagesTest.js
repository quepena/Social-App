import Language from "../../models/languageModel.js";
import chai from 'chai'
import chaiHttp from 'chai-http'
import should from 'should';
import { expect } from "chai";
import server from '../../server.js'

chai.use(chaiHttp)
describe("Language API", () => {

    describe('Languages', () => {
        beforeEach((done) => {
            Language.deleteOne({}, (err) => {
                done();
            });
        });

    });

    describe('/POST a language', () => {
        it('it should post a new language', (done) => {
            let language = {
                languageName: "Korean",
                flagUrl: "27718288"
            }
            chai.request('http://127.0.0.1:5000')
                .post('/api/languages/')
                .send(language)
                .end((err, res) => {
                    res.status.should.be.equal(201);
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.a.property('languageName');
                    expect(res.body).to.have.a.property('flagUrl');
                    done();
                });
        });
    });

    describe('/GET languages', () => {
        it('it should GET all the languages', (done) => {
            chai.request('http://127.0.0.1:5000')
                .get('/api/languages')
                .end((err, res) => {
                    res.status.should.be.equal(200);
                    expect(res.body).to.be.an('array').that.is.empty;
                    done();
                });
        });
    });
});