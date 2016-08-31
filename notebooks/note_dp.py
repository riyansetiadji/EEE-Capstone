import sys

def compare_sequences(S, q, i, j, in_window=False, alpha = 1, beta = 1, memo = {},
        parent={}):
        """
        Finds the substring in S, s such that
        the maximum common subsequence between s and q, called
        `match` is localized and approximately the same size as q.
        We force all notes in q to be taken into consideration

        alpha - penalty for skipping a song note when in the match window
        beta - penalty for skipping a query note when in the match window

        i - index into S
        j - index into q
        in_window - indicates whether we are currently in the matching window
                between the sequences
        memo - for memoizing recursive calls
        parent - for reconstructing the sequence that best matches


        DP(i, j, in_window) = {
                if not in_window:
                        #start our window or don't, whichever is better
                        return max(DP(i, j, True), DP(i + 1, j, False))
                elif in_window:
                        if S[i] == q[j]:
                                return DP(i + 1, j + 1, True) + 1
                        return max(DP(i + 1, j, True) - alpha, DP(i, j + 1, True) - beta)
                }

        """ 

        if (i, j, in_window) in memo:
                return memo[(i, j, in_window)]
        
        #are we at the end of the query?
        if j == len(q):
                return 0

        #are we at the end of the song without finishing the query?
        if i == len(S):
                #penalty for not getting through the query
                return -(len(q) - j) * beta

        
        #helper function
        DP = lambda x, y, z: compare_sequences(S, q, x, y, z,
                alpha, beta, memo, parent)

        if not in_window:
                start_window = DP(i, j, True)
                dont_start_window = DP(i + 1, j, False)
                if start_window > dont_start_window:
                        parent[(i, j, in_window)] = (i, j, True)
                else:
                        parent[(i, j, in_window)] = (i + 1, j, False)
                res = max(start_window, dont_start_window)
                memo[(i, j, in_window)] = res
                return res
        
        #case: in_window == True
        if S[i] == q[j]:
                res = DP(i + 1, j + 1, in_window) + 1
                parent[(i, j, in_window)] = (i + 1, j + 1, in_window)
        else:
                #we need to skip a song note or a query note
                skip_song_note = DP(i + 1, j, True) - alpha 
                skip_query_note = DP(i, j + 1, True) - beta
                if skip_song_note > skip_query_note:
                        parent[(i, j, in_window)] = (i + 1, j, True)
                else:
                        parent[(i, j, in_window)] = (i, j + 1, True)
                res = max(skip_song_note, skip_query_note)
        memo[(i, j, in_window)] = res
        return res

def get_sequence_match(S, q):
        parent_map = {}
        compare_sequences(S, q, 0, 0, parent=parent_map, memo={})
        state = (0, 0, False)
        final_match = []
        while state in parent_map:
                curr_i, curr_j, in_window = state
                new_state = parent_map[state]
                new_i, new_j, new_in_window = parent_map[state]
                #if this was a match, add it to the list of matched notes
                if new_i == curr_i + 1 and new_j == curr_j + 1 and in_window:
                        final_match.append(S[curr_i])
                
                #print str(state) + ' -> ' + str(new_state)
                state = new_state

        return final_match

S = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
q = [5, 8, 6, 3, 7]

print get_sequence_match(S, q) #expected [5, 6, 7]

S = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
q = [5, 8, 9, 10, 11]

print get_sequence_match(S, q) #expected [8, 9, 10]


S = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
q = [5, 8, 5, 9, 5, 10, 11]

print get_sequence_match(S, q) #expected [8, 9, 10]
