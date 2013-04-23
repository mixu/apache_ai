# apache_ai

A port of Ivan Ristic's [error_log_ai](http://fossies.org/linux/www/apache-tools.tar.gz:a/apache-tools/apache-tools/error_log_ai) to Node.

This script summarizes Apache error logs by removing unnecessary uniquely identifying information and then counting the lines.

## Installing

    npm install -g apache_ai

or git clone, but then you need to invoke `node index.js`.

## Usage

For example:

    cat /var/log/httpd/error_log | node index.js

Or if you installed this globally using `npm install -g apache_ai`:

    cat error_log | apache_ai

Produces something like this:

    6566 [error] PHP Strict Standards:  Non-static method FooBar::entities_decode() should not be called statically, assuming $this from incompatible context in /var/www/abc/foobar.inc on line 8488
    5189 [error] PHP Strict Standards:  Non-static method FooBar::percent_encoding_normalization() should not be called statically in /var/www/abc/foobar.inc on line 8661
    2858 [error] PHP Deprecated:  Function eregi_replace() is deprecated in /var/www/abc/style.php on line 38
