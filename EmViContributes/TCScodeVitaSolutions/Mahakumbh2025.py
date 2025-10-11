# canvas size would MxN while the rectangle size would be wxh at x,y coords
# we would neeed to store the postion of each rectangle and their sizes. dictionaries would be better option for this
# the most complex rule is th overlap rule.
# the most logical way would be to check the coniditions whcih these triangles are overlapping and takin NOT of that

import sys

class CanvasSimulator:
    def __init__(self, m, n):
        self.M = m 
        self.N = n 
        self.rects = {} 
        self.invalid_commands = []

    def _collides(self, x1, y1, w1, h1, rect_to_ignore=None):
        for (x2, y2), (w2, h2) in self.rects.items():
            if (x1, y1) == (x2, y2) and rect_to_ignore:
                continue
            
            # Condition for NO collision
            is_separate = (x1 + w1 <= x2) or \
                          (x2 + w2 <= x1) or \
                          (y1 + h1 <= y2) or \
                          (y2 + h2 <= y1)
            
            if not is_separate:
                return True # Collision
        return False

    def _is_in_bounds(self, x, y, w, h):
        return x >= 0 and y >= 0 and x + w <= self.N and y + h <= self.M

    def process_command(self, command_line):
        parts = command_line.split()
        command = parts[0]
        params = [int(p) for p in parts[1:]]
        
        is_valid = False
        if command == "draw":
            x, y, w, h = params
            if self._is_in_bounds(x, y, w, h) and not self._collides(x, y, w, h):
                self.rects[(x, y)] = [w, h]
                is_valid = True
        
        elif command == "remove":
            x, y, w, h = params
            if (x, y) in self.rects and self.rects[(x, y)] == [w, h]:
                del self.rects[(x, y)]
                is_valid = True

        elif command == "extend":
            x, y, new_w, new_h = params
            if (x, y) in self.rects:
                curr_w, curr_h = self.rects[(x, y)]
                # Invalid if already larger.
                if curr_w <= new_w and curr_h <= new_h:
                    if self._is_in_bounds(x, y, new_w, new_h) and \
                       not self._collides(x, y, new_w, new_h, rect_to_ignore=True):
                        self.rects[(x, y)] = [new_w, new_h]
                        is_valid = True

        elif command == "shrink":
            x, y, new_w, new_h = params
            if (x, y) in self.rects:
                curr_w, curr_h = self.rects[(x, y)]
                # Invalid if already smaller.
                if curr_w >= new_w and curr_h >= new_h:
                    self.rects[(x, y)] = [new_w, new_h]
                    is_valid = True

        if not is_valid:
            self.invalid_commands.append(command_line)

    def run(self):
        try:
            num_commands = int(sys.stdin.readline())
            for _ in range(num_commands):
                command_line = sys.stdin.readline().strip()
                if command_line:
                    self.process_command(command_line)
        except (IOError, ValueError):
            pass

    def print_results(self):
        for cmd in self.invalid_commands:
            print(cmd)
        print(len(self.rects))


def main():
    try:
        m, n = map(int, sys.stdin.readline().split())
        simulator = CanvasSimulator(m, n)
        simulator.run()
        simulator.print_results()
    except (IOError, ValueError):
        print("0")

if __name__ == "__main__":
    main()