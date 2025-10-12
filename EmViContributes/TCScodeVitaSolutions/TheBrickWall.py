#  i will represent the wall as a graph with nodes
#  could have edges and weights. weights depending on what brick category they belong to
#  red brick cannot be destroyed
#  cost of moving from a green brick to same source green brick is 0
#  cost of moving from a green brick to another green brick is 1
#  cost of moving to source or destination is 0
#  goal is to get from source to destination with minimum cost
#  i can solve this problem using 0-1 BFS, a modified version of dijkstra's algorithm, using a double ended queue

import sys
import collections
import re

def solve():
    try:
        # Step 1: Parse the Input
        N = int(sys.stdin.readline())
        
        type_grid = [['' for _ in range(N)] for _ in range(N)]
        id_grid = [[0 for _ in range(N)] for _ in range(N)]
        source_cells = []
        dest_cells = []
        brick_id_counter = 0

        for r in range(N):
            line = sys.stdin.readline().strip()
            # im using regex here for extracting blocks
            tokens = re.findall(r'(\d+)([RGSD])', line)
            
            c = 0
            for length_str, type_char in tokens:
                length = int(length_str)
                brick_id_counter += 1
                for _ in range(length):
                    if c < N:
                        type_grid[r][c] = type_char
                        id_grid[r][c] = brick_id_counter
                        if type_char == 'S':
                            source_cells.append((r, c))
                        elif type_char == 'D':
                            dest_cells.append((r, c))
                        c += 1

        distances = [[float('inf')] * N for _ in range(N)]
        dq = collections.deque()

        for r, c in source_cells:
            distances[r][c] = 0
            dq.append((r, c))

        moves = [(-1, 0), (1, 0), (0, -1), (0, 1)]

        while dq:
            r, c = dq.popleft()

            for dr, dc in moves:
                nr, nc = r + dr, c + dc

                # checking nearby blocks
                if 0 <= nr < N and 0 <= nc < N and type_grid[nr][nc] != 'R':
                    
                    weight = 0
                    if id_grid[r][c] != id_grid[nr][nc] and type_grid[nr][nc] == 'G':
                        weight = 1

                    if distances[r][c] + weight < distances[nr][nc]:
                        distances[nr][nc] = distances[r][c] + weight
                        if weight == 0:
                            dq.appendleft((nr, nc))
                        else:
                            dq.append((nr, nc))
        # estimation of cost
        min_cost = float('inf')
        for r, c in dest_cells:
            min_cost = min(min_cost, distances[r][c])

        print(min_cost)

    except (IOError, ValueError) as e:
        pass

solve()