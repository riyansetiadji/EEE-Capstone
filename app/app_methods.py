import config
def allowed_file(filename):
    allowed_extensions = config.DevelopmentConfig.ALLOWED_EXTENSIONS 
    return '.' in filename and filename.rsplit('.', 1)[1] in allowed_extensions
