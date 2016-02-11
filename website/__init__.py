from flask import Flask, render_template, url_for
import os
import smtplib
from flask.ext.bower import Bower

app = Flask(__name__)
Bower(app)

#####################################
### Routes
#####################################

@app.route('/', methods=['GET', 'POST'])
def index():
    return render_template('index.html')

@app.route('/calendar', methods=['GET', 'POST'])
def calendar():
	return render_template('calendar.html')

@app.route('/about', methods=['GET', 'POST'])
def about():
	return render_template('about.html')

if __name__ == '__main__':
    app.run(debug=True,port=3000)
