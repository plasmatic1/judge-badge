import time
import requests
import threading
from queue import Queue
from settings import DMOJ_REQ_INTERVAL


class RequestHandler:
    def __init__(self):
        self.in_q = Queue()
        self.out_q = Queue()
        self._thread = threading.Thread(name='request-thread', target=self.check_queue)
        self._thread.start()

    def check_queue(self):
        while True:
            handle = self.in_q.get()
            try:
                rating = requests.get(f'https://dmoj.ca/api/v2/user/{handle}').json()['data']['object']['rating']
                self.out_q.put((rating, None))
            except Exception as e:
                self.out_q.put((None, e))

            time.sleep(DMOJ_REQ_INTERVAL)

    def get_rating(self, handle):
        self.in_q.put(handle)
        rating, err = self.out_q.get()
        if err: raise err
        return rating


def rating_color(rating):
    if rating < 1000:
        return 'grey'
    elif rating < 1200:
        return 'green'
    elif rating < 1500:
        return 'blue'
    elif rating < 1800:
        return 'purple'
    elif rating < 2200:
        return 'yellow'
    elif rating < 3000:
        return 'red'
    return 'black'
