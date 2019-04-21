import requests
import populartimes
from copy import deepcopy


class GoogleMap(object):
    def __init__(self, app):
        self.__url = app.config['GOOGLE_MAP_API']
        self.__key = app.config['GOOGLE_API_KEY']
        self.__resource = {
            'place.search': '/api/place/textsearch/json',
            'place.photo': '/api/place/photo',
            'place.nearby': '/api/place/nearbysearch/json'
        }

    def __clean_args(self, all_data):
        data = deepcopy(all_data)
        for key in all_data:
            if data.get(key) is None:
                data.pop(key)

        return data

    def get(self, resource, args):
        if resource in self.__resource:
            url = "{}{}".format(self.__url, self.__resource.get(resource, ''))
            args['key'] = self.__key
            args = self.__clean_args(args)
            res = requests.get(url, params=args)
            retval = res.json()
            retval['key'] = self.__key
        else:
            retval = populartimes.get_id(self.__key, args['place_id'])

        return retval
