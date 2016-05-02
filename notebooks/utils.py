import sys, librosa, midi
from aubio import source, onset


def get_onset_times(filepath, sr=22050, win_s = 512,
		method='default'):
	"""
	INPUT:
	filepath - path to audio file
	sr - sample rate
	win_s - fft window size
	method - see http://aubio.org/manpages/latest/aubionotes.1.html for methods offered

	OUTPUT:
	onset_times - array_type - times for when notes are believed to begin
	"""
	hop_s = win_s / 2           # hop size

	filename = filepath
	samplerate = sr

	#set up the aubio system calls
	s = source(filename, samplerate, hop_s)
	samplerate = s.samplerate

	o = onset(method, win_s, hop_s, samplerate)

	# list of onsets, in samples
	onsets = []

	# total number of frames read
	total_frames = 0
	while True:
		samples, read = s()
		if o(samples):
			#print "%f" % o.get_last_s()
			onsets.append(o.get_last())
		total_frames += read
		if read < hop_s: break

	#convert the onset samples to the corresponding time of occurrence and return
	return librosa.core.samples_to_time(onsets, sr=samplerate)


import re
WHITESPACE_REGEX = re.compile(r'\s+')
def extract_note_events(filename, **kwargs):
	"""
	Extracts MIDI pitch values and their durations

	Input:
	filename - the audio file from which to extract pitches
	**kwargs - parameters to pass to pitch extraction algorithm:

	This program follows the usual GNU command line syntax, with long options starting with two dashes (--). A summary of options is included below.

	-i, --input source
	Run analysis on this audio file. Most uncompressed and compressed are supported, depending on how aubio was built.
	-r, --samplerate rate
	Fetch the input source, resampled at the given sampling rate. The rate should be specified in Hertz as an integer. If 0, the sampling rate of the original source will be used. Defaults to 0.
	-B, --bufsize win
	The size of the buffer to analyze, that is the length of the window used for spectral and temporal computations. Defaults to 512.
	-H, --hopsize hop
	The number of samples between two consecutive analysis. Defaults to 256.
	-O, --onset method
	The onset detection method to use. See ONSET METHODS below. Defaults to 'default'.
	-t, --onset_threshold thres
	Set the threshold value for the onset peak picking. Typical values are typically within 0.001 and 0.900. Defaults to 0.1. Lower threshold values imply more onsets detected. Try 0.5 in case of over-detections. Defaults to 0.3.
	-p, --pitch method
	The pitch detection method to use. See PITCH METHODS below. Defaults to 'default'.
	-u, --pitch_unit unit
	The unit to be used to print frequencies. Possible values include midi, bin, cent, and Hz. Defaults to 'Hz'.
	-l, --pitch_tolerance thres
	Set the tolerance for the pitch detection algorithm. Typical values range between 0.2 and 0.9. Pitch candidates found with a confidence less than this threshold will not be selected. The higher the threshold, the more confidence in the candidates. Defaults to unset.
	-s, --silence sil
	Set the silence threshold, in dB, under which the pitch will not be detected. A value of -20.0 would eliminate most onsets but the loudest ones. A value of -90.0 would select all onsets. Defaults to -90.0.
	-j, --jack
	Use Jack input/output. You will need a Jack connection controller to feed aubio some signal and listen to its output.
	-h, --help
	Print a short help message and exit.
	-v, --verbose
	Be verbose.

	From:
	http://aubio.org/manpages/latest/aubionotes.1.html

	Output:
	pitches = [pitch (MIDI number), start_time, end_time for pitch in detected_pitches]
	"""
	import subprocess
	EXTRACTION_PROC = 'aubionotes'

	params = [EXTRACTION_PROC, filename]

	#let's add the command-line params
	for k, v in kwargs.iteritems():
		key = to_gnu_arg(k)
		params.append(key)
		params.append(v)

	params = [str(p) for p in params]

	aubio_output = subprocess.check_output(params)

	pitches = []
	for line in aubio_output.splitlines():
		line = line.strip()
		split_line = re.split(WHITESPACE_REGEX, line)
		if len(split_line) == 3:
			note, time_start, time_end = split_line
			pitch_entry = (int(float(note)), float(time_start), float(time_end))
			pitches.append(pitch_entry)

	return pitches


def abs_tick_to_time(tick, bpm=None, resolution=None):
	"""Converts tick to timestamp of note"""
	if bpm == None or resolution == None:
		raise ValueError('Invalid Parameters')

	"""(60 sec / 1 min) * (1 min / x beats) * (x beats / 1 tick) * (x ticks) = sec"""
	return 60.0 * tick / (bpm * resolution)

def time_to_abs_tick(timestamp, bpm=None, resolution=220, time_unit='sec'):
	"""Converts the elapsed time to the elapsed time in ticks for a given resolution

		Parameters:
			bpm - beats per minute of the song
		resolution - desired resolution of the midi file
		time_unit - ['sec', 'ms', 'min']

		timestamp - time event
	"""
	if bpm == None:
		raise ValueError('Expected bpm')

	supported_time_units = set(['sec', 'ms', 'min'])

	if time_unit not in supported_time_units:
		raise ValueError('Cannot handle {} unit'.format(time_unit))

	MIN_RES = 96
	if not (resolution >= MIN_RES):
		raise ValueError('Invalid resolution of {}'.format(MIN_RES))

	int_round = lambda x: int(round(x))

	if time_unit == 'sec':
		time_conv = 60
	elif time_unit == 'ms':
		time_conv = 60*1000
	elif time_unit == 'min':
		time_conv = 1

	tick = timestamp * bpm * resolution / time_conv

	return int_round(tick)

def note_events_to_midi_obj(note_events, bpm = None,
		note_event_time_unit='sec', resolution=220, **kwargs):
	"""
	note_events = [(pitch, t_on, t_off) for note in notes]
	resolution = resolution of midi file
	note_event_time_unit = time unit (e.g. sec, ms, us) of note_events object
	bpm = beats per minute
	
	OUTPUT:
	Equivalent midi object for note_events
	"""
	tick_relative = False
	VELOCITY = 50 #note velocity for midi
	# Pattern contains a list of tracks
	pattern = midi.Pattern(resolution=resolution, tick_relative=tick_relative)
	# Instantiate a MIDI Track (contains a list of MIDI events)
	track = midi.Track(tick_relative=tick_relative)
	# Append the track to the pattern
	pattern.append(track)

	for note, t_on, t_off in note_events:
		# Instantiate a MIDI note on event, append it to the track
		tick_on = time_to_abs_tick(t_on, bpm=bpm, resolution=resolution,
				time_unit=note_event_time_unit)

		tick_off = time_to_abs_tick(t_off, bpm=bpm, resolution=resolution,
				time_unit=note_event_time_unit)

		on = midi.NoteOnEvent(tick=tick_on, velocity=VELOCITY, pitch=note)
		track.append(on)
		# Instantiate a MIDI note off event, append it to the track
		off = midi.NoteOffEvent(tick=tick_off, pitch=note)
		track.append(off)

	# Add the end of track event, append it to the track
	eot = midi.EndOfTrackEvent(tick=1)
	# Print out the pattern
	pattern.make_ticks_rel()

	return pattern

def get_midi_obj(filename, resolution=220, **kwargs):
	"""
	Returns a sequence of midi (note, start-tick, end-tick) tuples.

	Resolution = midi resolution (default = 220)
	For parameters for note event extraction, see:
		extract_note_events.__doc__

	Routine description:
		Constructs a midi object based on the library here:
			https://github.com/vishnubob/python-midi

	0. Detect the tempo (i.e. bpm) of the song, as this is used in the time to tick conversion
	1. Creates the midi object using absolute time to absolute tick conversion (this is why tick_relative = False)
	2. Convert absolute ticks to relevant, which is more standard

	"""
	import librosa
	"""Constants"""
	TIME_UNIT = 'sec' #NOTE: we assume that extract_note_events returns note events where the time stamps are in seconds


	#TODO: Parallelize note_extraction and beat prediction
	#get list of note events i.e. [(<note>, <t_start>, <t_end>) for note, t_start, t_end in song]
	note_events = extract_note_events(filename, **kwargs)
	bpm = get_bpm(filename)

	return note_events_to_midi_obj(note_events, bpm=bpm, note_event_time_unit=TIME_UNIT,
			resolution=resolution)




def get_bpm(filename):
	import librosa
	"""see: https://bmcfee.github.io/librosa/generated/librosa.beat.estimate_tempo.html"""
	y, sr = librosa.load(filename)
	onset_env = librosa.onset.onset_strength(y, sr=sr)
	return librosa.beat.estimate_tempo(onset_env, sr=sr)

def midi_to_wav(midi_filename, **kwargs):
	import subprocess
	"""
	Routine description:
		Converts midi file to wav file and saves it to file indicated by param `o`

	See optional kwargs here:
		http://man.cx/timidity(1)

	"""

	EXTRACTION_PROC = 'timidity'
	MIDI_TO_WAVE_FLAG = '-Ow'

	params = [EXTRACTION_PROC, midi_filename, MIDI_TO_WAVE_FLAG]

	#let's add the command-line params
	for k, v in kwargs.iteritems():
		key = to_gnu_arg(k)
		params.append(key)
		params.append(v)

	return subprocess.check_output(params)

def to_gnu_arg(flag):
    "Converts kwargs to gnu C flags"
    flag = flag.replace('_', '-')
    return '-{}'.format(flag) if len(flag) == 1 else '--{}'.format(flag)

def extract_note_events_ms(filename, **kwargs):
	"""Returns note events with their corresponding (rounded-to-the-nearest) ms timestep"""
	note_events_sec = extract_note_events(filename, **kwargs)

	round_int = lambda x: int(round(x))
	return [(note, round_int(t_on * 1000), round_int(t_off * 1000)) for note, t_on, t_off in note_events_sec]

def midi_obj_to_waveform(midi_obj, **kwargs):
	"""
	Returns - (y, sr) where y is the synthesized waveform of midi_obj and sr is the sampling rate

	Routine description:
		Converts the midi object to a temp .wav file then loads it into mem with librosa, returning (y, sr) where sr is sampling rate
	"""
	import midi, librosa, subprocess, time, os

	#get unique file name
	unique_name = '.tmp_{}'.format(time.time())
	midi_filename = unique_name + '.mid'
	wav_filename = unique_name + '.wav'

	midi.write_midifile(midi_filename, midi_obj)
	midi_to_wav(midi_filename, o=wav_filename, **kwargs)

	y, sr = librosa.load(wav_filename)
	os.remove(midi_filename)
	os.remove(wav_filename)

	return (y, sr)

def midi_to_note_events(midi_obj):
	"""
	INPUT:
	python-midi object

	OUTPUT:
	[(note, on_tick, off_tick) for note in notes]
	"""
	import midi
	from operator import itemgetter

	#we want absolute on and off tick
	midi_obj.make_ticks_abs()

	#we need to match each NoteOnEvent with the note off event
	active_notes = {} #maps pitch to t_on

	event_set = set() #note, t_on, t_off

	is_on_note = lambda x: type(x) is midi.NoteOnEvent
	is_off_note = lambda x: type(x) is midi.NoteOffEvent

	for track in midi_obj:
		for event in track:
			if is_on_note(event):
				assert event.get_pitch() not in active_notes
				active_notes[event.get_pitch()] = event.tick
			elif is_off_note(event):
				assert event.get_pitch() in active_notes
				t_on = active_notes[event.get_pitch()]
				t_off = event.tick
				new_note_event = (event.get_pitch(), t_on, t_off)
				event_set.add(new_note_event)

				del active_notes[event.get_pitch()]

	note_events = list(event_set)

	#sorting on start time (i.e. the value at index 1)
	note_events.sort(key=itemgetter(1))

	return note_events

def f(A, B, i, j, memo):
	"""Aux function for LCS"""
	if i == len(A) or j == len(B):
		return 0

	if (i, j) in memo:
		return memo[(i, j)]

	if A[i] == B[j]:
		memo[(i, j)] = 1 + f(A, B, i + 1, j + 1, memo)
	else:
		memo[(i, j)] = max(f(A, B, i + 1, j, memo), f(A, B, i, j + 1, memo))

	return memo[(i, j)]


def LCS(A, B):
	return f(A, B, 0, 0, {})

def modified_LCS(A, B):
	"""
	Penalizes for sequences that are too long to eliminate bias toward too-long sequences

	INPUT:
	A - target sequence
	B - predicted sequence

	OUTPUT:
	max(
	(LCS(A, B) - ||A| - |B||)/|A|,
	0
	)
	"""
	return max((LCS(A, B) - abs(len(A) - len(B))) / float(len(A)), 0)

if __name__ == '__main__':
	print abs_tick_to_time(440, bpm = 100, resolution=220)
