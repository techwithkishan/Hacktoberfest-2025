import sys

class CanvasSimulator:
    def __init__(self, m, n):
        self.M = m
        self.N = n
        self.rects = {}
        self.invalid_commands = []

    def _collides(self, x1, y1, w1, h1, rect_to_ignore_key=None):
        for key, (w2, h2) in self.rects.items():
            if key == rect_to_ignore_key:
                continue
            
            x2, y2 = key
            
            is_separate = (x1 + w1 <= x2) or \
                          (x2 + w2 <= x1) or \
                          (y1 + h1 <= y2) or \
                          (y2 + h2 <= y1)
            
            if not is_separate:
                return True
        return False

    def _is_in_bounds(self, x, y, w, h):
        return x >= 0 and y >= 0 and x + w <= self.N and y + h <= self.M

    def process_command(self, command_line):
        try:
            parts = command_line.split()
            cmd_type = parts[0]

            if cmd_type not in ["draw", "remove", "extend", "shrink"] or len(parts) != 5:
                raise ValueError("Invalid command format or argument count")

            params = [int(p) for p in parts[1:]]

            if not self.validate_and_execute(cmd_type, params):
                self.invalid_commands.append(command_line)

        except (ValueError, IndexError):
            self.invalid_commands.append(command_line)

    def validate_and_execute(self, cmd_type, params):
        if cmd_type == "draw":
            x, y, w, h = params
            if not self._is_in_bounds(x, y, w, h): return False
            if self._collides(x, y, w, h): return False
            self.rects[(x, y)] = [w, h]
            return True
        
        elif cmd_type == "remove":
            x, y, w, h = params
            if (x, y) not in self.rects: return False
            if self.rects[(x, y)] != [w, h]: return False
            del self.rects[(x, y)]
            return True

        elif cmd_type == "extend":
            x, y, new_w, new_h = params
            if (x, y) not in self.rects: return False
            curr_w, curr_h = self.rects[(x, y)]
            if new_w < curr_w or new_h < curr_h: return False
            if not self._is_in_bounds(x, y, new_w, new_h): return False
            if self._collides(x, y, new_w, new_h, rect_to_ignore_key=(x, y)): return False
            self.rects[(x, y)] = [new_w, new_h]
            return True

        elif cmd_type == "shrink":
            x, y, new_w, new_h = params
            if (x, y) not in self.rects: return False
            curr_w, curr_h = self.rects[(x, y)]
            if new_w > curr_w or new_h > curr_h: return False
            self.rects[(x, y)] = [new_w, new_h]
            return True
            
        return False

    def run(self):
        try:
            num_commands_str = sys.stdin.readline()
            if not num_commands_str or not num_commands_str.strip():
                return
            num_commands = int(num_commands_str)

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
        line = sys.stdin.readline()
        if not line or not line.strip():
            print("")
            print("0")
            return
        m, n = map(int, line.split())
        simulator = CanvasSimulator(m, n)
        simulator.run()
        simulator.print_results()
    except (IOError, ValueError):
        print("")
        print("0")

if __name__ == "__main__":
    main()