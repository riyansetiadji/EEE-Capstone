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

			#TODO: why n - 1?
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



if __name__ == '__main__':
	import sys
	if len(sys.argv) != 2:
		sys.exit('usage %s <midi-file>' % sys.argv[0])

	m = MusicThemeExtractor()
	midi_obj = midi.read_midifile(sys.argv[1])
	m.transform(midi_obj)

	"""
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
