import os
from dmoj_utils import RequestHandler, rating_color
from flask import Flask, redirect
from urllib.parse import quote_plus
from settings import DMOJ_ICON_ESC, DMOJ_ESC

app = Flask(__name__)
request_handler = RequestHandler()


@app.route('/<path>')
def hello_world(path):
    handle, ext = os.path.splitext(path)
    if ext != '.svg':
        return 'Requested file must be svg format', 404

    try:
        rating = request_handler.get_rating(handle)
        return redirect(f'https://badgen.net/badge/{DMOJ_ESC}/{quote_plus(str(rating))}/{rating_color(rating)}?'
                        f'icon={DMOJ_ICON_ESC}')
    except KeyError:
        return f'Could not get rating of handle {handle}', 500


if __name__ == '__main__':
    app.run()
