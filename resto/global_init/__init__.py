from flask import Flask
from resto.plugin import GoogleMap

app = Flask(__name__, template_folder='../templates', static_folder="../static", static_url_path='')
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

googleapi = GoogleMap(app)