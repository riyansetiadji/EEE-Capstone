import midi, utils
from operator import itemgetter
import numpy as np

class MusicThemeExtractor(object):
	def __init__(self, *args, **kwargs):
		pass

	def transform(self, midi_obj):
		"""Transforms a midi object into a list of midi objects representing musical themes"""
		note_events = utils.midi_to_note_events(midi_obj)
		#sort note_events on onset time
		note_events.sort(key=itemgetter(1))
		
		note_registers = MusicThemeExtractor.get_registers(note_events)
		print note_registers


	@staticmethod
	def get_registers(note_events):
		"""
		INPUT: List of note events - [(pitch, t_on, t_off)]

		OUTPUT:
		Registers (i.e. prominence of note at given time) for each note event
		Assuming note_events is sorted on onset time
		From Meek, Birmingham 2000 MME paper
		"""

		#init all registers to -1 so we can check at the end
		registers = np.full(len(note_events), -1, dtype='float32')
		active_list = set()

		index = 0

		Pitch = lambda x: x[0]
		Onset = lambda x: x[1]
		Offset = lambda x: x[2]

		n = len(note_events)
		while index < n:
			onset = Onset(note_events[index]) #onset of note at index 'index'

			#remove all notes that are no longer active
			active_list = set(((i, a) for i, a in active_list if Offset(a) > onset))

			while index < n and Onset(note_events[index]) == onset:
				registers[index] = 0
				active_list.add((index, note_events[index]))
				index += 1

				sorted_active_list = list(active_list)
				active_list_pitch = lambda x: Pitch(x[1])
				sorted_active_list.sort(key=active_list_pitch)

				k = len(sorted_active_list) - 1
				for j, (idx, note_event) in enumerate(sorted_active_list[:k]):
					register = (k - j)/float(k)
					if register > registers[idx]:
						registers[idx] = register

		assert all(r != -1 for r in registers)
		return registers


def collapse_stream(note_stream, active_note_ratio=0.5):
	"""
	INPUT:
	note_stream - list of note events
	active_note_ratio - ratio of the note's duration in which it is considered 'active'

	OUTPUT:
	collapsed_note_stream - collapses all polyphonic music into a single list of monophonic music

	Routine description:
	Extracts the 'top sounding voice' (interpreted to be the note with the highest pitch) at any given time period and discards
	all other simultaneous notes
	"""
	truncated_notes = [(note, onset,\
			(offset - (offset - onset) * active_note_ratio))\
			for note, onset, offset in note_stream]

	index = 0

	Pitch = lambda x: x[0]
	Onset = lambda x: x[1]
	Offset = lambda x: x[2]

	n = len(truncated_notes)
	active_notes = set()

	"""
	There are two cases,
	1. No overlap with current note (i.e. note at index).
		This is the easy case, we simply add note[index] to result
		and increment index

	2. There are multiple overlapping notes
		2.1. note[index] has the highest voice
			We skip all of the overlapping notes
		2.2. note[index] does not have the highest voice
			We change index to the note with the highest voice
	"""
	result = []
	while index < n:
		overlap_notes = [note for note in truncated_notes[index:]\
				if Onset(note) < Offset(truncated_notes[index])]
		#case 1 (i.e. no overlapping notes
		if len(overlap_notes) == 1:
			result.append(truncated_notes[index])
			index += 1
		else:
			highest_voice = max(overlap_notes, key=Pitch)

			#case 2 (i.e. overlapping notes)
			if  Pitch(highest_voice) == Pitch(overlap_notes[0]):
				#Case 2.1 (i.e. the note at index has the highest pitch)
				result.append(truncated_notes[index])
				#skip all overlapping notes next iter
				index = index + len(overlap_notes) 
			else:
				#Case 2.2 (i.e. the note at index does not have the highest pitch)

				new_index_offset = overlap_notes.index(highest_voice)

				index += new_index_offset

	return result

def collapse_streams(note_streams, active_note_ratio=0.5):
	"""maps collapse_stream to multiple streams"""
	collapsed_streams = [collapse_stream(note_stream, active_note_ratio=active_note_ratio)\
			for note_stream in note_streams]

	return collapsed_streams
def collapse_stream_test():
	from operator import itemgetter
	stream = [(60, 1, 3), (61, 1.5, 2)]

	assert collapse_stream(stream) == [(61, 1.5, 1.75)]
	stream = [(60, 1, 2), (61, 1.6, 2)]
	trunc_stream = [(p, t_on, t_off - (t_off - t_on) * 0.5) for p, t_on, t_off in stream]
	assert collapse_stream(stream) == trunc_stream

	e0 = (60, 0, 3)
	e7 = (60, 6, 8)
	e2 = (61, 2, 5)
	e6 = (62, 6, 7)
	e1 = (63, 1, 3)
	e3 = (64, 3, 5)
	e4 = (65, 4, 7)
	e5 = (66, 4, 6)

	track = [e0, e1, e2, e3, e4, e5, e6, e7]

	track.sort(key=itemgetter(1))

	expected = [e1, e3, e5, e6] 
	trunc_stream = [(p, t_on, t_off - (t_off - t_on) * 0.5) for p, t_on, t_off in expected]
	assert collapse_stream(track) == trunc_stream

	print collapse_streams([track, stream])


if __name__ == '__main__':

	collapse_stream_test()
	"""
	import sys
	if len(sys.argv) != 2:
		sys.exit('usage %s <midi-file>' % sys.argv[0])

	m = MusicThemeExtractor()
	midi_obj = midi.read_midifile(sys.argv[1])
	m.transform(midi_obj)

	#This is the note sequence from the meek paper
	midi_obj = midi.Pattern()
	tracks = [midi.Track(tick_relative=False) for t in range(7)]
	tracks[0].append(midi.NoteOnEvent(tick=0, pitch=60))
	tracks[0].append(midi.NoteOffEvent(tick=3, pitch=60))
	tracks[0].append(midi.NoteOnEvent(tick=6, pitch=60))
	tracks[0].append(midi.NoteOffEvent(tick=8, pitch=60))
	tracks[1].append(midi.NoteOnEvent(tick=2, pitch = 61))
	tracks[1].append(midi.NoteOffEvent(tick=5, pitch=61))

	tracks[2].append(midi.NoteOnEvent(tick=6, pitch = 62))
	tracks[2].append(midi.NoteOffEvent(tick=7, pitch=62))
	tracks[3].append(midi.NoteOnEvent(tick=1, pitch = 63))
	tracks[3].append(midi.NoteOffEvent(tick=3, pitch=63))
	tracks[4].append(midi.NoteOnEvent(tick=3, pitch = 64))
	tracks[4].append(midi.NoteOffEvent(tick=5, pitch=64))
	tracks[5].append(midi.NoteOnEvent(tick=4, pitch = 65))
	tracks[5].append(midi.NoteOffEvent(tick=7, pitch=65))
	tracks[6].append(midi.NoteOnEvent(tick=4, pitch = 66))
	tracks[6].append(midi.NoteOffEvent(tick=6, pitch=66))
	midi_obj.make_ticks_abs()
	for t in tracks:
		midi_obj.append(t)
	midi_obj.make_ticks_rel()
	"""
