import numpy as np
import math
class MidiEncodingTransformer(object):
	"""
	An object to facilitate transferring encoding schemes.
	For a detailed overview of the different encoding schemes, please see:

	Dannenberg, Roger B., et al.
	"A comparative evaluation of search techniques for query by humming using the MUSART testbed."
	Journal of the American Society for Information Science and Technology 58.5 (2007): 687-701.

	Link to pdf:
	https://pdfs.semanticscholar.org/fb78/28edee96c2ca39cca045aeebc77c1e7aaf0a.pdf

	"""
	supported_encodings = set(['logIOIr', 'IOIr', 'IOI'])
	def __init__(self, encoding='logIOIr', n_bins=5, saturation_point = 2, simple_pitch_interval=True):
		"""
		n_bins - number of bins that we will be using to represent the data
		saturation_point - the maximum value allowed for the timing encoding format
			(e.g. if saturation_point = 2 then an IOIr value of 3 will be rounded down to 2)
		simple_pitch_interval - if True a relative change of +14 is equivalent to a relative change of +2 in pitch
				i.e. every pitch change is normalized to a single octave in the range [-12, +12]
		"""
		if encoding not in MidiEncodingTransformer.supported_encodings:
			raise ValueError('%s is not a supported encoding' % encoding)        

		self.encoding = encoding
		self.n_bins = n_bins
		self.simple_pitch_interval = simple_pitch_interval

		#we will be using 's' to refer to the saturation point as well when creating the bins
		self.saturation_point = s = saturation_point


		#create the bins for the encoding
		if encoding == 'logIOIr':
			self.bins = np.linspace(-s, s, n_bins)
		else:
			self.bins = np.linspace(0, s, n_bins)

	def transform(self, note_events):
		"""
		Returns the desired encoding of a midi object

		INPUT:
		note_events - [(note, t_on, t_off) for note in notes]
		"""
		pitches, onsets, offsets = zip(*note_events)
		note_times = (onsets, offsets)

		rel_pitches = MidiEncodingTransformer.get_relative_pitches(pitches, self.simple_pitch_interval)

		IOI = MidiEncodingTransformer.get_IOI(note_times)

		if self.encoding == 'IOI':
			#IOI has one more value than IOIr and logIOIr, so we add a rel_pitch of 0 at the end
			#this will never be used by my team, but is fine for consistency
			rel_pitches.append(0)
			return zip(rel_pitches, self.bin_events(IOI))

		IOIr = MidiEncodingTransformer.get_IOIr(IOI)

		if self.encoding == 'IOIr':
			return zip(rel_pitches, self.bin_events(IOIr))

		logIOIr = MidiEncodingTransformer.get_logIOIr(IOIr)

		if self.encoding == 'logIOIr':
			return zip(rel_pitches, self.bin_events(logIOIr))

		raise ValueError('{} invalid encoding'.format(self.encoding))

	def bin_events(self, sequence):
		f = lambda x: MidiEncodingTransformer.find_nearest(x, self.bins) #function to quantize x to nearest bin value

		quantized = map(f, sequence)

		#TODO: Re-evaluate this decision and potentially represent the notes as bin indices vs bin values
		return quantized

	@staticmethod
	def get_IOI(note_events):
		"""
		Returns the Inter-Onset Interval representation of the note timing events
		INPUT:
		note_events - [(t_on, t_off) for note_event in note_events] (i.e. the time (frame) of each note onset and offset)
		"""
		on_events, off_events = note_events

		IOI = []
		for i, t_on in enumerate(on_events[:-1]):
			ioi = on_events[i + 1] - t_on

			#ioi cannot be negative
			assert(ioi > 0)

			IOI.append(ioi)

		#as specified in Pardo's work, the IOI value for the final is simply the duration of the final note
		IOI.append(off_events[-1] - on_events[-1])

		return IOI

	@staticmethod
	def get_IOIr(IOI):
		"""Returns the IOI ratio representation, given a IOI represenation"""
		IOIr = []
		for i, ioi in enumerate(IOI[:-1]):
			ioir = IOI[i + 1] / float(ioi)
			IOIr.append(ioir)

		return IOIr

	@staticmethod
	def get_logIOIr(IOIr):
		"""Returns the log IOI ratio representation, given an IOIr representation"""
		import numpy as np
		return np.log2(IOIr)


	@staticmethod
	def find_nearest(value, array):
		"""
		Returns the `x` in `array` that is nearest to `value`
		From: http://stackoverflow.com/questions/2566412/find-nearest-value-in-numpy-array
		"""
		idx = np.searchsorted(array, value, side="left")

		#case where value is larger than anything in array
		if idx == len(array):
			return array[-1]

		if math.fabs(value - array[idx-1]) < math.fabs(value - array[idx]):
			return array[idx-1]
		else:
			return array[idx]

	@staticmethod
	def get_relative_pitches(pitches, simple_pitch_interval):
		"""Given a list of absolute pitches, returns the relative pitche changes"""
		rel_pitches = []
		for i, p in enumerate(pitches[:-1]):
			real_interval = pitches[i + 1] - p
			if not simple_pitch_interval:
				rel_pitches.append(real_interval)
				continue

			#here we quantize into a single octave
			if real_interval < -12:
				rel_pitches.append(-(real_interval % 12) - real_interval)
			elif real_interval > 12:
				rel_pitches.append(real_interval % 12)
			else:
				rel_pitches.append(real_interval)

		return rel_pitches

