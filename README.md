# Cebu Restaurant App

Application for Restaurant Analytics in Cebu

## Web Development Training

Built using Flask, AngularJS and Google Maps Platform

### Tools Requirements

- [Python3.6+](https://www.python.org/downloads/)
- [Flask](http://flask.pocoo.org/)
- Python Pip _comes with python_
- [Python virtualenv](http://docs.python-guide.org/en/latest/dev/virtualenvs/)
- [AngularJS](https://angularjs.org/)
- [gulp-js](https://gulpjs.com/)
- [Google Maps Platform](https://cloud.google.com/maps-platform)

### Environment Setup

- Setup python virtualenv
```
$ virtualenv env -p <python executable for python3.6>
```

### Environment Variable
```
export BIND_IP=127.0.0.1
export BIND_PORT=5000
export DEBUG=True
export GOOGLE_API_KEY=API_KEY
export GOOGLE_MAP_API=https://maps.googleapis.com/maps
```
- Activate the virtualenv
```
# MacOS / Linux
$ source env/bin/activate
# Windows
> env\Scripts\activate
```

- Install Python Packages
```
(env)$ pip install -r requirements.txt
pip install --upgrade git+https://github.com/m-wrzr/populartimes
```

### Running your local server

- activate python virtualenv
- run flask server
```
$ python application.py
```
