import midi, copy, bisect

class MidiTimeConverter(object):
	def __init__(self, midi_obj):
		#we do not want to introduce any side effects
		self.midi_obj = copy.copy(midi_obj)
		self.resolution = self.midi_obj.resolution

		if midi_obj.format != 1:
			raise ValueError('Only midi objects of Format 1 are currently supported.')

	def get_abs_set_tempo_events(self):
		"""Returns a list of SetTempoEvents on which the tempo is changed"""
		if hasattr(self, 'abs_set_tempo_events'):
			return self.abs_set_tempo_events

		self.midi_obj.make_ticks_abs()
		self.set_tempo_events = [copy.copy(e) for e in self.midi_obj[0] if type(e) is midi.SetTempoEvent]
		self.midi_obj.make_ticks_rel()

		return self.set_tempo_events


	def get_abs_tempo_ticks(self):
		"""Returns a list of absolute tick numbers on which the tempo is changed"""
		if hasattr(self, 'abs_tempo_ticks'):
			return self.abs_tempo_ticks

		self.abs_tempo_ticks = [e.tick for e in self.get_abs_set_tempo_events()]

		return self.abs_tempo_ticks

	def get_tick_time_map(self):
		if hasattr(self, 'tick_time_map'):
			return self.tick_time_map
		
		tempo_events = self.get_abs_set_tempo_events()
		#we need to know what the tempo is when the song begins
		assert tempo_events[0].tick == 0 

		#this is what we will be returning
		res = {}

		curr_time = 0.0
		curr_tempo = tempo_events[0].get_bpm()

		res[tempo_events[0].tick] = curr_time

		#invariant: 'i' entries have been added to res
		#and curr_time refers to the time at tick of tempo_events[i - 1]
		#curr_tempo refers to the tempo set at tick [i - 1]
		for i in range(1, len(tempo_events)):
			prev_event = tempo_events[i - 1]
			curr_event = tempo_events[i]
			tick_offset = curr_event.tick - prev_event.tick
			assert tick_offset >= 0

			time_offset = tick_offset * 60.0 / (curr_tempo * self.resolution)
			curr_time = curr_time + time_offset
			curr_tempo = curr_event.get_bpm()
			res[curr_event.tick] = curr_time

		self.tick_time_map = res
		return res

	def get_tick_tempo_map(self):
		"""Returns map from abs_tick to tempo"""
		if hasattr(self, 'tick_tempo_map'):
			return self.tick_tempo_map

		tempo_events = self.get_abs_set_tempo_events()
		self.tick_tempo_map = {e.tick : e.get_bpm() for e in tempo_events}

		return self.tick_tempo_map




	
	def time_at_tick(self, tick_num):
		"""Returns the absolute time at which tick_num occurs"""
		abs_tempo_ticks = self.get_abs_tempo_ticks()
		tick_time_map = self.get_tick_time_map()
		tick_tempo_map = self.get_tick_tempo_map()
		
		#Index of preceding set_tempo_event
		prec_tick_idx = bisect.bisect_left(abs_tempo_ticks, tick_num) - 1
		prec_tick_val = abs_tempo_ticks[prec_tick_idx]

		base_time = tick_time_map[prec_tick_val]
		curr_tempo = tick_tempo_map[prec_tick_val]
		tick_offset = prec_tick_val - tick_num
		time_offset = tick_offset * 60.0 / (curr_tempo * self.resolution)

		return base_time + time_offset


if __name__ == '__main__':
	midi_obj = midi.read_midifile('midi_files/hey_jude.mid')
	m = MidiTimeConverter(midi_obj)

	print m.time_at_tick(64500)
