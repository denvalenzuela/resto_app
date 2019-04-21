from flask_restful import Api
from .place import PlaceHandler, NearbyHandler, PopulartimesHandler


class MiddleWare(object):
    def __init__(self, app):
        self.__api = Api(app)

        # Places Endpoints
        self.__api.add_resource(PlaceHandler, '/api/place')
        self.__api.add_resource(NearbyHandler, '/api/nearby')
        self.__api.add_resource(PopulartimesHandler, '/api/populartimes')
