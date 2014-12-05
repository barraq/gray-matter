/*!
 * gray-matter <https://github.com/assemble/gray-matter>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs');
var should = require('should');
var matter = require('../benchmark/code/while.js');


describe('Read from strings:', function () {
  it('should extract YAML front matter', function () {
    var actual = matter('---\nfoo: bar\n---');
    actual.should.have.property('data');
    actual.should.have.property('content');
    actual.should.have.property('orig');
    actual.data.should.have.property('foo');
    actual.data.foo.should.equal('bar');
  });
  it('should extract YAML front matter and content', function () {
    var fixture = '---\nfoo: bar\nversion: 2\n---\n\n<span class="alert alert-info">This is an alert</span>\n';
    var actual = matter(fixture);
    actual.should.have.property('data', {foo: 'bar', version: 2});
    actual.should.have.property('content', '<span class="alert alert-info">This is an alert</span>');
    actual.should.have.property('orig');
  });

  it('should use custom delimiters.', function () {
    var fixture = '~~~\nfoo: bar\nversion: 2\n~~~\n\n<span class="alert alert-info">This is an alert</span>\n';
    var actual = matter(fixture, {delims: ['~~~', '~~~']});
    actual.should.have.property('data', {foo: 'bar', version: 2});
    actual.should.have.property('content', '<span class="alert alert-info">This is an alert</span>');
    actual.should.have.property('orig');
  });
});
