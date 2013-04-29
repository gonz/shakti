#!/usr/bin/env python
# -*- coding: utf-8 -*-
import mimetypes
import urllib
from werkzeug.serving import run_simple
from werkzeug.wrappers import Request, Response
from werkzeug.routing import Map, Rule
from werkzeug.exceptions import HTTPException


DEFAULT_CONFIG = {
    'API_URI': 'http://localhost:9002',
}


class App(object):
    def __init__(self, config):
        self.api_uri = config['API_URI']
        self.url_map = Map([
            Rule('/<path:path>', endpoint='serve_path'),
            Rule('/api/<path:path>', endpoint='proxy'),
        ])

    def dispatch_request(self, request):
        adapter = self.url_map.bind_to_environ(request.environ)
        try:
            endpoint, values = adapter.match()
            return getattr(self, 'on_' + endpoint)(request, **values)
        except HTTPException, e:
            return e

    def wsgi_app(self, environ, start_response):
        request = Request(environ)
        response = self.dispatch_request(request)
        return response(environ, start_response)

    def __call__(self, environ, start_response):
        return self.wsgi_app(environ, start_response)

    def error_404(self):
        return Response('<h1>404 Not Found</h1>',
                        mimetype='text/html', status=404)

    def on_serve_path(self, request, path):
        try:
            content = file(path, 'r').read()
        except:
            return self.error_404()
        mimetype = mimetypes.guess_type(path)[0]
        return Response(content, status=200, mimetype=mimetype)

    def on_proxy(self, request, path):
        uri = '%s/%s' % (self.api_uri, path)
        if request.query_string:
            uri = '?'.join([uri, request.query_string])

        _request = urllib.urlopen(uri)
        mimetype = _request.headers.get('Content-Type', 'text/html')
        mimetype = mimetype.split(';')[0].strip()

        return Response(_request.read(), status=_request.getcode(),
                        mimetype=mimetype)


def create_app(config=None):
    if config is None:
        config = DEFAULT_CONFIG
    return App(config=config)


if __name__ == '__main__':
    app = create_app()
    run_simple('0.0.0.0', 8080, app, use_reloader=True, use_debugger=True)
