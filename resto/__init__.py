from flask import Flask, render_template


app = Flask(__name__, static_url_path='')
app.config.from_object('config')

jinja_options = app.jinja_options.copy()

jinja_options.update(dict(
    block_start_string='{%',
    block_end_string='%}',
    variable_start_string='{[',
    variable_end_string=']}',
    comment_start_string='<#',
    comment_end_string='#>'
))
app.jinja_options = jinja_options


@app.route('/')
@app.route('/map', endpoint='map')
@app.route('/restaurant', endpoint='restaurant')
@app.route('/analytics', endpoint='analytics')
def index():
    return render_template('index.html')
