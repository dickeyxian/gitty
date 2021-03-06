var HOME    = process.env.HOME;
var should  = require('should');
var Command = require('../lib/command');

describe('Command', function() {

  var command = null;

  describe('@constructor', function() {

    it('should create an instance', function(done) {
      command = new Command(HOME, '', ['--help']);
      command.should.be.instanceOf(Command);
      done();
    });

    it('should save the working path', function(done) {
      command.repo.path.should.equal(HOME);
      done();
    });

    it('should assemble the command string', function(done) {
      command.command.should.equal('git  --help ');
      done();
    });

    it('should use the supplied gitpath from the repo object', function() {
      var cmd = new Command({ gitpath: '/path/to/git' });
      cmd.repo.gitpath.should.equal('/path/to/git');
    });

  });

  describe('.exec()', function() {

    it('should execute the command asynchronously', function(done) {
      command.exec(function(err, stdout, stderr) {
        should.exist(stdout);
        done();
      });
    });

    it('should use the repo gitpath for executing the command', function(done) {
      var cmd = new Command({ path: HOME, gitpath: '/path/to/git' });
      cmd.exec(function(err, stderr, stdout) {
        should.exist(err);
        done();
      });
    });

  });

  describe('.execSync()', function() {

    it('should execute the command synchronously', function(done) {
      should.exist(command.execSync());
      done();
    });

    it('should use the repo gitpath for executing the command', function(done) {
      var cmd = new Command({ path: HOME, gitpath: '/path/to/git' });
      try {
        cmd.execSync();
      } catch (err) {
        done();
      }
    });

  });

});
