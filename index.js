#!/usr/bin/env node

process.stdin.resume();
process.stdin.setEncoding('utf8');

// take a data stream and split it at newlines
var buffer = '',
i = 0;
process.stdin.on('data', function(chunk) {
  var lines = (buffer+chunk.toString()).split('\n');
  buffer = lines.pop();
  lines.forEach(filter);
});

process.stdin.on('end', function() {
  if (buffer.length > 0) {
    filter(buffer);
  }
  report();
});

var lines = {};

function filter(line) {
  // remove the date
  line = line.replace(/^\[[^\]]*\] /, '');

  // filter out common lines
  if(/Processing config/.test(line) ||
     /Server built/.test(line) ||
     /suEXEC/.test(line) ||
     /favicon\.ico$/.test(line) ||
     /^\[info\] mod_unique_id:/.test(line)
    ) return;

  // remove uniquely identifying information
  var key = line.replace(/\[client [^\]]*\] /, '')
                .replace(/\[unique_id [^\]]*\]/, '')
                .replace(/child pid [0-9]*/, 'child pid X')
                .replace(/child process [0-9]*/, 'child process X')
                .replace(/pid=[0-9]+/, 'pid=X');

  lines[key] = (lines[key] ? lines[key]+1 : 1);
}

function report() {
  var i, key, top = Object.keys(lines).sort(function(a, b) {
    return -(lines[a] - lines[b]);
  });

  for(i = 0; i < top.length && i < 100; i++) {
    key = top[i];
    console.log(lines[key] + ' ' + key);
  }
}
