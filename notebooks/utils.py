import sys, librosa
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

def get_pitch_for_times(filepath, times, sr=22050,
                        downsample=1, win_s=4096, hop_s=512, threshold=0.8,
                       pitch_algorithm='yin',
                       pitch_unit='Hz'):
    """
    INPUT:
    filepath - string - path to audio file for which to extract pitch values
    times - array-type - times for which to extract pitch values (typically onset times)
    sr - sample rate - divided by downsample parameter
    downsample - downsample factor
    win_s - fft window size, is divided by downsample parameter
    hop_s - hop size, is divided by downsample parameter
    threshold - confidence threshold that must be exceed before assigning a pitch value
    pitch_algorithm - one of [default, schmitt, fcomb, mcomb, specacf, yin, yinfft]
    
    OUTPUT:
    pitch_values - pitch values for musical events beginning at each time in times
    
    NOTE: if no pitch is detected with confidence above 'threshold' between times[i] and times[i+1],
    a pitch value of 0 will be assigned
    """
    
    from aubio import source, pitch, freqtomidi

    filename = filepath
    samplerate = sr / downsample
    win_s = win_s / downsample # fft size
    hop_s = hop_s  / downsample # hop size
    tolerance = threshold
    
    target_samples = librosa.core.time_to_samples(times)
    
    s = source(filename, samplerate, hop_s)
    samplerate = s.samplerate

    pitch_o = pitch(pitch_algorithm, win_s, hop_s, samplerate)
    pitch_o.set_unit(pitch_unit)
    pitch_o.set_tolerance(tolerance)

    pitches = []
    confidences = []

    # total number of frames read
    total_frames = 0
    while True:
        samples, read = s()
        if read == 0: break
        pitch = pitch_o(samples)[0]
        confidence = pitch_o.get_confidence()
        #print '{},{}'.format(pitch,confidence)
        pitches.append(pitch)
        confidences.append(confidence)
        total_frames += read
        if read < hop_s: break


    #the pitches that we will return for the passed in times
    target_pitches = []
    for _sample_index, _target_sample in enumerate(target_samples):
        #did we find a pitch we were confident about for this sample?
        _set_flag = False
        _working_sample = _target_sample #we want to find a confident pitch
        while (not _set_flag) and _working_sample < len(pitches) and\
            (_sample_index == len(target_samples) - 1 or\
             _working_sample < target_samples[_sample_index + 1]):

		_working_sample += 1
                if confidences[_working_sample] >= threshold:
                    _set_flag = True
                    target_pitches.append(pitches[_working_sample])
        
        if not _set_flag:
            target_pitches.append(0)
    return target_pitches


if __name__ == '__main__':
	sound_path = 'test_sounds/C4.mp3'
	print get_pitch_for_times(sound_path, get_onset_times(sound_path), pitch_unit = 'midi')
