import { exec } from 'child_process';

// Promises the simple shell-output of the given command
export function execShell(command: string, ignoreStderrOutput = false): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) reject(new Error(`Could not exec command "${command}": "${error}"`));
      if (stderr.length && !ignoreStderrOutput) reject(new Error(`Command "${command}" produced output on stderr: "${stderr}"`));
      if (typeof stdout !== 'string') reject(new Error(`Command "${command}" produced non-string stdout: "${stdout}"`));
      resolve(stdout);
    });
  });
}
