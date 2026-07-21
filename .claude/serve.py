import functools
import http.server
import os
import socketserver

PORT = int(os.environ.get("PORT", "8765"))
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

Handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=ROOT)

with socketserver.TCPServer(("127.0.0.1", PORT), Handler) as httpd:
    print(f"Serving {ROOT} on port {PORT}")
    httpd.serve_forever()
