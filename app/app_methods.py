import config
import music21

def allowed_file(filename):
    """
    Check if uploaded file is allowed
    """
    allowed_extensions = config.DevelopmentConfig.ALLOWED_EXTENSIONS 
    return '.' in filename and filename.rsplit('.', 1)[1] in allowed_extensions

def convert_wav_to_stream(wav):
    """
    Convert WAV file to music21 stream
    """
    try:
        return music21.audioSearch.transcriber.monophonicStreamFromFile(wav)
    except:
        return "Unable to convert WAV file to music21 stream"
    

def convert_stream_to_midi(stream):
    """
    Convert music21 stream to MIDI file
    """
    try:
        return music21.midi.translate.streamToMidiFile(stream)
    except:
        return "Unable to convert music21 stream to MIDI"
