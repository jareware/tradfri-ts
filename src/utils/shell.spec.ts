import 'mocha';
import { execShell } from './shell';
import { assert } from 'chai';

describe('utils/shell', () => {

  it('works with success', () =>
    execShell('echo hello').then(
      out => assert.equal(out, 'hello\n')
    )
  );

  it('works with failure', () =>
    execShell('false').then(
      () => assert.fail(),
      err => assert.equal(err.message, 'Could not exec command "false": "Error: Command failed: false\n"')
    )
  );

  it('works with failure on stderr', () =>
    execShell('>&2 echo failure').then(
      () => assert.fail(),
      err => assert.equal(err.message, 'Command ">&2 echo failure" produced output on stderr: "failure\n"')
    )
  );

  it('ignores stderr when requested', () =>
    execShell('>&2 echo no failure', true).then(
      out => assert.equal(out, '') // nothing on stdout, but no rejection, either
    )
  );

});