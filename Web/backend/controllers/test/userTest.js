import User from "../../models/userModel.js";
import chai from 'chai'
import chaiHttp from 'chai-http'
import should from 'should';
import { expect } from "chai";
import server from '../../server.js'
import generateToken from '../../utils/generateToken.js';

chai.use(chaiHttp)
describe("User API", () => {

    describe('Users', () => {
        beforeEach((done) => {
            User.deleteOne({}, (err) => {
                done();
            });
        });

        // describe('/GET users', () => {
        //     it('it should GET all the posts', (done) => {
        //         chai.request('http://127.0.0.1:5000')
        //             .get('/api/users/users')
        //             .end((err, res) => {
        //                 res.status.should.be.equal(200);
        //                 expect(res.body).to.be.an('array').that.is.empty;
        //                 done();
        //             });
        //     });
        // });
    });

    describe('/POST user', () => {
        it('it should post a new user', (done) => {
            let user = {
                username: "user123", 
                password: "user123", 
                knownAs: "Jeremy", 
                nativeLanguage: "French",
                isLearning: "German", 
                dateOfBirth: "2001-09-08", 
                gender: "Male", 
                country: "France",
                city: "Paris", 
                introduction: "Hi, I'm Jeremy"
            }
            chai.request('http://127.0.0.1:5000')
                .post('/api/users')
                .send(user)
                .end((err, res) => {
                    res.status.should.be.equal(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.a.property('_id');
                    expect(res.body).to.have.a.property('username');
                    expect(res.body).to.have.a.property('password');
                    expect(res.body).to.have.a.property('knownAs');
                    expect(res.body).to.have.a.property('nativeLanguage');
                    expect(res.body.password).to.have.lengthOf.above(6);
                    expect(res.body).to.have.a.property('isLearning');
                    expect(res.body.nativeLanguage).to.not.equal(res.body.isLearning)
                    expect(res.body).to.have.a.property('dateOfBirth');
                    expect(res.body).to.have.a.property('gender');
                    expect(res.body).to.have.a.property('country');
                    expect(res.body).to.have.a.property('city');
                    expect(res.body).to.have.a.property('introduction');
                    expect(res.body).to.have.a.property('token');
                    done();
                });
        });
    });

    describe('/POST user', () => {
        it('it should not post a new user - password shorter than 6 characters', (done) => {
            let user = {
                username: "user123", 
                password: "user", 
                knownAs: "Jeremy", 
                nativeLanguage: "French",
                isLearning: "German", 
                dateOfBirth: "2001-09-08", 
                gender: "Male", 
                country: "France",
                city: "Paris", 
                introduction: "Hi, I'm Jeremy"
            }
            chai.request('http://127.0.0.1:5000')
                .post('/api/users')
                .send(user)
                .end((err, res) => {
                    res.status.should.be.equal(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.a.property('_id');
                    expect(res.body).to.have.a.property('username');
                    expect(res.body).to.have.a.property('password');
                    expect(res.body).to.have.a.property('knownAs');
                    expect(res.body).to.have.a.property('nativeLanguage');
                    expect(res.body.password).to.have.lengthOf.above(6);
                    expect(res.body).to.have.a.property('isLearning');
                    expect(res.body.nativeLanguage).to.not.equal(res.body.isLearning)
                    expect(res.body).to.have.a.property('dateOfBirth');
                    expect(res.body).to.have.a.property('gender');
                    expect(res.body).to.have.a.property('country');
                    expect(res.body).to.have.a.property('city');
                    expect(res.body).to.have.a.property('introduction');
                    expect(res.body).to.have.a.property('token');
                    done();
                });
        });
    });

    // describe('/GET user', () => {
    //     it('it should GET all the users', (done) => {
    //         chai.request('http://127.0.0.1:5000')
    //             .get('/api/users/users')
    //             .end((err, res) => {
    //                 res.status.should.be.equal(200);
    //                 expect(res.body).to.be.an('array').that.is.not.empty;
    //                 done();
    //             });
    //     });
    // });
});