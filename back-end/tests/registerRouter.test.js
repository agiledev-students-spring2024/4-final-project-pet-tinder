const chai = require("chai")
const chaiHttp = require("chai-http")
const app = require("../app")
const expect = chai.expect

chai.use(chaiHttp) 

describe("Backend API - POST /register", () => {
    describe("Successful Registration", () => {
        it("it should successfully register a new user")
        const new_user = {
            email: "test@test",
            password: "test",
        };

        chai 
            .request(app)
            .get("/register")
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(201);
                expect(res.body).to.have.property("message", "You have succefully logged in!");
                done();
            });
    });

    describe("Failed Registration Because Missing Email", () => {
        it("it should give an error if the email is missing", (done) => {
            const invalid_user = {
                password: "test",
            };
    
            chai 
                .request(app)
                .post("/register")
                .send(invalid_user)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(500);
                    expect(res.body).to.have.property("message", "ERROR: Cannot register user. Missing email.");
                    done();
                });
        });
    });


    describe("Failed Registration Because Missing Password", () => {
        it("it should give an error if the email is missing", (done) => {
            const invalid_user = {
                email: "test@test",
            };
    
            chai 
                .request(app)
                .post("/register")
                .send(invalid_user)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(500);
                    expect(res.body).to.have.property("message", "ERROR: Cannot register user. Missing password.");
                    done();
                });
        });
    });


    describe("Failed Registration Because User Already Exists", () => {
        it("it should give an error if the user tries to register again under the same email. Please login instead", (done) => {
            const existing_user = {
                email: "test@test",
            };
    
            chai 
                .request(app)
                .post("/register")
                .send(existing_user)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(500);
                    expect(res.body).to.have.property("message", "ERROR: Cannot register user. A user already exists under that email");
                    done();
                });
        });
    });
    

});