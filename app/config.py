"""
Config File
"""

class Config(object):
    PORT = 8090
    SECRET_KEY = 'SeCReT_KeY'

class DevelopmentConfig(Config):
    """
    For Development
    """
    DEBUG = True
    UPLOAD_FOLDER = './upload'
    ALLOWED_EXTENSIONS = set(['txt', 'png', 'jpg', 'jpeg', 'wav', 'mp3', 'mid'])
    MAX_CONTENT_LENGTH = 10 * 1024 * 1024
