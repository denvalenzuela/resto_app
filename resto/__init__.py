from flask import render_template
from .global_init import app
from .middleware import MiddleWare


@app.route('/')
@app.route('/map', endpoint='map')
@app.route('/restaurant', endpoint='restaurant')
@app.route('/analytics', endpoint='analytics')
def index():
    return render_template('index.html', api_key=app.config['GOOGLE_API_KEY'])

api = MiddleWare(app)
