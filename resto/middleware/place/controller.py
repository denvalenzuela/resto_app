from flask_restful import Resource, reqparse
from .model import Place, Nearby, Popular
import json


class PlaceHandler(Resource):
    def __init__(self):
        self.__reqparse = reqparse.RequestParser()
        self.__reqparse.add_argument('query', type=str)

        self.__args = self.__reqparse.parse_args()

    def get(self):
        this_place = Place(self.__args)
        retval = this_place.get()

        return retval


class NearbyHandler(Resource):
    def __init__(self):
        self.__reqparse = reqparse.RequestParser()
        self.__reqparse.add_argument('coordinates', type=str)
        self.__reqparse.add_argument('radius', type=int)
        self.__reqparse.add_argument('type', type=str)
        self.__reqparse.add_argument('keyword', type=str)
        self.__reqparse.add_argument('rankby', type=str)
        self.__reqparse.add_argument('pagetoken', type=str)

        self.__args = self.__reqparse.parse_args()

    def get(self):
        if self.__args.get('coordinates') is not None:
            self.__args['coordinates'] = json.loads(self.__args.get('coordinates'))
            self.__args['location'] = "{},{}".format(self.__args.get('coordinates')['lat'], self.__args.get('coordinates')['lng'])
            self.__args.pop('coordinates')

        if self.__args.get('keyword', "") == "":
            self.__args.pop('keyword')

        this_nearby = Nearby(self.__args)
        retval = this_nearby.get()

        return retval


class PopulartimesHandler(Resource):
    def __init__(self):
        self.__reqparse = reqparse.RequestParser()
        self.__reqparse.add_argument('place_id', type=str)

        self.__args = self.__reqparse.parse_args()

    def get(self):
        this_popular = Popular(self.__args)
        retval = this_popular.get()

        return retval
