from resto.global_init import googleapi


class Place(object):
    def __init__(self, args):
        self.__resource = 'place.search'
        self.__api = googleapi
        self.__args = args

    def get(self):
        self.__data = self.__api.get(self.__resource, self.__args)
        return self.__data


class Nearby(object):
    def __init__(self, args):
        self.__resource = 'place.nearby'
        self.__api = googleapi
        self.__args = args

    def get(self):
        self.__data = self.__api.get(self.__resource, self.__args)
        return self.__data


class Popular(object):
    def __init__(self, args):
        self.__resource = 'place.popular'
        self.__api = googleapi
        self.__args = args

    def get(self):
        self.__data = self.__api.get(self.__resource, self.__args)
        return self.__data
