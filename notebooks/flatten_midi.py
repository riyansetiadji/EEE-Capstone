import heapq
from collections import deque, defaultdict

def note_flatten(notes):
        note = lambda n: n[0]
        t_start = lambda n: n[1]
        t_end = lambda n: n[2]
        make_key = lambda n: float('%d.%d' % (int(t_start(n)), int(t_end(n))))
        Q = [(make_key(n), n) for n in notes[:]]
        heapq.heapify(Q)

        result = []
        while Q:
                _, n = heapq.heappop(Q)
                #while there is some overlap
                while Q and t_end(n) > t_start(Q[0][1]):
                        #two cases t_end(n) > t_end(Q[0][1]) and not.
                        #i.e. n totally consumes next note and not
                        if t_end(n) >= t_end(Q[0][1]):
                                if note(n) >= note(Q[0][1]):
                                        heapq.heappop(Q)
                                else:
                                        new_frag = (note(n), t_end(Q[0][1]), t_end(n))
                                        n = (note(n), t_start(n), t_start(Q[0][1]))
                                        heapq.heappush(Q,
                                                (make_key(new_frag), new_frag))
                        else:
                                #partial overlap case
                                if note(n) >= note(Q[0][1]):
                                        _, t = heapq.heappop(Q)
                                        new_frag = (note(t), t_end(n), t_end(t))
                                        heapq.heappush(Q,
                                                (make_key(new_frag), new_frag))
                                else:
                                        n = (note(n), t_start(n), t_start(Q[0][1]))
                if t_end(n) > t_start(n):
                        result.append(n)
        return result

#note, start, stop
notes = [(10, 1, 3), (5, 2, 4), (8, 3, 5)]
print note_flatten(notes) #expect [(10, 1, 3), (8, 3, 5)]

notes = [(3, 1, 3), (5, 2, 4), (7, 3, 7)]
print note_flatten(notes) #expect [(3, 1, 2), (5, 2, 3), (7, 3, 7)]

notes = [(10, 1, 100), (15, 2, 4), (17, 3, 7)]
print note_flatten(notes) #expect [(10, 1, 2), (15, 2, 3), (74, 3, 7), (10, 7, 100)]

notes = [(10, 1, 100), (15, 1, 4), (17, 3, 7)]
print note_flatten(notes) #expect [(15, 1, 3), (17, 3, 7), (10, 7, 100)]

