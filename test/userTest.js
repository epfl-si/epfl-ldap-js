var assert = require('assert');

describe('User::get', function () {

    it('getUserBySciper should get Kermi La Grenouille', function (done) {
        this.fullLdapContext.users.getUserBySciper(133134, function (err, data) {
            assert.equal(data.displayName, "Kermi La Grenouille");
            done();
        });
    });

    it('getUserBySciper should handle users with two emails', function(done) {
        this.fullLdapContext.users.getUserBySciper(133134, function (err, data) {
            assert.ok(data.emails.length === 2, "User have 2 emails");
            done();
        });
    });

    it('getUserBySciper should return correct email length', function (done) {
        this.fullLdapContext.users.getUserBySciper(169419, function (err, data) {
            assert.ok(data.emails[0].length === 23, "Email adresse has the correct length");
            done();
        });
    });

    it('getUserByName should find Kermi La Grenouille', function (done) {
        this.fullLdapContext.users.getUserByName('Kermi La Grenouille', function (err, data) {
            assert.equal(data.displayName, 'Kermi La Grenouille');
            done();
        });
    });

    it('getUserByPhone should find 169419', function (done) {
        this.fullLdapContext.users.getUserByPhone('+41 21 6935455', function (err, data) {
            assert.equal(data.sciper, '169419');
            done();
        });
    });

    it('getUserByPhone should find 169419', function (done) {
        this.fullLdapContext.users.getUserByPhone('35455', function (err, data) {
            assert.equal(data.sciper, '169419');
            done();
        });
    });

    // Watch out: user with guest account on their EPFL email can appear first.
    it('getUserByMail should find 169419', function (done) {
        this.fullLdapContext.users.getUserByMail('nicolas.borboen@epfl.ch', function (err, data) {
            assert.equal(data.sciper, '169419');
            done();
        });
    });

});

describe('User::search', function () {

    it('searchUserByName should search Kermi La Grenouille', function (done) {
        this.fullLdapContext.users.searchUserByName('Kermi', function (err, data) {
            assert.equal(data[0].displayName, 'Kermi La Grenouille');
            done();
        });
    });

    it('searchUserByPhone should return 169419', function (done) {
        this.fullLdapContext.users.searchUserByPhone('35455', function (err, data) {
            assert.equal(data[0].sciper, '169419');
            done();
        });
    });

    it('searchUserByUnitAcronym should search all members of ISAS-G*, including Kermi', function (done) {
        this.fullLdapContext.users.searchUserByUnitAcronym('ISAS-G', function (err, data) {
            let k = data.filter(obj => {
                return obj.displayName === 'Kermi La Grenouille';
            })
            assert.equal(k[0].displayName, 'Kermi La Grenouille');
            done();
        });
    });

});

describe('Users::get', function () {

    it('getUsersBySciper should get Kermi La Grenouille', function (done) {
        this.fullLdapContext.users.getUsersBySciper(133134, function (err, data) {
            assert.equal(data[0].displayName, 'Kermi La Grenouille');
            done();
        });
    });

    it('getUsersByName should get Kermi La Grenouille', function (done) {
        this.fullLdapContext.users.getUsersByName('Kermi La Grenouille', function (err, data) {
            assert.equal(data[0].displayName, 'Kermi La Grenouille');
            done();
        });
    });

    it('getUsersByPhone should get 169419', function (done) {
        this.fullLdapContext.users.getUsersByPhone('35455', function (err, data) {
            assert.equal(data[0].sciper, '169419');
            done();
        });
    });

    it('getUsersByMail should find 169419', function (done) {
        this.fullLdapContext.users.getUsersByMail('nicolas.borboen@epfl.ch', function (err, data) {
            assert.equal(data[0].sciper, '169419');
            done();
        });
    });

    it('getUsersByUnitAcronym should search all members of ISAS-GE, including Kermi', function (done) {
        this.fullLdapContext.users.getUsersByUnitAcronym('ISAS-GE', function (err, data) {
            let k = data.filter(obj => {
                return obj.displayName === 'Kermi La Grenouille';
            })
            assert.equal(k[0].displayName, 'Kermi La Grenouille');
            done();
        });
    });

});
