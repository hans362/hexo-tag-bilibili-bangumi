'use strict';

const fs = require('hexo-fs'),
    util = require('hexo-util'),
    log = require('hexo-log')({ name: "hexo-tag-bangumi", debug: false }),
    path = require('path'),
    srcDir = path.dirname(require.resolve('bilibili-bangumi-js')).split('/api')[0] + '/dist',
    scriptDir = '/js/',
    styleDir = '/css/',
    files = [
        ['bilibili-bangumi.css', styleDir],
        ['bilibili-bangumi.js', scriptDir],
    ];

var conf = hexo.config['hexo-tag-bangumi'] || {},
    tbIns = [];

if (!conf.cdn) {
    files.forEach(item => {
        var destPath = item[1], filePath = path.join(srcDir, item[0]);
        if (item[1] === scriptDir) {
            destPath = conf.js_path || item[1];
        } else if (item[1] === styleDir) {
            destPath = conf.css_path || item[1];
        }
        fs.access(filePath, (fs.constants || fs).R_OK, (err) => {
            if (err) {
                log.info(item[0] + ' is not found in this version of Bilibili-Bangumi-JS, skip it.');
            } else {
                hexo.extend.generator.register(path.posix.join(destPath, item[0]), (_) => {
                    return {
                        path: path.relative(hexo.config.root, path.posix.join(destPath, item[0])),
                        data: function () {
                            return fs.createReadStream(filePath);
                        }
                    }
                });
                tbIns.push(path.posix.join(destPath, item[0]));
            }
        })
    })
}

hexo.extend.filter.register('after_render:html', (str, data) => {
    if (str.includes('</html>') && str.includes('class="bgm-container"')) {
        var target = conf.cdn || tbIns,
            s = str;
        target.forEach(item => {
            if (item.endsWith('.css')) {
                var tag = util.htmlTag('link', { rel: 'stylesheet', type: 'text/css', href: item });
                s = s.replace(/<\/head>/, tag + '</head>');
            } else if (item.endsWith('.js')) {
                //Do nothing.
            } else {
                log.info('Unknown file type of Bilibili-Bangumi-JS file:' + item);
            }
        })
        return s;
    }
    return str;
})

// {% bangumi key=value ... %}

hexo.extend.tag.register('bangumi', function (args) {
    var raw = util.htmlTag('script', { src: 'https://cdn.jsdelivr.net/npm/jquery@3.3.1' }, ''),
        vmid = '',
        apiUrl = '';
    for (var i in args) {
        var k = args[i].split('=')[0],
            v = args[i].split('=')[1];
        if (k == 'vmid') vmid = v;
        if (k == 'apiUrl') apiUrl = v;
    }
    raw += '<script>var apiUrl = "' + apiUrl + '";var userId = "' + vmid + '";</script>';
    var target = conf.cdn || tbIns;
    target.forEach(item => {
        if (item.endsWith('.css')) {
            //Do nothing.
        } else if (item.endsWith('.js')) {
            var tag = util.htmlTag('script', { src: item }, '');
            raw += tag;
        } else {
            log.info('Unknown file type of Bilibili-Bangumi-JS file:' + item);
        }
    })
    raw += '<div class="bgm-container"><div class="bgm-collection" id="bgm-collection"><img style="margin: 0 auto;" src="https://cdn.jsdelivr.net/gh/hans362/Bilibili-Bangumi-JS/assets/bilibili.gif"></div></div>';
    return raw;
})