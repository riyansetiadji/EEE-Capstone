import os
import config
import app_methods
from flask import Flask, render_template, request, redirect, url_for, flash
from werkzeug.utils import secure_filename

app = Flask(__name__)
app.config.from_object(config.DevelopmentConfig)

@app.route('/')
def index():
    return "Hello World"

@app.route('/dashboard')
def dashboard():
    return render_template('index.html')

@app.route('/upload', methods=['GET', 'POST'])
def upload_file():
    """
    Basic Upload File Test
    """
    #POST
    if request.method == 'POST':
        #Check if the post request has the file part
        if 'file' not in request.files:
            flash('No File Found', "error")
            return render_template('upload.html')

        #Reading File
        file = request.files['file']
        
        #Check if browser is sending an empty part without filename
        if file and file.filename == '':
            flash('No File Found', "error")
            return render_template('upload.html')
        
        #Check if extension is allowed 
        if app_methods.allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            flash('Upload Successful', "success")
            stream = app_methods.convert_wav_to_stream("upload/"+file.filename)
            midi = app_methods.convert_stream_to_midi(stream)
            return render_template('upload.html', midi=midi)
    #GET
    if request.method == 'GET':
        return render_template('upload.html')

if __name__ == "__main__":
    app.run()
